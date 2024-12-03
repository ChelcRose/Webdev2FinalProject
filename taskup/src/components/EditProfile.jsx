import React, { useState } from 'react';
import './EditProfile.css';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const EditProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log('Profile saved');
  };

  return (
    <div className="edit-profile-page">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? '' : 'expanded'}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-picture">
              <div className="avatar">
                <i className="profile-icon" />
              </div>
              <button className="upload-button">Upload Photo</button>
            </div>
          </div>
          <form className="profile-form" onSubmit={handleSave}>
            <div className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Full Name" />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input type="text" placeholder="Username" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="User@email.com" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="********" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" placeholder="+6391234567891" />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="********" />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="save-profile-button">
                Save 
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default EditProfile;
