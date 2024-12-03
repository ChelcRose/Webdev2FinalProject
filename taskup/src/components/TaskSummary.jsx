import React from 'react';

const TaskSummary = ({ summary }) => {
  return (
    <div className="task-summary">
      <div className="summary-card alltasks">
        <h2>{summary.totalTasks}</h2>
        <p>All Tasks</p>
      </div>
      <div className="summary-card inprogress">
        <h2>{summary.inProgress}</h2>
        <p>In Progress</p>
      </div>
      <div className="summary-card overdue">
        <h2>{summary.overdue}</h2>
        <p>Overdue</p>
      </div>
      <div className="summary-card duetoday">
        <h2>{summary.duetoday}</h2>
        <p>Due Today</p>
      </div>
      <div className="summary-card complete">
        <h2>{summary.completed}</h2>
        <p>Complete</p>
      </div>
    </div>
  );
};

export default TaskSummary;
