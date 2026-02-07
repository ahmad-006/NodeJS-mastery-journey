import mongoose, { Schema, Types } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Product = mongoose.model("Product", productSchema);
