import { getDb } from "../util/database.js";
import { ObjectId } from "mongodb";

export class User {
  constructor(name, email, cart = { items: [] }, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = new ObjectId(id);
  }

  save() {
    const db = getDb();

    db.collection("users")
      .insertOne(this)
      .then((result) => {
        console.log("Product Has Been Added....");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addToCart(product) {
    const db = getDb();
    let newQuanitiy = 1;

    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });

    if (cartProductIndex >= 0) {
      const updatedProduct = this.cart.items[cartProductIndex];
      const oldQuantity = updatedProduct.quantity;
      newQuanitiy += oldQuantity;
      this.cart.items[cartProductIndex] = {
        productId: updatedProduct._id,
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

    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: this.cart } });
  }

  async getCart() {
    const db = getDb();
    const cartItemIds = this.cart.items.map((i) => i.productId);

    const response = await db
      .collection("products")
      .find({ _id: { $in: cartItemIds } })
      .toArray();

    const products = response.map((p) => {
      return {
        ...p,
        quantity: this.cart.items.find(
          (i) => i.productId.toString() === p._id.toString(),
        ).quantity,
      };
    });

    return products;
  }

  async deleteCartbyId(productId) {
    try {
      const db = getDb();

      const updatedCartProducts = this.cart.items.filter(
        (p) => productId.toString() !== p.productId.toString(),
      );

      console.log(updatedCartProducts);
      const response = await db
        .collection("users")
        .findOneAndUpdate(
          { _id: this._id },
          { $set: { cart: { items: [...updatedCartProducts] } } },
          { returnDocument: "after" },
        );

      return response.cart;
    } catch (error) {
      return error.message;
    }
  }

  async addOrder() {
    const db = getDb();
    const products = await this.getCart();
    const order = {
      items: products,
      user: {
        _id: this._id,
        name: this.name,
      },
    };
    const cart = await db.collection("orders").insertOne(order);
    this.cart = { items: [] };
    await db
      .collection("users")
      .findOneAndUpdate(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: [] } } },
        { returnDocument: "after" },
      );
    return cart;
  }

  async getOrder() {
    const db = getDb();
    return await db
      .collection("orders")
      .find({ "user._id": this._id })
      .toArray();
  }

  static findById(id) {
    const db = getDb();

    return db
      .collection("users")
      .findOne({
        _id: new ObjectId(id),
      })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}