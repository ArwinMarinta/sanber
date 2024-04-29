const db = require('../database');

const User = {
  getAll: (callback) => {
    db.query('SELECT * FROM users', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  },
  create: (newUser, callback) => {
    db.query('INSERT INTO users (name, password, token, role, email) VALUES (?, ?, ?, ?, ?)', [newUser.name, newUser.password, newUser.token, newUser.role, newUser.email], callback);
  },
  update: (user, callback) => {
    db.query('UPDATE users SET name = ? WHERE id = ?', [user.name, user.id], callback);
  },
};

module.exports = User;
