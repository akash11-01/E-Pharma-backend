import Joi from "joi";

import { emailRegExp } from "../constants/emailRegExp.js";

export const registerUserSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().min(13).max(13).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().required(),
});

export const refreshUserSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "any.required": "RefreshToken is required",
    "string.base": "RefreshToken must be a text string.",
  }),
});
