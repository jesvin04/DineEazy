const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // added CORS
const restaurantRoutes = require('./routes/restaurants');
const reservationsRoutes = require('./routes/reservations');
const tableRoutes = require('./routes/tables');
const userRoutes = require('./routes/users');      
const adminRoutes = require('./routes/admin'); 

dotenv.config();

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Parse JSON except for GET/HEAD/DELETE
app.use((req, res, next) => {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'DELETE') {
    return next(); // skip JSON parsing for GET/HEAD/DELETE
  }
  express.json()(req, res, next);
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("mongoDB connected"))
  .catch(err => console.error(err));

app.use('/api/reservations', reservationsRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/users', userRoutes);    
app.use('/api/admins', adminRoutes);  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
