import { create } from 'zustand';
import defaultAvatar from '../assets/default-avatar.png';

const useStore = create((set) => ({
  // Sidebar State
  isSidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  // Notifications
  notifications: [
    {
      title: 'New Task Assigned',
      description: 'You have been assigned a new task: Create Project Proposal.',
      date: 'November 8, 2024',
      unread: true,
      alert: false,
    },
    {
      title: 'Overdue Task',
      description: 'Task #3 is overdue. Please complete it as soon as possible.',
      date: 'November 3, 2024',
      unread: true,
      alert: true,
    },
  ],
  setNotifications: (notifications) => set({ notifications }),

  // Pagination
  currentPage: 1,
  itemsPerPage: 4,
  setCurrentPage: (page) => set({ currentPage: page }),

  // Task Management
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

  // Summary
  summary: {
    totalTasks: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
    dueToday: 0,
  },
  setSummary: (summary) => set({ summary }),

  // User Profile
  profileData: {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    profileImage: defaultAvatar,
  },
  setProfileData: (updatedData) =>
    set((state) => ({
      profileData: { ...state.profileData, ...updatedData },
    })),

  // Role-based State (User & Admin)
  user: {
    notifications: [],
    tasks: [],
    summary: {
      totalTasks: 0,
      inProgress: 0,
      completed: 0,
      overdue: 0,
      dueToday: 0,
    },
    profileData: {
      name: '',
      username: '',
      email: '',
      profileImage: defaultAvatar,
    },
  },
  admin: {
    notifications: [],
    tasks: [],
    summary: {
      totalTasks: 0,
      inProgress: 0,
      completed: 0,
      overdue: 0,
      dueToday: 0,
    },
    profileData: {
      name: '',
      username: '',
      email: '',
      profileImage: defaultAvatar,
    },
  },

  // Utility functions for User & Admin management
  updateUserProfile: (updatedData) =>
    set((state) => ({
      user: {
        ...state.user,
        profileData: { ...state.user.profileData, ...updatedData },
      },
    })),
  updateAdminProfile: (updatedData) =>
    set((state) => ({
      admin: {
        ...state.admin,
        profileData: { ...state.admin.profileData, ...updatedData },
      },
    })),
  setUserNotifications: (notifications) =>
    set((state) => ({
      user: { ...state.user, notifications },
    })),
  setAdminNotifications: (notifications) =>
    set((state) => ({
      admin: { ...state.admin, notifications },
    })),
  setUserTasks: (tasks) =>
    set((state) => ({
      user: { ...state.user, tasks },
    })),
  setAdminTasks: (tasks) =>
    set((state) => ({
      admin: { ...state.admin, tasks },
    })),
}));

export default useStore;
