const db = require('../database');

const QuizQuestion = {
  getAllByQuizId: (idQuiz, callback) => {
    db.query('SELECT * FROM quiz WHERE idquiz = ?', [idQuiz], callback);
  },
  create: (soal, callback) => {
    db.query('INSERT INTO quiz (idquiz, soal, jawabanBenar) VALUES (?, ?, ?)', [soal.idQuiz, soal.soal, soal.jawabanBenar], callback);
  },
};

module.exports = QuizQuestion;
