import { Schema, model } from "mongoose";

import { handleMongooseError } from "../helpers/handleMongooseError.js";
import { emailRegExp } from "../constants/emailRegExp.js";
import { productSchema } from "../models/Cart.js";

const customerSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: emailRegExp,
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
});

const orderSchema = new Schema(
  {
    customer: customerSchema,
    products: [productSchema],
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
    },
    dateOfOrder: {
      type: Date,
      required: [true, "Date of order is required"],
    },
  },
  { versionKey: false}
);

orderSchema.post("save", handleMongooseError);

export const Order = model("order", orderSchema);
