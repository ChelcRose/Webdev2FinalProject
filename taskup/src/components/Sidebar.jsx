import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/sidebar-logo.png';
import homeIcon from '../assets/home-icon.png';
import tasksIcon from '../assets/allTasks-icon.png';
import notificationsIcon from '../assets/notifications-icon.png';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-logo">
        <img src={logo} alt="TaskUp Logo" />
      </div>
      <ul className="sidebar-menu">
        <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <a href="/dashboard">
            <img src={homeIcon} alt="Home" className="sidebar-icon" />
            Home
          </a>
        </li>
        <li className={location.pathname === '/tasks' ? 'active' : ''}>
          <a href="/tasks">
            <img src={tasksIcon} alt="All Tasks" className="sidebar-icon" />
            All Tasks
          </a>
        </li>
        <li className={location.pathname === '/notifications' ? 'active' : ''}>
          <a href="/notifications">
            <img src={notificationsIcon} alt="Notifications" className="sidebar-icon" />
            Notifications
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
