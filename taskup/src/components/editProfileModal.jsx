import React, { useState, useEffect } from 'react';
import '../design/editProfileModal.css';
import '../assets/Profile_photo.png';

const ProfileModal = ({ profileData, onClose, onSave }) => {
  const [modalData, setModalData] = useState(profileData);
  const [profileImage, setProfileImage] = useState(profileData.profileImage);

  useEffect(() => {
    setModalData(profileData); 
    setProfileImage(profileData.profileImage); 
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result); 
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSave = () => {
    const updatedData = { ...modalData, profileImage }; 
    onSave(updatedData); 
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Profile</h2>

        <div className="profile-picture">
          <img
            src={profileImage || '../assets/Profile_photo.png'} 
            alt="Profile"
            width="100"
            height="100"
          />
          <input
            type="file"
            id="uploadPhoto"
            className="hidden-input"
            onChange={handleImageUpload}
            accept="image/*"
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="modal-name">Name</label>
            <input
              id="modal-name"
              type="text"
              name="name"
              value={modalData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="modal-username">Username</label>
            <input
              id="modal-username"
              type="text"
              name="username"
              value={modalData.username}
              onChange={handleInputChange}
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="modal-email">Email</label>
            <input
              id="modal-email"
              type="email"
              name="email"
              value={modalData.email}
              onChange={handleInputChange}
              placeholder="User@email.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="modal-password">Password</label>
            <input
              id="modal-password"
              type="password"
              name="password"
              value={modalData.password}
              onChange={handleInputChange}
              placeholder="********"
            />
          </div>
          <div className="form-group">
            <label htmlFor="modal-phone">Phone</label>
            <input
              id="modal-phone"
              type="text"
              name="phone"
              value={modalData.phone}
              onChange={handleInputChange}
              placeholder="+6391234567891"
            />
          </div>
          <div className="form-group">
            <label htmlFor="modal-confirmPassword">Confirm Password</label>
            <input
              id="modal-confirmPassword"
              type="password"
              name="confirmPassword"
              value={modalData.confirmPassword}
              onChange={handleInputChange}
              placeholder="********"
            />
          </div>
        </div>

        <button className="edit-profile-btn" onClick={handleSave}>
          Save Profile
        </button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;