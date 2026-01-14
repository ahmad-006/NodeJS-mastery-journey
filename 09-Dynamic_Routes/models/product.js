import fs from "fs";
import path from "path";

// SIMPLIFIED PATH: usage depends on where you run 'node' from.
// Ideally, use the helper function Max teaches in the course (util/path.js)
const p = path.join(process.cwd(), "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      try {
        cb(JSON.parse(fileContent));
      } catch (e) {
        cb([]);
      }
    }
  });
};

export class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);

      // FIX: Used writeFile instead of write
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) console.log(err);
      });
    });
  }

  // RE-IMPLEMENTED CORRECTLY WITH CALLBACK
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static FindById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
}
