const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz'); // Import model Quiz
const Question = require('../models/Question'); // Import model Question

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.findAll({
      include: [Question] // Include questions associated with each quiz
    });
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve quizzes' });
  }
});

// Get a specific quiz by ID
router.get('/:id', async (req, res) => {
  const quizId = parseInt(req.params.id);
  try {
    const quiz = await Quiz.findByPk(quizId, {
      include: [Question] // Include questions associated with the quiz
    });
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve quiz' });
  }
});

// Create a new quiz
router.post('/', async (req, res) => {
  const { title, description, questions } = req.body;
  try {
    const newQuiz = await Quiz.create({
      title,
      description
    });
    if (questions && questions.length > 0) {
      await Promise.all(questions.map(async question => {
        await Question.create({
          quizId: newQuiz.id,
          ...question // Spread the question object
        });
      }));
    }
    res.json({ message: 'Quiz created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
});

// Update an existing quiz
router.put('/:id', async (req, res) => {
  const quizId = parseInt(req.params.id);
  const { title, description, questions } = req.body;
  try {
    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    await quiz.update({
      title,
      description
    });

    // Update associated questions
    if (questions && questions.length > 0) {
      await Question.destroy({ where: { quizId } }); // Delete existing questions
      await Promise.all(questions.map(async question => {
        await Question.create({
          quizId: quiz.id,
          ...question // Spread the question object
        });
      }));
    }
    res.json({ message: 'Quiz updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update quiz' });
  }
});

// Delete a quiz
router.delete('/:id', async (req, res) => {
  const quizId = parseInt(req.params.id);
  try {
    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    await quiz.destroy();
    await Question.destroy({ where: { quizId } }); // Delete associated questions
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});

module.exports = router;
