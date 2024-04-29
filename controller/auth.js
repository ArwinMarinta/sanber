// import User from '../models/User.js';
const User = require('../models/User');
import { generateToken } from '../utils/jwt.js';

const regis = async (req, res) => {
  const { name, password, token, role, email } = req.body;
  const newUser = { name, password, token, role, email };
  try {
    const user = await User.create(newUser);
    const token = generateToken(ser);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

module.exports = { regis };