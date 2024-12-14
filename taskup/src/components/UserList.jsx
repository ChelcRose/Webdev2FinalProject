import React from 'react';
import deleteIcon from '../assets/delete-icon.png';
import editIcon from '../assets/edit-icon.png';
import viewIcon from '../assets/view-icon.png';

const UserList = ({ users, deleteUser, editUser, viewUser }) => {
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Group</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.group}</td>
            <td>{user.user}</td>
            <td>{user.phone}</td>
            <td>{user.status}</td>
            <td>
              <div className="action-buttons">
                <button
                  className="action-btn view-btn"
                  onClick={() => viewUser(user)}
                >
                  <img
                    src={viewIcon}
                    alt="View"
                    className="action-icon"
                  />
                </button>

                <button
                  className="action-btn edit-btn"
                  onClick={() => editUser(user)}
                >
                  <img
                    src={editIcon}
                    alt="Edit"
                    className="action-icon"
                  />
                </button>

                <button
                  className="action-btn delete-btn"
                  onClick={() => deleteUser(user.id)}
                >
                  <img
                    src={deleteIcon}
                    alt="Delete"
                    className="action-icon"
                  />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;