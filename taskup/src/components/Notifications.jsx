import React, { useState } from 'react';
import './Notifications.css';
import Sidebar from './Sidebar';
import Header from './Header';

const Notifications = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const notifications = [
    {
      title: 'New Task Assigned',
      body: 'You have been assigned a new task: Create Project Proposal by Admin #4',
      date: 'November 8, 2024 00:00',
      isRed: false,
    },
    {
      title: 'Comment Added',
      body: 'Lacking details - Admin #2',
      date: 'November 3, 2024 21:30',
      isRed: false,
    },
    {
      title: 'Overdue Task Alert',
      body: 'Task #3 is overdue. Please complete as soon as possible.',
      date: 'November 3, 2024 00:00',
      isRed: true,
    },
    {
      title: 'Task Due Today',
      body: 'Task #1 is due today. Please complete by the end of the day.',
      date: 'November 2, 2024 00:00',
      isRed: false,
    },
    {
      title: 'New Task Assigned',
      body: 'You have been assigned a new task: Figma Prototype by Admin #1',
      date: 'November 1, 2024 11:59',
      isRed: false,
    },
    {
      title: 'Overdue Task Alert',
      body: 'Task #1 is overdue. Please complete as soon as possible.',
      date: 'November 1, 2024 09:00',
      isRed: true,
    },
  ];

  return (
    <div className="notifications-page">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? '' : 'expanded'}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="notifications-container">
          <h2 className="notifications-header">Notifications</h2>
          {notifications.map((notification, index) => (
            <div className="notification-item" key={index}>
              <div>
                <div
                  className={`notification-title ${
                    notification.isRed ? 'red' : ''
                  }`}
                >
                  {notification.title} <span style={{ color: 'red' }}>•</span>
                </div>
                <div className="notification-body">{notification.body}</div>
              </div>
              <div className="notification-date">{notification.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
