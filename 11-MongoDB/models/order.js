import { DataTypes } from "sequelize";
import { sequelize } from "../util/database.js";

export const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});
