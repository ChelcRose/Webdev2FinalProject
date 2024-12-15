import React, { useState } from 'react';
import '../design/editProfile.css';
import SidebarAdmin from './SidebarAdmin';
import HeaderAdmin from './HeaderAdmin';
import ProfileModal from './editAdminModal';
import Footer from './Footer';
import useStore from '../store/store';
import defaultAvatar from '../assets/default-avatar.png'; 

const ProfilePageAdmin = () => {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    profileImage: defaultAvatar, 
  });

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prevState) => ({
          ...prevState,
          profileImage: e.target.result,
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
      <SidebarAdmin isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? '' : 'expanded'}`}>
        <HeaderAdmin toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
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
            <div className="form-group1">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                value={profileData.name}
                disabled
              />
            </div>
            <div className="form-group1">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={profileData.username}
                disabled
              />
            </div>
            <div className="form-group1">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Admin@email.com"
                value={profileData.email}
                disabled
              />
            </div>
            <div className="form-group1">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="********"
                value={profileData.password}
                disabled
              />
            </div>
            <div className="form-group1">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="text"
                placeholder="+6391234567891"
                value={profileData.phone}
                disabled
              />
            </div>
            <div className="form-group1">
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

export default ProfilePageAdmin;
