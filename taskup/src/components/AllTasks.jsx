import React, { useState } from 'react';
import './AllTasks.css';
import Sidebar from './Sidebar';
import Header from './Header';

const AllTasks = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="all-tasks-page">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? '' : 'expanded'}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="tasks-container">
          <h2 className="section-heading">All Tasks</h2>
          <table className="task-table">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Title</th>
                <th>Email</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Task 1</td>
                <td>user@email.com</td>
                <td>High</td>
                <td className="completed">Completed</td>
                <td>2024-10-25</td>
                <td>
                  <button className="view-details-btn">View Details</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Task 2</td>
                <td>user@email.com</td>
                <td>Low</td>
                <td className="inprogress">In Progress</td>
                <td>2024-10-30</td>
                <td>
                  <button className="view-details-btn">View Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
