import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Users, Calendar } from 'lucide-react';
import Header from '../components/Header';
import './restaurantDetails.css';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);

  // Mock restaurant data
  const restaurant = {
    id: 1,
    name: 'The Golden Spoon',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 342,
    cuisine: 'Italian Fine Dining',
    location: '123 Main Street, New York, NY',
    description: 'Experience exquisite Italian cuisine in an elegant atmosphere with our carefully crafted menu featuring authentic flavors and premium ingredients.',
    priceRange: '$$$',
    features: ['Romantic', 'Business Dining', 'Wine Bar', 'Outdoor Seating'],
    hours: {
      'Monday - Thursday': '11:00 AM - 10:00 PM',
      'Friday - Saturday': '11:00 AM - 11:00 PM',
      'Sunday': '12:00 PM - 9:00 PM'
    }
  };

  const timeSlots = [
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', 
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
  ];

  const handleReservation = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }
    alert(`Reservation confirmed for ${guests} guests on ${selectedDate} at ${selectedTime}`);
  };

  return (
    <div className="restaurant-details">
      <Header />
      
      <main className="details-content">
        <div className="container">
          <div className="restaurant-hero">
            <img 
              src={restaurant.image} 
              alt={restaurant.name}
              className="restaurant-image"
            />
            
            <div className="restaurant-info">
              <div className="restaurant-header">
                <h1>{restaurant.name}</h1>
                <div className="rating-info">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        className={i < Math.floor(restaurant.rating) ? 'star filled' : 'star'} 
                      />
                    ))}
                  </div>
                  <span className="rating-score">{restaurant.rating}</span>
                  <span className="review-count">({restaurant.reviews} reviews)</span>
                </div>
              </div>

              <div className="restaurant-meta">
                <div className="meta-item">
                  <MapPin size={16} />
                  <span>{restaurant.location}</span>
                </div>
                <div className="meta-item">
                  <span className="cuisine-type">{restaurant.cuisine}</span>
                </div>
                <div className="meta-item">
                  <span className="price-range">{restaurant.priceRange}</span>
                </div>
              </div>

              <p className="restaurant-description">
                {restaurant.description}
              </p>

              <div className="restaurant-features">
                {restaurant.features.map((feature, index) => (
                  <span key={index} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="details-grid">
            <div className="details-main">
              <section className="hours-section">
                <h3>Hours</h3>
                <div className="hours-list">
                  {Object.entries(restaurant.hours).map(([day, hours]) => (
                    <div key={day} className="hours-item">
                      <span className="day">{day}</span>
                      <span className="hours">{hours}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="reservation-sidebar">
              <div className="reservation-card">
                <h3>Make a Reservation</h3>
                
                <div className="reservation-form">
                  <div className="form-group">
                    <label>
                      <Calendar size={16} />
                      Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <Clock size={16} />
                      Time
                    </label>
                    <div className="time-slots">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      <Users size={16} />
                      Guests
                    </label>
                    <select 
                      value={guests} 
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button 
                    className="btn btn-primary reserve-btn"
                    onClick={handleReservation}
                  >
                    Reserve Table
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDetails;