const mongoose= require('mongoose');
const reservationSchema = new mongoose.Schema({
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  people: { type: Number, required: true },
  allocated_tables: {
    two: { type: Number, default: 0 },
    four: { type: Number, default: 0 },
    eight: { type: Number, default: 0 },
  },
  time_slot: { type: Date, required: true }
});
module.exports = mongoose.model('Reservation', reservationSchema);