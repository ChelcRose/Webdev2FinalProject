import React, { useState, useEffect } from 'react';
import '../design/userlist.css';
import Sidebar from './sidebarAdmin';
import Header from './headerAdmin';
import Footer from './footer';
import UserList from './UserList'; 
import EditUserModal from './editUserModal'; 
import ViewUserModal from './viewUserModal';

const UserManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [modalUser, setModalUser] = useState(null);
  const [viewModalUser, setViewModalUser] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchedUsers = [
      { id: 1, name: 'User No.1', group: 'Group 1', user: 'User1@gmail.com', phone: '09355720884', status: 'Active' },
      { id: 2, name: 'User No.2', group: 'Group 2', user: 'User2@gmail.com', phone: '09374239793', status: 'Active' },
      { id: 3, name: 'User No.3', group: 'Group 3', user: 'User3@gmail.com', phone: '09162397989', status: 'Active' },
    ];

    setUsers(fetchedUsers);
  }, []);

  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const editUser = (user) => {
    setModalUser(user);
  };

  const closeModal = () => {
    setModalUser(null);
  };

  const viewUser = (user) => {
    setViewModalUser(user);
  };

  const closeViewModal = () => {
    setViewModalUser(null);
  };

  return (
    <div className="user-list">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? '' : 'expanded'}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="user-container">
          <section className="latest-users">
            <h2 className="section-heading">User List</h2>
            <UserList 
              users={users} 
              deleteUser={deleteUser} 
              editUser={editUser} 
              viewUser={viewUser} 
            />
          </section>
        </div>
        <Footer />
      </div>
      {modalUser && <EditUserModal user={modalUser} setUser={setUsers} closeModal={closeModal} />}
      {viewModalUser && <ViewUserModal user={viewModalUser} onClose={closeViewModal} />}
    </div>
  );
};

export default UserManagement;