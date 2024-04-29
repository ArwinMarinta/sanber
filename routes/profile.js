const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, async (req, res) => {
    const userId = req.userId;

    const user = await User.findByPk(userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json({
        name: user.name,
        password: user.password,
        role: user.role
    });
});

module.exports = router;
