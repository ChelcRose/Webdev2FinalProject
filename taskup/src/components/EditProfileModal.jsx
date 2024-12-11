import React, { useState, useEffect } from 'react';
import './EditProfileModal.css';

const ProfileModal = ({ profileData, onClose, onSave }) => {
  const [modalData, setModalData] = useState(profileData);
  const [profileImage, setProfileImage] = useState(profileData.profileImage);

  // Synchronize modalData and profileImage with props (profileData)
  useEffect(() => {
    setModalData(profileData); // Ensure modalData is updated when profileData changes
    setProfileImage(profileData.profileImage); // Set the profile image
  }, [profileData]);

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile image upload
  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result); // Update profile image state
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Save the updated profile data
  const handleSave = () => {
    const updatedData = { ...modalData, profileImage }; // Include the profile image in the saved data
    onSave(updatedData); // Send updated data to parent component
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Profile</h2>

        {/* Profile Image Upload */}
        <div className="profile-picture">
          <img
            src={profileImage || '/assets/Profile_photo.png'} // Default image if no profile image
            alt="Profile"
            width="100"
            height="100"
          />
          <input
            type="file"
            id="uploadPhoto"
            className="hidden-input"
            onChange={handleImageUpload}
            accept="image/*" // Restrict file selection to images
          />
        </div>

        {/* Form Inputs */}
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

        {/* Save Button */}
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