const db = require('../database');

const Quiz = {
  getAll: (callback) => {
    db.query('SELECT * FROM quizzes', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM quizzes WHERE id = ?', [id], callback);
  },
  create: (quiz, callback) => {
    db.query('INSERT INTO quizzes (title, description, type) VALUES (?, ?, ?)', [quiz.title, quiz.description, quiz.type], callback);
  },
};

module.exports = Quiz;
