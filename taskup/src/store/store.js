import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  tasks: [],
  notifications: [],

  setUser: (user) => set(() => ({ user })),
  setTasks: (tasks) => set(() => ({ tasks })),
  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
}));

export default useStore;
