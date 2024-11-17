import Joi from "joi";

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

export const cartSchema = Joi.object({
  products: Joi.array().items(productSchema).required(),
});
