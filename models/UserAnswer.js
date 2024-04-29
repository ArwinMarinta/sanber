const db = require('../db');
const Sequelize = require('sequelize');
const User = require('./User');
const Quiz = require('./quiz');
const QuizQuestion = require('./QuizQuestion');

const UserAnswer = db.define('Jawab', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iduser: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    idquiz: {
        type: Sequelize.INTEGER,
        references: {
            model: Quiz,
            key: 'id'
        },
        allowNull: false
    },
    idsoal: {
        type: Sequelize.INTEGER,
        references: {
            model: QuizQuestion,
            key: 'id'
        },
        allowNull: false
    },
    answer: {
        type: Sequelize.STRING
    },
    score: {
        type: Sequelize.INTEGER
    }
});

module.exports = UserAnswer;
