import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import TaskSummary from './TaskSummary';
import TaskTable from './TaskTable';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState({
    totalTasks: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
  });

  useEffect(() => {
    const fetchedTasks = [
      { id: 1, title: 'Task 1', priority: 'High', status: 'Completed', dueDate: '2024-10-25' },
      { id: 2, title: 'Task 2', priority: 'Low', status: 'In Progress', dueDate: '2024-10-30' },
    ];

    setTasks(fetchedTasks);

    const taskSummary = {
      totalTasks: fetchedTasks.length,
      inProgress: fetchedTasks.filter((task) => task.status === 'In Progress').length,
      completed: fetchedTasks.filter((task) => task.status === 'Completed').length,
      overdue: fetchedTasks.filter((task) => new Date(task.dueDate) < new Date()).length,
    };

    setSummary(taskSummary);
  }, []);

  return (
    <div className="dashboard">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`main-content ${isSidebarOpen ? '' : 'expanded'}`}>
        <header className="dashboard-header">
          <div className="hamburger" onClick={toggleSidebar}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className="user-info">
            <span className="user-initial">U</span>
            <span className="username">Username</span>
          </div>
        </header>
        <div className="dashboard-container">
          <section className="task-dashboard">
            <h2 className="section-heading">Task Dashboard</h2>
            <TaskSummary summary={summary} />
          </section>
          <section className="latest-tasks">
            <h2 className="section-heading">Latest Tasks</h2>
            <TaskTable tasks={tasks} />
          </section>
        </div>
        <footer>Copyright © 2024 - TaskUp. All Rights Reserved.</footer>
      </div>
    </div>
  );
};

export default Dashboard;
