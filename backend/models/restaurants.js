const mongoose= require('mongoose');
const restaurantSchema= new mongoose.Schema({
  name: String,
  location: String,
  cuisine: String,
  opening_time: String,
  closing_time: String
});
module.exports=mongoose.model('Restaurant',restaurantSchema); 