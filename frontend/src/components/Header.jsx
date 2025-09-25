import React, { useState } from 'react';
import { User, Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <header className="header">
        <nav className="nav">
          <div className="nav-container">
            <div className="nav-brand">
              <span className="brand-name">Dineary</span>
            </div>

            <div className="nav-desktop">
              <div className="nav-links">
                <a href="/restaurants" className="nav-link">View Restaurants</a>
                <a href="/book-reservation" className="nav-link">Book Reservation</a>
                {user ? (
                  <div className="user-menu">
                    <a href="/reservations" className="nav-link">My Reservations</a>
                    <button onClick={logout} className="btn btn-primary">
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="btn btn-primary"
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </div>

            <div className="nav-mobile">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="mobile-menu-btn"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="mobile-menu">
              <div className="mobile-menu-content">
                <a href="/" className="mobile-menu-link">Our Pricing</a>
                <a href="/restaurants" className="mobile-menu-link">Services</a>
                {user ? (
                  <>
                    <a href="/reservations" className="mobile-menu-link">My Reservations</a>
                    <button onClick={logout} className="btn btn-primary mobile-menu-btn">
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="btn btn-primary mobile-menu-btn"
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}
    </>
  );
};

export default Header;