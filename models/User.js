const db = require("../config/db");

const create = (name, password, role, email) => {
  const query = `INSERT INTO users (name, password, role, email) VALUES ('${name}', '${password}', '${role}', '${email}') `;
  return db.execute(query);
};

const getUserById = (id) => {
  const query = `SELECT * FROM users WHERE id = ${id}`;
  return db.execute(query);
};

module.exports = {
  create,
  getUserById,
};
