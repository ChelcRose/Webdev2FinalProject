import React, { useState } from 'react';
import './Header.css';
import arrowDown from '../assets/profile-arrowdown.png';
import arrowUp from '../assets/profile-arrowup.png';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <header className={`header ${isSidebarOpen ? '' : 'expanded'}`}>
      <div className="hamburger" onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="user-info">
        <div className="user-initial">U</div>
        <div className="dropdown">
          <span className="username" onClick={toggleDropdown}>
            Username
            <img
              src={isDropdownOpen ? arrowUp : arrowDown}
              alt="Dropdown Arrow"
              className="arrow-icon"
            />
          </span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <p>Edit Profile</p>
              <hr />
              <p>Log Out</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
