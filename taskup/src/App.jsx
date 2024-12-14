import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/usercontext";
import LoginPage from "./components/login";
import SignUpPage from "./components/signup";
import Dashboard from "./components/dashboard";
import AllTasks from "./components/allTasks";
import Notifications from "./components/notification";
import EditProfile from "./components/editProfile";
import DashboardAdmin from "./components/dashboardAdmin";
import EditProfileAdmin from "./components/editProfileAdmin";
import AllTasksAdmin from "./components/allTasksAdmin";
import NotificationsAdmin from "./components/notificationsAdmin";
import UserManagement from "./components/userManagement";
import CreateTask from "./components/createTask";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* User routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<AllTasks />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/edit-profile-user" element={<EditProfile />} />

          {/* Admin routes */}
          <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
          <Route path="/tasks-admin" element={<AllTasksAdmin />} />
          <Route path="/notifications-admin" element={<NotificationsAdmin />} />
          <Route path="/management" element={<UserManagement />} />
          <Route path="/edit-profile-admin" element={<EditProfileAdmin />} />
          <Route path="/create-task" element={<CreateTask />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;