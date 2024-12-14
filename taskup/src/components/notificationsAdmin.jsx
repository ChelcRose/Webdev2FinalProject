import React, { useState } from 'react';
import '../design/notification.css';
import Sidebar from './sidebarAdmin';
import Header from './headerAdmin';
import Footer from './Footer';

const NotificationsAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([
    { title: 'New Task Assigned', description: 'You have been assigned a new task: Create Project Proposal by Admin #4', date: 'November 8, 2024 00:00', unread: true },
    { title: 'Comment Added', description: 'Lacking details - Admin #2', date: 'November 3, 2024 21:30', unread: true },
    { title: 'Overdue Task Alert', description: 'Task #3 is overdue. Please complete as soon as possible.', date: 'November 3, 2024 00:00', alert: true, unread: true },
    { title: 'Task Due Today', description: 'Task #1 is due today. Please complete by the end of the day.', date: 'November 2, 2024 00:00', unread: false },
    { title: 'New Task Assigned', description: 'You have been assigned a new task: Figma Prototype by Admin #1', date: 'November 1, 2024 11:59', unread: true },
    { title: 'Overdue Task Alert', description: 'Task #1 is overdue. Please complete as soon as possible.', date: 'November 1, 2024 09:00', alert: true, unread: true },
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleNotificationClick = (index) => {
    const updatedNotifications = notifications.map((notification, idx) =>
      idx === index ? { ...notification, unread: false } : notification
    );
    setNotifications(updatedNotifications);
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotifications = notifications.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="notifications-page">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? '' : 'expanded'}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="notifications-container">
          <h2 className="section-heading">Notifications</h2>
          <div className="notifications-list">
            {currentNotifications.map((notification, index) => (
              <div
                key={index}
                className={`notification-item ${notification.unread ? 'unread' : ''}`}
                onClick={() => handleNotificationClick(index + indexOfFirstItem)}
              >
                <div>
                  <h3 className={`notification-title ${notification.alert ? 'red' : ''}`}>
                    {notification.title} {notification.unread && <span className="unread-dot">•</span>}
                  </h3>
                  <p className="notification-description">{notification.description}</p>
                </div>
                <span className="notification-date">{notification.date}</span>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                  <span
                    key={page}
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </span>
                );
              })}
            </div>

            <button
              className="pagination-btn"
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default NotificationsAdmin;
