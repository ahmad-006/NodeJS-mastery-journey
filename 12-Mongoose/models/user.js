// @ts-nocheck
import mongoose, { Schema, Types } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: { type: Types.ObjectId, ref: "Product", required: true },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = async function (product) {
  let newQuanitiy = 1;
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });

  if (cartProductIndex >= 0) {
    const updatedProduct = this.cart.items[cartProductIndex];
    const oldQuantity = updatedProduct.quantity;
    newQuanitiy += oldQuantity;
    this.cart.items[cartProductIndex] = {
      productId: product._id,
      quantity: newQuanitiy,
    };
  } else {
    this.cart = {
      items: [
        ...this.cart.items,
        { productId: product._id, quantity: newQuanitiy },
      ],
    };
  }

  return await this.save();
};

userSchema.methods.deleteCartbyId = async function (id) {
  try {
    const updatedCartProducts = this.cart.items.filter(
      (p) => id.toString() !== p.productId.toString(),
    );
    this.cart.items = updatedCartProducts;
    return await this.save();
  } catch (error) {
    return error.message;
  }
};

export const User = mongoose.model("User", userSchema);
