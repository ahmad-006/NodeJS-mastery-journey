import mongoose, { Schema, Types } from "mongoose";

// Order schema tracks the purchased products and the user who made the purchase
const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
});

export const Order = mongoose.model("Order", orderSchema);
