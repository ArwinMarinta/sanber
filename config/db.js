const mysql = require("mysql2");
const { DB_HOST, DB_NAME, DB_USERNAME } = require("./config");

const dbPool = mysql.createPool({
  host: DB_HOST,
  user: DB_USERNAME,
  database: DB_NAME,
});

module.exports = dbPool.promise();
