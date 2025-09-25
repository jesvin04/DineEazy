import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import Header from '../components/Header';
import './reservations.css';

const Reservations = () => {
  // Mock reservations data
  const reservations = [
    {
      id: 1,
      restaurant: 'The Golden Spoon',
      date: '2024-03-15',
      time: '7:30 PM',
      guests: 4,
      status: 'confirmed',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      restaurant: 'Ocean View Bistro',
      date: '2024-03-20',
      time: '6:00 PM',
      guests: 2,
      status: 'pending',
      image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      restaurant: 'Mountain Peak Restaurant',
      date: '2024-03-10',
      time: '8:00 PM',
      guests: 6,
      status: 'completed',
      image: 'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'completed':
        return 'status-completed';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="reservations-page">
      <Header />
      
      <main className="reservations-content">
        <div className="container">
          <div className="page-header">
            <h1>My Reservations</h1>
            <p>Manage your restaurant bookings and view reservation history</p>
          </div>

          <div className="reservations-list">
            {reservations.map(reservation => (
              <div key={reservation.id} className="reservation-card">
                <div className="reservation-image">
                  <img 
                    src={reservation.image} 
                    alt={reservation.restaurant}
                  />
                </div>

                <div className="reservation-details">
                  <div className="reservation-header">
                    <h3>{reservation.restaurant}</h3>
                    <span className={`status ${getStatusColor(reservation.status)}`}>
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </span>
                  </div>

                  <div className="reservation-info">
                    <div className="info-item">
                      <Calendar size={16} />
                      <span>{new Date(reservation.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>

                    <div className="info-item">
                      <Clock size={16} />
                      <span>{reservation.time}</span>
                    </div>

                    <div className="info-item">
                      <Users size={16} />
                      <span>{reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                  </div>

                  <div className="reservation-actions">
                    {reservation.status === 'confirmed' && (
                      <>
                        <button className="btn btn-secondary">Modify</button>
                        <button className="btn cancel-btn">Cancel</button>
                      </>
                    )}
                    {reservation.status === 'completed' && (
                      <button className="btn btn-primary">Book Again</button>
                    )}
                    {reservation.status === 'pending' && (
                      <button className="btn cancel-btn">Cancel Request</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {reservations.length === 0 && (
            <div className="empty-state">
              <Calendar size={64} className="empty-icon" />
              <h3>No reservations found</h3>
              <p>Start exploring restaurants and make your first reservation!</p>
              <a href="/" className="btn btn-primary">Browse Restaurants</a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Reservations;