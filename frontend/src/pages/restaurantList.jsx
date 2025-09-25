import React, { useEffect, useState } from 'react';
import RestaurantCard from '../components/restaurantCard';
import axios from 'axios';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]); // make sure initial state is an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/restaurants/') // replace with your backend URL
      .then(res => {
        // if res.data is an object containing array
        setRestaurants(Array.isArray(res.data) ? res.data : res.data.restaurants || []);
      })
      .catch(err => {
        console.error(err);
        setRestaurants([]); // fallback to empty array
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading restaurants...</p>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        restaurants.map(restaurant => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))
      )}
    </div>
  );
};

export default RestaurantList;
