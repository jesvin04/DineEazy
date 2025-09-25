import React, { useState } from 'react';
import { User, Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Brand */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">Dineary</div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="/"
                  className="text-gray-900 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Our Pricing
                </a>
                <a
                  href="/restaurants"
                  className="text-gray-900 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Services
                </a>

                {/* Auth Section */}
                {user ? (
                  <div className="flex items-center space-x-4">
                    <a
                      href="/reservations"
                      className="text-gray-900 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors"
                    >
                      My Reservations
                    </a>
                    <button
                      onClick={logout}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <User size={18} />
                    Sign In
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-900 hover:text-amber-600 focus:outline-none"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <a
                href="/"
                className="block text-gray-900 hover:text-amber-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Our Pricing
              </a>
              <a
                href="/restaurants"
                className="block text-gray-900 hover:text-amber-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Services
              </a>

              {user ? (
                <>
                  <a
                    href="/reservations"
                    className="block text-gray-900 hover:text-amber-600 px-3 py-2 rounded-md text-base font-medium"
                  >
                    My Reservations
                  </a>
                  <button
                    onClick={logout}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMenuOpen(false); // close menu when modal opens
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors flex items-center gap-2"
                >
                  <User size={18} />
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </>
  );
};

export default Header;
