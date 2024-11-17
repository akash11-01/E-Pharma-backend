import bcrypt from "bcrypt";

import { httpError } from "../helpers/httpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { findUser, createUser } from "../services/usersServices.js";
import {
  generateTokens,
  validateRefreshToken,
} from "../services/tokenServices.js";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });

  if (user) {
    throw httpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    user: { name: newUser.name, email: newUser.email },
  });
};

export const loginUser = async (req, res) => {
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
};
