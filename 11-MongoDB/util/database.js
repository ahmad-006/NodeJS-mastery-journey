import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "node-complete",
  "root",
  "MrSheikho1806",
  {
    dialect: "mysql",
    host: "localhost",
  },
);
