import React from 'react';

const TaskTable = ({ tasks }) => {
  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Task ID</th>
          <th>Title</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.priority}</td>
            <td className={task.status.toLowerCase().replace(' ', '')}>{task.status}</td>
            <td>{task.dueDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
