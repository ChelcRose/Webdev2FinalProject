import React, { useState } from 'react';
import './EditProfile.css';
import Sidebar from './Sidebar';
import Header from './Header';
import ProfileModal from './EditProfileModal';
import Footer from './Footer';
import useStore from '../store';
import defaultAvatar from '../assets/default-avatar.png';

const ProfilePage = () => {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen); 
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  const profileData = useStore((state) => state.profileData); 
  const setProfileData = useStore((state) => state.setProfileData); 

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({ profileImage: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveProfile = (updatedProfile) => {
    setProfileData(updatedProfile);
    closeModal();
  };

  return (
    <div className="profile-page">
      <Sidebar />
      <div className={`main-content ${isSidebarOpen ? '' : 'expanded'}`}>
        <Header />
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-picture">
              <img
                src={profileData.profileImage || defaultAvatar}
                alt="Profile"
                width="150"
                height="150"
                className="profile-avatar"
              />
            </div>
          </div>

         
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                value={profileData.name}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={profileData.username}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="User@email.com"
                value={profileData.email}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="********"
                value={profileData.password}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="text"
                placeholder="+6391234567891"
                value={profileData.phone}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="********"
                value={profileData.confirmPassword}
                disabled
              />
            </div>
          </div>

          <button className="edit-profile-btn" onClick={openModal}>
            Edit Profile
          </button>
        </div>

        <Footer />

        {isModalOpen && (
          <ProfileModal
            profileData={profileData} 
            onClose={closeModal}
            onSave={saveProfile}
            handleImageUpload={handleImageUpload}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
