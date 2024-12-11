import { create } from 'zustand';

const useStore = create((set) => ({

  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),


  notifications: [],
  currentPage: 1,
  itemsPerPage: 4,
  setNotifications: (notifications) => set({ notifications }),
  setCurrentPage: (page) => set({ currentPage: page }),


  tasks: [],
  setTasks: (tasks) => set({ tasks }),


  summary: {
    totalTasks: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
    dueToday: 0,
  },
  setSummary: (summary) => set({ summary }),
}));

export default useStore;
