// import User from '../models/User.js';

const User = require("../models/User"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  pool = require("../config/db");

const register = async (req, res) => {
  try {
    const { name, password, role, email } = req.body;

    const hashPassword = await bcrypt.hash(password, (saltRounds = 10));

    await User.create(name, hashPassword, role, email);

    const data = {
      name: name,
      email: email,
      role: role,
    };

    res.status(200).json({
      status: "Success",
      Message: "Berhasil menambah user",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await pool.query(query, [email]);

    if (rows.length === 0) {
      return res.status(400).json({
        message: "Email tidak terdaftar",
      });
    }

    const user = rows[0];

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(404).json({
        message: "Password salah",
      });
    }

    const payload = { id: user.id, role: user.role };

    const token = await jwt.sign(payload, process.env.JWT_SECRET);

    res.status(200).json({
      status: "success",
      message: "Login berhasil",
      data: { token: token },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  register,
  login,
};
