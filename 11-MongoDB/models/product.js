import { getDb } from "../util/database.js";
import mongodb from "mongodb";

export class Product {
  constructor(title, price, imageUrl, description, _id, userId) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = _id;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    db.collection("products")
      .insertOne(this)
      .then(() => {
        console.log("Product added .....!");
      })
      .catch((err) => {
        console.error(err.message);
      });
  }
  static fetchAll(cb) {
    const db = getDb();
    return db.collection("products").find().toArray();
  }

  static updateById(id, updated) {
    const db = getDb();
    return db
      .collection("products")
      .updateOne({ _id: new mongodb.ObjectId(id) }, { $set: updated })
      .then(() => {
        console.log("Product updated....!");
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  static findById(id) {
    const db = getDb();

    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.error(err.message);
      });
  }
  static deleteById(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(id) });
  }
}
