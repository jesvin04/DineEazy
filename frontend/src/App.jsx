
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/HomePage';
import RestaurantDetails from './pages/restaurantDetails';
import Reservations from './pages/reservations';
import UserProfile from './pages/userProfile';
import AuthProvider from './context/AuthContext';
import RestaurantList from './pages/restaurantList'; // new
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/restaurants" element={<RestaurantList />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;