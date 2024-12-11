import React, { useState } from 'react';
import './Notifications.css';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import useStore from '../store';

const Notifications = () => {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen); 
  const toggleSidebar = useStore((state) => state.toggleSidebar); 
  const notifications = useStore((state) => state.notifications); 
  const setNotifications = useStore((state) => state.setNotifications); 

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 
  const totalPages = Math.ceil(notifications.length / itemsPerPage);


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
      <Sidebar />
      <div className={`main-content ${isSidebarOpen ? '' : 'expanded'}`}>
        <Header />
        <div className="notifications-container">
          <h2 className="section-heading">Notifications</h2>
          <div className="notifications-list">
            {currentNotifications.map((notification, index) => (
              <div
                key={index}
                className="notification-item"
                onClick={() => handleNotificationClick(index + indexOfFirstItem)} 
              >
                <div>
                  <h3
                    className={`notification-title ${
                      notification.alert ? 'red' : ''
                    }`}
                  >
                    {notification.title}{' '}
                    {notification.unread && <span className="unread-dot">•</span>}
                  </h3>
                  <p className="notification-description">
                    {notification.description}
                  </p>
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
                    className={`pagination-number ${
                      currentPage === page ? 'active' : ''
                    }`}
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

export default Notifications;
