const express = require('express');
const router = express.Router();

const models = require('./models'); 
const auth = require('./auth'); 

router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await models.getUserByName(name);
    if (!user) {
      return res.status(401).json({ message: 'Username atau password salah!' });
    }

    const passwordMatch = await auth.comparePasswords(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Username atau password salah!' });
    }

    const token = auth.generateToken(user); 

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
