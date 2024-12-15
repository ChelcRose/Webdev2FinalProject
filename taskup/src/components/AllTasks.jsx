import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../design/allTasks.css';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import useStore from '../store/store';

const AllTasks = () => {
  const { state } = useLocation();
  const tasks = useStore((state) => state.tasks);
  const setTasks = useStore((state) => state.setTasks);
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    
    if (state?.tasks && tasks.length === 0) {
      setTasks(state.tasks);
    }
  }, [state, tasks, setTasks]);

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveNotes = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id ? { ...task, notes: selectedTask.notes } : task
    );
    setTasks(updatedTasks);
    closeModal();
  };

  return (
    <div className="all-tasks-page">
 
      <Sidebar />
      <div className={`main-content ${isSidebarOpen ? '' : 'expanded'}`}>
        <Header />
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
                      View Details
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
                <h2>{selectedTask.title}</h2>
              </div>
              <div className="modal-body1">
                <p>
                  <strong>Description:</strong> {selectedTask.description}
                </p>
                <div className="modal-info">
                  <div>
                    <p>
                      <strong>Assigned by:</strong> {selectedTask.assignedBy}
                    </p>
                    <p>
                      <strong>Priority:</strong> {selectedTask.priority}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedTask.status}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Assigned to:</strong> {selectedTask.assignedTo}
                    </p>
                    <p>
                      <strong>Due Date:</strong> {selectedTask.dueDate}
                    </p>
                  </div>
                </div>
                <div className="modal-dates">
                  <p>
                    <strong>Start Task Date:</strong> {selectedTask.startDate}
                  </p>
                  <p>
                    <strong>Finish Task Date:</strong> {selectedTask.finishDate}
                  </p>
                </div>
                <div className="modal-notes1">
                  <p>
                    <strong>Notes:</strong>
                  </p>
                  <textarea
                    placeholder="Enter your notes here"
                    value={selectedTask.notes || ''}
                    onChange={(e) =>
                      setSelectedTask((prevTask) => ({
                        ...prevTask,
                        notes: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="modal-footer1">
                <button className="edit-btn1" onClick={handleSaveNotes}>
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

export default AllTasks;
