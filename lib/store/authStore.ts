import { create } from 'zustand';
import type { User } from '@/types/user';
import { persist } from 'zustand/middleware';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  setIsAuthenticated: (status: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(persist((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
  setIsAuthenticated: (status) => set({ isAuthenticated: status }),
}),
{
      name: 'auth-storage',
    }));
