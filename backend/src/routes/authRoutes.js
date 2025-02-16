const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Create new user
    user = new User({ name, email, phone, password, role });

    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", { expiresIn: "1h" });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
