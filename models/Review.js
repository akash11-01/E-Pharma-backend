import { Schema, model } from "mongoose";

import { handleMongooseError } from "../helpers/handleMongooseError.js";

const reviewSchema = new Schema(
  {
    name: {
      type: String,
    },
    testimonial: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

reviewSchema.post("save", handleMongooseError);

export const Review = model("review", reviewSchema);
