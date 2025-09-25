const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservations');
const Restaurant= require('../models/restaurants');
const Table = require('../models/tables');
const mongoose = require('mongoose');

// 1. Check available tables
router.post('/available', async (req, res) => {
  const { restaurant_id, date, time } = req.body;
  
  try {
 
    const allTables = await Table.find({
      
      restaurant_id: restaurant_id
      
    });

    const bookedTables = await Reservation.find({
    restaurant_id: restaurant_id,
    date,
    time
    }).distinct('table_id');
    
    const availableTables = allTables.filter(table => !bookedTables.includes(table._id.toString()));
    res.json(availableTables);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Book a table

function allocateTables(people, tables) {
  let allocation = { two: 0, four: 0, eight: 0 };

  // Use 8-seaters first
  while (people >= 8 && tables.eight_seater > 0) {
    allocation.eight++;
    tables.eight_seater--;
    people -= 8;
  }

  // Then 4-seaters
  while (people >= 4 && tables.four_seater > 0) {
    allocation.four++;
    tables.four_seater--;
    people -= 4;
  }

  // Then 2-seaters
  while (people > 0 && tables.two_seater > 0) {
    allocation.two++;
    tables.two_seater--;
    people -= 2;
  }

  if (people > 0) return null; // not enough tables
  return allocation;
}

// Book tables automatically based on number of people
router.post('/book', async (req, res) => {
  const { user_id, restaurant_id, people, date, time } = req.body;

  try {
    // Fetch restaurant to check opening/closing time
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    // Check if requested time is within opening and closing
    const [bookHour, bookMin] = time.split(':').map(Number);
    const [openHour, openMin] = restaurant.opening_time.split(':').map(Number);
    const [closeHour, closeMin] = restaurant.closing_time.split(':').map(Number);

    const bookTimeMinutes = bookHour * 60 + bookMin;
    const openTimeMinutes = openHour * 60 + openMin;
    const closeTimeMinutes = closeHour * 60 + closeMin;

    if (bookTimeMinutes < openTimeMinutes || bookTimeMinutes >= closeTimeMinutes) {
      return res.status(400).json({ message: 'Restaurant is closed at this time' });
    }

    // Fetch the restaurant's table counts
    const tableDoc = await Table.findOne({ restaurant_id });
    if (!tableDoc) return res.status(404).json({ message: 'Restaurant tables not found' });

    // Apply allocation algorithm
    const tablesCopy = {
      two_seater: tableDoc.two_seater_available,
      four_seater: tableDoc.four_seater_available,
      eight_seater: tableDoc.eight_seater_available,
    };
    const allocation = allocateTables(people, tablesCopy);
    if (!allocation) return res.status(400).json({ message: 'Not enough tables for this group' });

    // 🔹 Decrement table counts based on allocation
    tableDoc.two_seater_available  -= allocation.two;
    tableDoc.four_seater_available -= allocation.four;
    tableDoc.eight_seater_available -= allocation.eight;

    // Create reservation document
    const reservation = new Reservation({
      restaurant_id,
      customer_id: user_id,   // map user_id → customer_id
      people,
      allocated_tables: allocation,  // { two, four, eight }
      time_slot: new Date(`${date}T${time}:00`)  // build a Date object
    });

    // Save both in parallel
    await Promise.all([reservation.save(), tableDoc.save()]);

    res.json({ message: 'Reservation successful', allocation });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// 3. View reservations
router.get('/user/:userId', async (req, res) => {
  try {
    const reservations = await Reservation.find({ customer_id: req.params.userId });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Update a reservation
router.put('/:id', async (req, res) => {
  const { date, time, table_id } = req.body;

  try {
    // Check if the new table/time slot is already booked
    const existing = await Reservation.findOne({ 
      table_id, 
      date, 
      time, 
      _id: { $ne: req.params.id } // ignore current reservation
    });
    if (existing) {
      return res.status(400).json({ message: 'Table already booked for that time' });
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { date, time, table_id },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.json({ message: 'Reservation updated', reservation: updatedReservation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Cancel a reservation
router.delete('/:id', async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.json({ message: 'Reservation cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
 