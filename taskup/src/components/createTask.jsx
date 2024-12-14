import React, { useState } from 'react';
import '../design/createTask.css';
import Sidebar from './sidebarAdmin';
import Header from './headerAdmin';
import Footer from './Footer';

const CreateTask = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    assign: '',
    priority: '',
    status: '',
    dueDate: '',
    description: '',
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="create-task">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? '' : 'expanded'}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="new-task-container">
          <section className="new-task" onSubmit={handleSubmit}>
            <h2 className="section-heading">Create New Task</h2>
            <div className="form-group">
            <form className='new-task-form'>
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
              <label htmlFor="assign">Assign to</label>
              <select id="assign" name="assign">
                <option>Group/Student</option>
              </select>
              <label htmlFor="priority">Priority</label>
              <select id="priority" name="priority">
                <option>Select Priority</option>
              </select>
              <label htmlFor="status">Status</label>
              <select id="status" name="status">
                <option>Select Task Status</option>
              </select>
              <label htmlFor="due-date">Due Date</label>
              <input id="due-date" name="due-date" type="date" />
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description"></textarea>
              <div className="buttons">
                <button className="save" type="submit">
                  Save
                </button>
                <button className="cancel" type="button">
                  Cancel
                </button>
              </div>
            </form>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CreateTask;