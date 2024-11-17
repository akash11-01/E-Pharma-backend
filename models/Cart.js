import { Schema, model } from "mongoose";

import { handleMongooseError } from "../helpers/handleMongooseError.js";

export const productSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product id is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
});

const cartSchema = new Schema(
  {
    products: [productSchema],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },
  },
  { versionKey: false }
);

cartSchema.post("save", handleMongooseError);

export const Cart = model("cart", cartSchema);
