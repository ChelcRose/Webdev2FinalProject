import React from 'react';
import '../design/viewUserModal.css';

const ViewUserModal = ({ user, onClose }) => {
  return (
    <div className="view-modal">
      <div className="view-modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h3>User Details</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Group:</strong> {user.group}</p>
        <p><strong>Email:</strong> {user.user}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Status:</strong> {user.status}</p>
      </div>
    </div>
  );
};

export default ViewUserModal;