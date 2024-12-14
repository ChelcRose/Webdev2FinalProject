import React, { useState } from 'react';
import '../design/editUserModal.css';

const EditUserModal = ({ user, setUser, closeModal }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setUser((prevUsers) =>
      prevUsers.map((u) => (u.id === editedUser.id ? editedUser : u))
    );
    closeModal();
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <h3>Edit User</h3>
        <label>Name:</label>
        <input type="text" name="name" value={editedUser.name} onChange={handleChange} />
        <label>Group:</label>
        <input type="text" name="group" value={editedUser.group} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="user" value={editedUser.user} onChange={handleChange} />
        <label>Phone:</label>
        <input type="text" name="phone" value={editedUser.phone} onChange={handleChange} />
        <label>Status:</label>
        <input type="text" name="status" value={editedUser.status} onChange={handleChange} />
        <div className='button-container'>
          <button className='save-button' onClick={handleSubmit}>Save Changes</button>
          <button className='cancel-button' onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;