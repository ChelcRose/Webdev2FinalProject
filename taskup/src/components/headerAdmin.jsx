import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../design/headerAdmin.css';
import arrowDown from '../assets/profile-arrowdown.png';
import arrowUp from '../assets/profile-arrowup.png';
import plusIcon from '../assets/plus-icon.png';

const HeaderAdmin = ({ toggleSidebar, isSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);

  const handleEditProfile = () => {
    navigate('/edit-profile-admin');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleCreateTask = () => {
    navigate('/create-task');
  };

  return (
    <header className={`header ${isSidebarOpen ? '' : 'expanded'}`}>
      <div className="hamburger" onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="create-task-button">
        <div className="column1">Create New Task</div>
        <div className="column2">
          <img
            src={plusIcon}
            alt="Plus Icon"
            className="plus-icon"
            onClick={handleCreateTask}
          />
        </div>
      </div>
      <div className="user-info">
        <div className="user-initial">A</div>
        <div className="dropdown">
          <span className="username" onClick={toggleDropdown}>
            Admin
            <img
              src={isDropdownOpen ? arrowUp : arrowDown}
              alt="Dropdown Arrow"
              className="arrow-icon"
            />
          </span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <p onClick={handleEditProfile} className="edit-profile-button">
                Edit Profile
              </p>
              <hr />
              <p onClick={handleLogout} className="logout-button">Log Out</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
