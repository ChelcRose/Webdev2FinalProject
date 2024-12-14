import React, { useState } from 'react';
import '../design/allTasksAdmin.css';
import Sidebar from './sidebarAdmin';
import Header from './headerAdmin';
import Footer from './Footer';
import useStore from '../store/store';

const AllTasksAdmin = () => {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  const tasks = useStore((state) => state.tasks);
  const updateTask = useStore((state) => state.updateTask);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleViewDetails = (task) => {
    setSelectedTask({ ...task });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveDetails = () => {
    if (selectedTask) {
      updateTask(selectedTask);
    }
    closeModal();
  };

  const handleChange = (field, value) => {
    setSelectedTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
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
                  <td className={task.status.toLowerCase().replace(' ', '-')}>
                    {task.status}
                  </td>
                  <td>{task.dueDate}</td>
                  <td>
                    <button
                      className="view-details-btn"
                      onClick={() => handleViewDetails(task)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && selectedTask && (
          <div className="modal-overlay1">
            <div className="modal-content1">
              <button className="close-btn1" onClick={closeModal}>
                &times;
              </button>
              <div className="modal-header1">
                <h2>Edit Task Details</h2>
              </div>
              <div className="modal-body1">
                <div className="modal-field">
                  <label>
                    <strong>Title:</strong>
                  </label>
                  <input
                    type="text"
                    value={selectedTask.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                  />
                </div>
                <div className="modal-field">
                  <label>
                    <strong>Description:</strong>
                  </label>
                  <textarea
                    value={selectedTask.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                  />
                </div>
                <div className="modal-field">
                  <label>
                    <strong>Assigned To:</strong>
                  </label>
                  <input
                    type="email"
                    value={selectedTask.assignedTo}
                    onChange={(e) => handleChange('assignedTo', e.target.value)}
                  />
                </div>
                <div className="modal-field">
                  <label>
                    <strong>Priority:</strong>
                  </label>
                  <select
                    value={selectedTask.priority}
                    onChange={(e) => handleChange('priority', e.target.value)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="modal-field">
                  <label>
                    <strong>Status:</strong>
                  </label>
                  <select
                    value={selectedTask.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
                <div className="modal-field">
                  <label>
                    <strong>Due Date:</strong>
                  </label>
                  <input
                    type="date"
                    value={selectedTask.dueDate}
                    onChange={(e) => handleChange('dueDate', e.target.value)}
                  />
                </div>
                <div className="modal-notes1">
                  <label>
                    <strong>Notes:</strong>
                  </label>
                  <textarea
                    placeholder="Enter your notes here"
                    value={selectedTask.notes || ''}
                    onChange={(e) => handleChange('notes', e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer1">
                <button className="edit-btn1" onClick={handleSaveDetails}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default AllTasksAdmin;
