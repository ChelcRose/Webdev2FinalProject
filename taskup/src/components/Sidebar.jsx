import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../design/sidebar.css';
import logo from '../assets/sidebar-logo.png';
import homeIcon from '../assets/home-icon.png';
import tasksIcon from '../assets/allTasks-icon.png';
import notificationsIcon from '../assets/notifications-icon.png';
import useStore from '../store';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tasks = useStore((state) => state.tasks);
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);

  const handleNavigation = (path) => {
    navigate(path);
  };

   return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-logo">
        <img src={logo} alt="TaskUp Logo" />
      </div>
      <ul className="sidebar-menu">
        <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <a onClick={() => handleNavigation('/dashboard')}>
            <img src={homeIcon} alt="Home" className="sidebar-icon" />
            Home
          </a>
        </li>
        <li className={location.pathname === '/tasks' ? 'active' : ''}>
          <a onClick={() => handleNavigation('/tasks')}>
            <img src={tasksIcon} alt="All Tasks" className="sidebar-icon" />
            All Tasks
          </a>
        </li>
        <li className={location.pathname === '/notifications' ? 'active' : ''}>
          <a onClick={() => handleNavigation('/notifications')}>
            <img src={notificationsIcon} alt="Notifications" className="sidebar-icon" />
            Notifications
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
