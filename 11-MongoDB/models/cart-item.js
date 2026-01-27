import { DataTypes } from "sequelize";
import { sequelize } from "../util/database.js";

export const CartItem = sequelize.define("cartItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: DataTypes.INTEGER,
});
