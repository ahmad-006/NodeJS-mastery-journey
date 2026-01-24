import { Cart } from "./cart.js";
import db from "../util/database.js";

export class Product {
  constructor(id, title, price, imageUrl, description) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title,price,imageUrl, description) VALUES (?,?,?,?)",
      [this.title, this.price, this.imageUrl, this.description],
    );
  }

  // RE-IMPLEMENTED CORRECTLY WITH CALLBACK
  static fetchAll() {
    //execduting databse querries
    return db.execute("SELECT * FROM products");
  }

  static FindById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  static delete(id) {}
}
