import { DataTypes } from "sequelize";
import { sequelize } from "../util/database.js";

export const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});
