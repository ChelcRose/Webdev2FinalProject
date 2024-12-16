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


  const adminProfileData = useStore((state) => state.adminProfileData);
  const setAdminProfileData = useStore((state) => state.setAdminProfileData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAdminProfileData({ profileImage: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveProfile = async (updatedProfile) => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/${adminProfileData.admin_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
  
      const result = await response.json();
      setAdminProfileData(result);
      closeModal();
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('An error occurred while saving the profile. Please try again.');
    }
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
                src={adminProfileData.profileImage || defaultAvatar} 
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
                value={adminProfileData.name}
                disabled
              />
            </div>
            <div className="form-group1">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={adminProfileData.username}
                disabled
              />
            </div>
            <div className="form-group1">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Admin@email.com"
                value={adminProfileData.email}
                disabled
              />
            </div>
            <div className="form-group1">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="********"
                value={adminProfileData.password}
                disabled
              />
            </div>
            <div className="form-group1">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="text"
                placeholder="+6391234567891"
                value={adminProfileData.phone}
                disabled
              />
            </div>
            <div className="form-group1">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="********"
                value={adminProfileData.confirmPassword}
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
            profileData={adminProfileData}
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
