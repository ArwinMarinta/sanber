router.get('/', verifyToken, async (req, res) => {
    const userId = req.userId;

    const answers = await UserAnswer.findAll({
        where: { iduser },
        include: [
            {
                model: Quiz,
                attributes: ['id', 'title', 'description']
            }
        ]
    });

    const quizzes = answers.map(answer => answer.Quiz);

    res.json({ quizzes });
});

module.exports = router;
