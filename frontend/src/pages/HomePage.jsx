import React from 'react';
import { Star, ArrowRight, Users, Calendar } from 'lucide-react';
import Header from '../components/Header';
import './HomePage.css';

const Homepage = () => {
  return (
    <div className="homepage">
      <Header />
      
      <main className="main-content">
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="hero-left">
                <div className="hero-text">
                  <h1 className="hero-title">
                    Restaurant
                    <br />
                    Reservations
                  </h1>
                  
                  <div className="rating-section">
                    <div className="stars">
                      <Star className="star filled" size={20} />
                      <Star className="star filled" size={20} />
                      <Star className="star filled" size={20} />
                      <Star className="star filled" size={20} />
                      <Star className="star half" size={20} />
                    </div>
                  </div>

                  <p className="hero-description">
                    The Best Platform To Find And Book Tables At Your Favorite
                    Restaurants — Live
                  </p>

                  <div className="user-testimonial">
                    <div className="testimonial-content">
                      <div className="user-info">
                        <div className="user-avatar">
                          <span>JM</span>
                        </div>
                        <div className="user-details">
                          <h4>Julia Martin</h4>
                          <p>UI Designer • New York City</p>
                        </div>
                      </div>
                      <div className="testimonial-rating">
                        <span className="rating-score">4.9</span>
                        <span className="rating-label">/ Service</span>
                      </div>
                    </div>
                  </div>

                  <button className="cta-button">
                    Check Availability
                  </button>
                </div>
              </div>

              <div className="hero-right">
                <div className="hero-image-container">
                  <img 
                    src="https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Restaurant Interior" 
                    className="hero-image"
                  />
                  
                  <div className="stats-card">
                    <div className="stats-item">
                      <h3>5.0</h3>
                      <p>Overall Rating</p>
                    </div>
                    <div className="stats-item">
                      <h3>3.4M+</h3>
                      <p>Diners annually</p>
                    </div>
                  </div>

                  <div className="user-card">
                    <div className="user-card-content">
                      <div className="user-card-avatar">
                        <img 
                          src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100" 
                          alt="Eve Robert"
                        />
                      </div>
                      <div className="user-card-info">
                        <h4>Eve Robert</h4>
                        <p>Food Critics Expert</p>
                      </div>
                    </div>
                    <button className="signup-btn">
                      Sign Up <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Calendar size={32} />
                </div>
                <h3>Easy Booking</h3>
                <p>Book tables at your favorite restaurants with just a few clicks</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <Users size={32} />
                </div>
                <h3>Trusted by Millions</h3>
                <p>Join over 3.4M+ diners who trust us for their dining experiences</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <Star size={32} />
                </div>
                <h3>Top Rated</h3>
                <p>Discover highly rated restaurants with authentic reviews</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;