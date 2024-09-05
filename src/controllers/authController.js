const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { user, password } = req.body;

  try {
    let userExist = await User.findOne({ user });
    if (userExist) {
      return res.status(400).json({ msg: "User is already exists" });
    }

    const newUser = new User({ user, password });
    await newUser.save();

    const payload = { user: { id: newUser.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "10h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  const { user, password } = req.body;

  try {
    let userExist = await User.findOne({ user });
    if (!userExist) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: userExist.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKE_EXPIRATION },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { register, login };
