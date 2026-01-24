import fs from "fs";
import path from "path";
import { Cart } from "./cart.js";

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
      // If product has no ID, it's a new product
      if (!this.id) {
        // Generating random ID for the product
        this.id = Math.random().toString();

        // Pushing the new product to the list
        products.push(this);

        // Writing the updated products list to the file
        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) console.log(err);
          cb();
        });
      } else {
        // If product has an ID, we are updating an existing one
        // Finding index of product with the same ID
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id,
        );

        // Making a copy of the products array for immutability and safety
        const updatedProducts = [...products];

        // Updating the product at the found index with the new instance data
        updatedProducts[existingProductIndex] = this;

        // Writing the updated products list back to the file
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
      // Find the product to ensure it exists and get its price (needed for cart update)
      const product = products.find((prod) => prod.id === id);

      if (!product) {
        return;
      }
      // Filter out the product to be deleted
      const updatedProducts = products.filter((prod) => prod.id !== id);

      // Writing the filtered products list back to the file
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (err) console.log(err);
      });
      // Also remove the product from the cart to keep data consistent
      Cart.deleteProduct(id, product.price);
    });
  }
}