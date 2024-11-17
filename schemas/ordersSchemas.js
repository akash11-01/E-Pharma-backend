import Joi from "joi";
import { emailRegExp } from "../constants/emailRegExp.js";

const productSchema = Joi.object({
  _id: Joi.string().required().messages({
    "any.required": "Product id is required",
    "string.base": "Product id must be a text string.",
  }),
  quantity: Joi.number().positive().required().messages({
    "any.required": "Quantity is required",
    "number.base": "Quantity must be a number.",
    "number.positive": "Quantity must be a positive number.",
  }),
});

const customerSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "any.required": "Name is required",
    "string.base": "Name must be a text string.",
    "string.min": "Name must be at least 2 characters long.",
  }),
  address: Joi.string().required().messages({
    "any.required": "Address is required",
    "string.base": "Address must be a text string.",
  }),
  email: Joi.string().pattern(emailRegExp).required().messages({
    "any.required": "Email is required",
    "string.pattern.base": "Invalid email format.",
  }),
  phone: Joi.string().min(13).max(13).required().messages({
    "any.required": "Phone number is required",
    "string.base": "Phone number must be a text string.",
    "string.min": "Phone number must be exactly 13 characters long.",
    "string.max": "Phone number must be exactly 13 characters long.",
  }),
});

export const orderSchema = Joi.object({
  customer: customerSchema.required().messages({
    "any.required": "Customer information is required",
    "object.base": "Customer must be an object.",
  }),
  products: Joi.array().items(productSchema).required().messages({
    "any.required": "Product information is required",
  }),
  totalPrice: Joi.number().positive().required().messages({
    "any.required": "Total price is required",
    "number.base": "Total price must be a number.",
    "number.positive": "Total price must be a positive number.",
  }),
  dateOfOrder: Joi.date().required().messages({
    "any.required": "Date of order is required",
    "date.base": "Date of order must be a valid date.",
  }),
});
