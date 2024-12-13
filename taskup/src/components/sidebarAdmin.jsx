import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../design/sidebar.css';
import logo from '../assets/sidebar-logo.png';
import homeIcon from '../assets/home-icon.png';
import tasksIcon from '../assets/allTasks-icon.png';
import notificationsIcon from '../assets/notifications-icon.png';
import userManagementIcon from "../assets/user-management-icon.png";

const SidebarAdmin = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-logo">
        <img src={logo} alt="TaskUp Logo" />
      </div>
      <ul className="sidebar-menu">
        <li
          className={location.pathname === '/dashboardAdmin' ? 'active' : ''}
          onClick={() => handleNavigation('/dashboardAdmin')}
        >
          <img src={homeIcon} alt="Home Admin" className="sidebar-icon" />
          Home
        </li>
        <li
          className={location.pathname === '/tasks-admin' ? 'active' : ''}
          onClick={() => handleNavigation('/tasks-admin')}
        >
          <img src={tasksIcon} alt="All Tasks Admin" className="sidebar-icon" />
          All Tasks
        </li>
        <li
          className={location.pathname === '/notifications-admin' ? 'active' : ''}
          onClick={() => handleNavigation('/notifications-admin')}  
        >
          <img src={notificationsIcon} alt="Notifications Admin" className="sidebar-icon" />
          Notifications
        </li>
        <li
          className={location.pathname === '/management' ? 'active' : ''}
          onClick={() => handleNavigation('/management')}  
        >
          <img src={userManagementIcon} alt="User Management" className="sidebar-icon" />
          User Management
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;