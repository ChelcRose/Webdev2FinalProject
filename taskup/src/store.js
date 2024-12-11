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
    {
      title: 'Comment Added',
      description: 'Details missing - Admin #2',
      date: 'November 1, 2024',
      unread: false,
      alert: false,
    },
    {
      title: 'Task Reminder',
      description: 'Task #5 is due tomorrow.',
      date: 'November 10, 2024',
      unread: false,
      alert: false,
    },
    {
      title: 'Task Due Today',
      description: 'Task #8 is due today.',
      date: 'November 9, 2024',
      unread: true,
      alert: false,
    },
    {
      title: 'Overdue Task Alert',
      description: 'Task #1 is overdue. Please address it immediately.',
      date: 'November 6, 2024',
      unread: false,
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
  setProfileData: (updatedData) => set((state) => ({ profileData: { ...state.profileData, ...updatedData } })),

}));

export default useStore;
