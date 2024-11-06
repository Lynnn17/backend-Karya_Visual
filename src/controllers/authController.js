// controllers/authController.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../models");
const User = db.User;
dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "Email Tidak Ditemukan" });
  } else if (email === user.email && password === user.password) {
    const user = { email };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({ token });
  } else {
    return res.status(401).json({ message: "Invalid credentials!" });
  }
};

const logout = (req, res) => {
  console.log(req);
  res.json({ message: "Logout Success" });
};

module.exports = { login, logout };
