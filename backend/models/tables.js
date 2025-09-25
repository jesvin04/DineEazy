const mongoose= require('mongoose');
const tableSchema = new mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  two_seater_total: { type: Number, default: 0 },
  two_seater_available: { type: Number, default: 0 },
  four_seater_total: { type: Number, default: 0 },
  four_seater_available: { type: Number, default: 0 },
  eight_seater_total: { type: Number, default: 0 },
  eight_seater_available: { type: Number, default: 0 },
});

module.exports = mongoose.model('Table', tableSchema);