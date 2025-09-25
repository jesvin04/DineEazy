import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    dateOfBirth: '1990-01-15',
    favoritesCuisine: 'Italian'
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const recentActivity = [
    {
      id: 1,
      type: 'reservation',
      restaurant: 'The Golden Spoon',
      date: '2024-03-15',
      action: 'Made reservation'
    },
    {
      id: 2,
      type: 'review',
      restaurant: 'Ocean View Bistro',
      date: '2024-03-12',
      action: 'Left a review'
    },
    {
      id: 3,
      type: 'favorite',
      restaurant: 'Mountain Peak Restaurant',
      date: '2024-03-10',
      action: 'Added to favorites'
    }
  ];

  return (
    <div className="profile-page">
      <Header />
      
      <main className="profile-content">
        <div className="container">
          <div className="profile-layout">
            <div className="profile-sidebar">
              <div className="profile-card">
                <div className="profile-avatar">
                  <div className="avatar-circle">
                    <User size={40} />
                  </div>
                  <button className="avatar-upload">
                    <Edit2 size={16} />
                  </button>
                </div>

                <div className="profile-info">
                  <h2>{profileData.name}</h2>
                  <p>{profileData.email}</p>
                  <span className="member-since">Member since March 2024</span>
                </div>

                <div className="profile-stats">
                  <div className="stat-item">
                    <span className="stat-number">12</span>
                    <span className="stat-label">Reservations</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">8</span>
                    <span className="stat-label">Reviews</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">5</span>
                    <span className="stat-label">Favorites</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-main">
              <div className="profile-section">
                <div className="section-header">
                  <h3>Personal Information</h3>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="btn btn-secondary edit-btn"
                    >
                      <Edit2 size={16} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="edit-actions">
                      <button 
                        onClick={handleSave}
                        className="btn btn-primary save-btn"
                      >
                        <Save size={16} />
                        Save
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="btn btn-secondary cancel-btn"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="profile-fields">
                  <div className="field-group">
                    <label>
                      <User size={16} />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                      />
                    ) : (
                      <span>{profileData.name}</span>
                    )}
                  </div>

                  <div className="field-group">
                    <label>
                      <Mail size={16} />
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                      />
                    ) : (
                      <span>{profileData.email}</span>
                    )}
                  </div>

                  <div className="field-group">
                    <label>
                      <Phone size={16} />
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                      />
                    ) : (
                      <span>{profileData.phone}</span>
                    )}
                  </div>

                  <div className="field-group">
                    <label>
                      <MapPin size={16} />
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) => setEditData({...editData, location: e.target.value})}
                      />
                    ) : (
                      <span>{profileData.location}</span>
                    )}
                  </div>

                  <div className="field-group">
                    <label>
                      <Calendar size={16} />
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData.dateOfBirth}
                        onChange={(e) => setEditData({...editData, dateOfBirth: e.target.value})}
                      />
                    ) : (
                      <span>{new Date(profileData.dateOfBirth).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon">
                        <Calendar size={16} />
                      </div>
                      <div className="activity-details">
                        <p>
                          <strong>{activity.action}</strong> at {activity.restaurant}
                        </p>
                        <span className="activity-date">
                          {new Date(activity.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;