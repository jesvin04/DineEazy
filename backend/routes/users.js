const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/add', async (req, res) => {
  const { name, email, phone_number } = req.body; // changed password → phone_number

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, phone_number }); // updated field
    await user.save();

    res.json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
