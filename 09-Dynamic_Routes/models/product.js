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
        // @ts-ignore
        cb(JSON.parse(fileContent));
      } catch (e) {
        cb([]);
      }
    }
  });
};

export class Product {
  constructor(id, title, price, imageUrl, description) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save(cb) {
    console.log(this);
    getProductsFromFile((products) => {
      if (!this.id) {
        //generating random ID for the product
        this.id = Math.random().toString();

        //pushing the product
        products.push(this);

        // writitng the products to the file
        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) console.log(err);
          cb();
        });
      } else {
        // finding index of product with same ID
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id,
        );

        //making copy of products array for safety
        const updatedProducts = [...products];

        //updating the product with newly passed Information
        updatedProducts[existingProductIndex] = this;

        // writitng the product to the file
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          if (err) console.log(err);
          cb();
        });
      }
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
  static delete(id) {
    getProductsFromFile((products) => {
      const updatedProducts = products.filter((prod) => prod.id !== id);
      // writitng the product to the file
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (err) console.log(err);
      });
    });
  }
}
