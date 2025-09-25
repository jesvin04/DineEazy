const express =require('express');
const router = express.Router();
const Restaurant=require('../models/restaurants');
const { configDotenv } = require('dotenv');
router.post('/add' , async(req, res)=> {
    try{
        const newRestaurant= new Restaurant(req.body);
        await newRestaurant.save();
        res.status(201).json({message:'Restaurant added successfully'});
    }catch(err){
        res.status(500).json({error:err.message});
    }
});
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


