import React, { useState } from 'react';
import './EditProfile.css';
import Sidebar from './sidebar';
import Header from './header';
import ProfileModal from './EditProfileModal';
import Footer from './footer';

const ProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prevState) => !prevState);

  const [profileImage, setProfileImage] = useState('/assets/Profile_photo.png');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    profileImage: '/assets/Profile_photo.png', // Default profile image
  });

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);  // Update the profile image
        setProfileData((prevState) => ({
          ...prevState,
          profileImage: e.target.result,  // Update the profile data image
        }));
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
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? '' : 'expanded'}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-picture">
              <img
                src={profileData.profileImage || profileImage}
                alt="Profile"
                width="100"
                height="100"
              />
            </div>
          </div>

          {/* Profile Form */}
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

        {/* Profile Modal */}
        {isModalOpen && (
          <ProfileModal
            profileData={profileData}
            onClose={closeModal}
            onSave={saveProfile}
            handleImageUpload={handleImageUpload} // Pass image handler to modal
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;