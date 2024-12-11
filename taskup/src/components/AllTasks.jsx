import React, { useState } from 'react';
import './AllTasks.css';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const AllTasks = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const tasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Lorem ipsum astrotik ov, förnamn. Nånade äde.',
      assignedBy: 'Admin@email.com',
      assignedTo: 'User@email.com',
      priority: 'High',
      status: 'Complete',
      dueDate: '10/25/2024',
      startDate: '10/20/2024',
      finishDate: '10/24/2024',
      notes: 'Message',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Example task description.',
      assignedBy: 'Admin@email.com',
      assignedTo: 'User@email.com',
      priority: 'Low',
      status: 'In Progress',
      dueDate: '10/30/2024',
      startDate: '10/25/2024',
      finishDate: 'N/A',
      notes: '',
    },
  ];

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
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
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.assignedTo}</td>
                  <td>{task.priority}</td>
                  <td className={task.status.toLowerCase().replace(' ', '-')}>{task.status}</td>
                  <td>{task.dueDate}</td>
                  <td>
                    <button
                      className="view-details-btn"
                      onClick={() => handleViewDetails(task)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && selectedTask && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={closeModal}>
                &times;
              </button>
              <div className="modal-header">
                <h2>{selectedTask.title}</h2>
              </div>
              <div className="modal-body">
                <p><strong>Description:</strong> {selectedTask.description}</p>
                <div className="modal-info">
                  <div>
                    <p><strong>Assigned by:</strong> {selectedTask.assignedBy}</p>
                    <p><strong>Priority:</strong> {selectedTask.priority}</p>
                    <p><strong>Status:</strong> {selectedTask.status}</p>
                  </div>
                  <div>
                    <p><strong>Assigned to:</strong> {selectedTask.assignedTo}</p>
                    <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
                  </div>
                </div>
                <div className="modal-dates">
                  <p><strong>Start Task Date:</strong> {selectedTask.startDate}</p>
                  <p><strong>Finish Task Date:</strong> {selectedTask.finishDate}</p>
                </div>
                <div className="modal-notes">
                  <p><strong>Notes:</strong></p>
                  <textarea defaultValue={selectedTask.notes} disabled></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="edit-btn">Edit</button>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default AllTasks;
