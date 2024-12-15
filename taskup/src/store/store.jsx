import { create } from 'zustand';
import axios from 'axios';
import defaultAvatar from '../assets/default-avatar.png';

const useStore = create((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  notifications: [],
  fetchNotifications: async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/notifications');
      set({ notifications: response.data });
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  },
  addNotification: async (notificationData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/notifications', notificationData);
      set((state) => ({ notifications: [...state.notifications, response.data] }));
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  },
  updateNotification: async (notificationId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/notifications/${notificationId}`, updatedData);
      set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification.id === notificationId ? response.data : notification
        ),
      }));
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  },
  deleteNotification: async (notificationId) => {
    try {
      await axios.delete(`http://localhost:3001/api/notifications/${notificationId}`);
      set((state) => ({
        notifications: state.notifications.filter((notification) => notification.id !== notificationId),
      }));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  },

  currentPage: 1,
  itemsPerPage: 4,
  setCurrentPage: (page) => set({ currentPage: page }),

  tasks: [
    {
      id: 1,
      title: 'Task 1',
      assignedTo: 'user1@example.com',
      priority: 'High',
      status: 'In Progress',
      dueDate: '2024-12-20',
      description: 'Complete the first task description.',
      assignedBy: 'Admin',
      startDate: '2024-12-01',
      finishDate: '',
      notes: 'This is a note for Task 1.',
    },
    {
      id: 2,
      title: 'Task 2',
      assignedTo: 'user2@example.com',
      priority: 'Low',
      status: 'Completed',
      dueDate: '2024-12-15',
      description: 'Complete the second task description.',
      assignedBy: 'Admin',
      startDate: '2024-11-20',
      finishDate: '2024-12-10',
      notes: 'This is a note for Task 2.',
    },
  ],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  setTasks: (tasks) => set({ tasks }),

  summary: {
    totalTasks: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
    dueToday: 0,
  },
  setSummary: (summary) => set({ summary }),

  profileData: {
    name: 'User Name',
    username: 'username',
    email: 'user@example.com',
    password: '********',
    confirmPassword: '********',
    phone: '+6391234567891',
    profileImage: defaultAvatar,
  },
  setProfileData: (updatedData) =>
    set((state) => ({
      profileData: { ...state.profileData, ...updatedData },
    })),

  adminProfileData: {
    name: 'Admin Name',
    username: 'admin',
    email: 'admin@example.com',
    password: '********',
    confirmPassword: '********',
    phone: '+6391234567891',
    profileImage: defaultAvatar,
  },
  setAdminProfileData: (updatedData) =>
    set((state) => ({
      adminProfileData: { ...state.adminProfileData, ...updatedData },
    })),

  userRole: 'user',
  setUserRole: (role) => set({ userRole: role }),
}));

export default useStore;
