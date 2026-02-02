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