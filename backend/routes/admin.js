const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

// Create a new admin
router.post('/add', async (req, res) => {
  const { name, email, phone_number } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    const admin = new Admin({ name, email, phone_number });
    await admin.save();

    res.json({ message: 'Admin created', admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
