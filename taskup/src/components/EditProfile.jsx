import React, { useState, useEffect } from 'react';
import '../design/editProfile.css';
import Sidebar from './Sidebar';
import Header from './Header';
import ProfileModal from './editProfileModal';
import Footer from './Footer';
import useStore from '../store/store';
import defaultAvatar from '../assets/default-avatar.png';

const ProfilePage = () => {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  const profileData = useStore((state) => state.profileData);
  const setProfileData = useStore((state) => state.setProfileData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/user");
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setProfileData]);

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({ ...profileData, profileImage: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveProfile = async (updatedProfile) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/${profileData.user_id}`, {
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
      setProfileData({ ...profileData, ...updatedProfile }); // Update the store with the new profile data
      alert(result.message); // Show success message from the backend
      closeModal();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(`An error occurred while updating the profile: ${error.message}`);
    }
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
              <input id="name" type="text" value={profileData.name || ''} disabled />
            </div>
            <div className="form-group1">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" value={profileData.username || ''} disabled />
            </div>
            <div className="form-group1">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={profileData.email || ''} disabled />
            </div>
            <div className="form-group1">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={profileData.password || ''} disabled />
            </div>
            <div className="form-group1">
              <label htmlFor="phone">Phone</label>
              <input id="phone" type="text" value={profileData.phone || ''} disabled />
            </div>
            <div className="form-group1">
              < label htmlFor="confirmPassword">Confirm Password</label>
              <input id="confirmPassword" type="password" value={profileData.confirmPassword || ''} disabled />
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
