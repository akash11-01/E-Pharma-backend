import bcrypt from "bcrypt";
import crypto from "crypto";
import { httpError } from "../helpers/httpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { findUser, createUser } from "../services/usersServices.js";
import {
  generateTokens,
  validateRefreshToken,
} from "../services/tokenServices.js";
import { User } from "../models/User.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });

  if (user) {
    throw httpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const newUser = await createUser({
    ...req.body,
    password: hashPassword,
    verificationToken,
    verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
  });

  await sendVerificationEmail(newUser.email, verificationToken);

  res.status(201).json({
    user: { name: newUser.name, email: newUser.email },
  });
};

const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    // console.log("error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });

  if (!user) {
    throw httpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw httpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };
  const tokens = generateTokens(payload);

  user.accessToken = tokens.accessToken;
  user.refreshToken = tokens.refreshToken;

  await user.save();

  res.json({
    ...tokens,
    user: { name: user.name, email: user.email },
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("Error in forgotPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    // update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const refreshUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw httpError(401, "No refresh token provided");
    }

    const userData = validateRefreshToken(refreshToken);
    const user = await findUser({ refreshToken });

    if (!userData || !user) {
      throw httpError(401, "Refresh token is not valid");
    }

    const payload = { id: user._id };
    const tokens = generateTokens(payload);

    user.accessToken = tokens.accessToken;
    user.refreshToken = tokens.refreshToken;

    await user.save();

    res.json({
      ...tokens,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  const user = await findUser({ email });

  res.json({
    name: user.name,
    email: user.email,
  });
};

const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.user;

    if (!refreshToken) {
      throw httpError(401, "No refresh token provided");
    }

    const user = await findUser({ refreshToken });

    if (!user) {
      throw httpError(401, "No user with this refresh token");
    }

    user.accessToken = "";
    user.refreshToken = "";

    await user.save();

    res.status(204).json();
  } catch (error) {}
};

export default {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  refreshUser: ctrlWrapper(refreshUser),
  getCurrent: ctrlWrapper(getCurrent),
  logoutUser: ctrlWrapper(logoutUser),
  resetPassword: ctrlWrapper(resetPassword),
  forgotPassword: ctrlWrapper(forgotPassword),
  verifyEmail: ctrlWrapper(verifyEmail),
};
