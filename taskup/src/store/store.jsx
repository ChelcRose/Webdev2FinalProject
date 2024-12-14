import { create } from 'zustand';
import defaultAvatar from './assets/default-avatar.png';

const useStore = create((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

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

  currentPage: 1,
  itemsPerPage: 4,
  setCurrentPage: (page) => set({ currentPage: page }),

  tasks: [],
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
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    profileImage: defaultAvatar,
  },
  setProfileData: (updatedData) =>
    set((state) => ({ profileData: { ...state.profileData, ...updatedData } })),

  user: {
    notifications: [],
    setNotifications: (notifications) =>
      set((state) => ({
        user: { ...state.user, notifications },
      })),
    tasks: [],
    addTask: (task) =>
      set((state) => ({
        user: { ...state.user, tasks: [...state.user.tasks, task] },
      })),
    updateTask: (updatedTask) =>
      set((state) => ({
        user: {
          ...state.user,
          tasks: state.user.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        },
      })),
    deleteTask: (taskId) =>
      set((state) => ({
        user: {
          ...state.user,
          tasks: state.user.tasks.filter((task) => task.id !== taskId),
        },
      })),
    summary: {
      totalTasks: 0,
      inProgress: 0,
      completed: 0,
      overdue: 0,
      dueToday: 0,
    },
    setSummary: (summary) =>
      set((state) => ({
        user: { ...state.user, summary },
      })),
    profileData: {
      name: '',
      username: '',
      email: '',
      profileImage: defaultAvatar,
    },
    setProfileData: (updatedData) =>
      set((state) => ({
        user: { ...state.user, profileData: { ...state.user.profileData, ...updatedData } },
      })),
  },

  admin: {
    notifications: [],
    setNotifications: (notifications) =>
      set((state) => ({
        admin: { ...state.admin, notifications },
      })),
    tasks: [],
    addTask: (task) =>
      set((state) => ({
        admin: { ...state.admin, tasks: [...state.admin.tasks, task] },
      })),
    updateTask: (updatedTask) =>
      set((state) => ({
        admin: {
          ...state.admin,
          tasks: state.admin.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        },
      })),
    deleteTask: (taskId) =>
      set((state) => ({
        admin: {
          ...state.admin,
          tasks: state.admin.tasks.filter((task) => task.id !== taskId),
        },
      })),
    summary: {
      totalTasks: 0,
      inProgress: 0,
      completed: 0,
      overdue: 0,
      dueToday: 0,
    },
    setSummary: (summary) =>
      set((state) => ({
        admin: { ...state.admin, summary },
      })),
    profileData: {
      name: '',
      username: '',
      email: '',
      profileImage: defaultAvatar,
    },
    setProfileData: (updatedData) =>
      set((state) => ({
        admin: { ...state.admin, profileData: { ...state.admin.profileData, ...updatedData } },
      })),
  },
}));

export default useStore;