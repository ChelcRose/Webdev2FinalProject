import React, { useState } from 'react';
import '../design/viewUserModal.css';

const ViewUserModal = ({ user, onClose }) => {
  return (
    <div className={`view-modal ${user ? 'show' : ''}`}>
      <div className="view-modal-content">
        <h3>User Details</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Group:</strong> {user.group}</p>
        <p><strong>Email:</strong> {user.user}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Status:</strong> {user.status}</p>
        <button className='close-button' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ViewUserModal;