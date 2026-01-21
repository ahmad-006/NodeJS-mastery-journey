// @ts-nocheck
import fs from "fs";
import path from "path";

const p = path.join(process.cwd(), "data", "cart.json");
export class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id,
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      
      // Add new product / increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      // Update total price (converting productPrice to number with +)
      cart.totalPrice += +productPrice;

      // Write the updated cart back to file
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const cart = JSON.parse(fileContent);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter((prod) => prod.id !== id);
      updatedCart.totalPrice =
        updatedCart.totalPrice - price * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        if (err) console.log(err);
      });
    });
  }
}
