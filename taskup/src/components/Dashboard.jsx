import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import TaskSummary from './TaskSummary';
import TaskTable from './TaskTable';
import Header from './Header';
import Footer from './Footer';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState({
    totalTasks: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
    dueToday: 0,
  });

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchedTasks = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Task 1 description here.',
        priority: 'High',
        status: 'Completed',
        dueDate: '2024-10-25',
        startDate: '2024-10-20',
        finishDate: '2024-10-24',
        notes: 'Task 1 notes.',
        assignedBy: 'Admin1@email.com',
        assignedTo: 'User1@email.com',
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Task 2 description here.',
        priority: 'Low',
        status: 'In Progress',
        dueDate: '2024-10-30',
        startDate: '2024-10-25',
        finishDate: '',
        notes: 'Task 2 notes.',
        assignedBy: 'Admin2@email.com',
        assignedTo: 'User1@email.com',
      },
      {
        id: 3,
        title: 'Task 3',
        description: 'Task 3 description here.',
        priority: 'Medium',
        status: 'In Progress',
        dueDate: new Date().toISOString().split('T')[0],
        startDate: '2024-10-28',
        finishDate: '',
        notes: 'Task 3 notes.',
        assignedBy: 'Admin3@email.com',
        assignedTo: 'User1@email.com',
      },
    ];

    setTasks(fetchedTasks);

    const today = new Date().toISOString().split('T')[0];

    const taskSummary = {
      totalTasks: fetchedTasks.length,
      inProgress: fetchedTasks.filter((task) => task.status === 'In Progress').length,
      completed: fetchedTasks.filter((task) => task.status === 'Completed').length,
      overdue: fetchedTasks.filter((task) => new Date(task.dueDate) < new Date()).length,
      dueToday: fetchedTasks.filter((task) => task.dueDate === today).length,
    };

    setSummary(taskSummary);
  }, []);

  return (
    <div className="dashboard">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        tasks={tasks} // Pass tasks to Sidebar
      />
      <div className={`main-content ${isSidebarOpen ? '' : 'expanded'}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
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
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
