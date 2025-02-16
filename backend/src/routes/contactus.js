const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact"); // Import your schema

// POST route to handle form submission
router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate request
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, Email, and Message are required!" });
    }

    // Save contact message in the database
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
