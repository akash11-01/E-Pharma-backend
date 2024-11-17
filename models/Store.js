import { Schema, model } from "mongoose";

import { handleMongooseError } from "../helpers/handleMongooseError.js";

const storeSchema = new Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    rating: {
      type: Number,
    },
    openTime: {
      type: String,
    },
    closeTime: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

storeSchema.post("save", handleMongooseError);

export const Store = model("store", storeSchema);
export const NearStore = model("store", storeSchema, "nearest_stores");
