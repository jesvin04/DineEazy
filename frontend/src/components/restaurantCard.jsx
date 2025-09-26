import React from 'react';
import pizzaImage from '../assets/Pizza_Palace.png';
import './restaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
  const { name, location, cuisine, opening_time, closing_time } = restaurant;

  return (
    <div className="restaurant-card">
      <div className="restaurant-image-container">
        <img
          src={pizzaImage}
          alt={name}
          className="restaurant-image"
        />
        <div className="restaurant-details">
          <h2 className="restaurant-name">{name}</h2>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Cuisine:</strong> {cuisine}</p>
          <p><strong>Opening:</strong> {opening_time}</p>
          <p><strong>Closing:</strong> {closing_time}</p>
        </div>
      </div>
      {/* Full width button at bottom */}
      <button className="view-menu-btn">
        View Menu
      </button>
    </div>
  );
};

export default RestaurantCard;
