import React from "react";
import allTasksIcon from "../assets/sum-alltasks-icon.png";
import completeIcon from "../assets/sum-complete-icon.png";
import dueTodayIcon from "../assets/sum-duetoday-icon.png";
import inProgressIcon from "../assets/sum-inprogress-icon.png";
import overdueIcon from "../assets/sum-overdue-icon.png";

const TaskSummary = ({ summary }) => {
  return (
    <div className="task-summary">
      <div className="summary-card alltasks">
        <div className="summary-content">
          <img src={allTasksIcon} alt="All Tasks Icon" className="summary-icon" />
          <div>
            <h2>{summary.totalTasks}</h2>
            <p>All Tasks</p>
          </div>
        </div>
      </div>
      <div className="summary-card inprogress">
        <div className="summary-content">
          <img src={inProgressIcon} alt="In Progress Icon" className="summary-icon" />
          <div>
            <h2>{summary.inProgress}</h2>
            <p>In Progress</p>
          </div>
        </div>
      </div>
      <div className="summary-card overdue">
        <div className="summary-content">
          <img src={overdueIcon} alt="Overdue Icon" className="summary-icon" />
          <div>
            <h2>{summary.overdue}</h2>
            <p>Overdue</p>
          </div>
        </div>
      </div>
      <div className="summary-card duetoday">
        <div className="summary-content">
          <img src={dueTodayIcon} alt="Due Today Icon" className="summary-icon" />
          <div>
            <h2>{summary.dueToday}</h2>
            <p>Due Today</p>
          </div>
        </div>
      </div>
      <div className="summary-card complete">
        <div className="summary-content">
          <img src={completeIcon} alt="Complete Icon" className="summary-icon" />
          <div>
            <h2>{summary.completed}</h2>
            <p>Complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;
