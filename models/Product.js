import { Schema, model } from "mongoose";

import { handleMongooseError } from "../helpers/handleMongooseError.js";

const descriptionSchema = new Schema({
  text: {
    type: String,
  },
  antioxidantProperties: {
    type: String,
  },
  antiDiabeticEffects: {
    type: String,
  },
  antiCancerProperties: {
    type: String,
  },
  immuneSupport: {
    type: String,
  },
  digestiveAid: {
    type: String,
  },
});

const reviewsSchema = new Schema({
  name: {
    type: String,
  },
  rating: {
    type: Number,
  },
  date: {
    type: Date,
  },
  review: {
    type: String,
  },
});

const productSchema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    price: {
      type: String,
    },
    stock: {
      type: String,
    },
    category: {
      type: String,
    },
    photo: {
      type: String,
    },
    suppliers: {
      type: String,
    },
    description: descriptionSchema,
    reviews: [reviewsSchema],
  },
  { versionKey: false, timestamps: true }
);

productSchema.post("save", handleMongooseError);

export const Product = model("product", productSchema);
