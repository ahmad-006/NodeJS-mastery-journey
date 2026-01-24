import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "MrSheikho1806",
});

export default pool.promise();
