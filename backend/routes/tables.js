// routes/tables.js
const express = require('express');
const router = express.Router();
const Table = require('../models/tables');

// 1. Add a new table
router.post('/add', async (req, res) => {
  try {
    const newTable = new Table(req.body);
    await newTable.save();
    res.status(201).json({ message: 'Table added successfully', table: newTable });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get all tables
router.get('/', async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get tables by restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const tables = await Table.find({ restaurant_id: req.params.restaurantId });
    res.json(tables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Update a table
router.put('/:id', async (req, res) => {
  try {
    const updatedTable = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTable) return res.status(404).json({ message: 'Table not found' });
    res.json({ message: 'Table updated', table: updatedTable });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Delete a table
router.delete('/:id', async (req, res) => {
  try {
    const deletedTable = await Table.findByIdAndDelete(req.params.id);
    if (!deletedTable) return res.status(404).json({ message: 'Table not found' });
    res.json({ message: 'Table deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
