import { DataTypes } from "sequelize";
import { sequelize } from "../util/database.js";

export const OrderItem = sequelize.define("orderItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: DataTypes.INTEGER,
});
