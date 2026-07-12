import { create } from 'zustand';
import { apiFetch, fetchOptions } from '../api';

export type UserRole = 'fleet_manager' | 'driver' | 'safety_officer' | 'financial_analyst';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('transitops_user') || 'null'),
  isAuthenticated: !!localStorage.getItem('transitops_user'),
  
  login: async (email, password) => {
    try {
      const data = await apiFetch('/auth.php?action=login', fetchOptions('POST', { email, password }));
      if (data.user) {
        localStorage.setItem('transitops_user', JSON.stringify(data.user));
        set({ user: data.user, isAuthenticated: true });
        return true;
      }
      return false;
    } catch (e) {
      console.error('Login error:', e);
      return false;
    }
  },
  
  logout: async () => {
    try {
      await apiFetch('/auth.php?action=logout', fetchOptions('POST'));
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      localStorage.removeItem('transitops_user');
      set({ user: null, isAuthenticated: false });
    }
  },
  
  checkAuth: async () => {
    try {
      const data = await apiFetch('/auth.php?action=me');
      if (data.user) {
        localStorage.setItem('transitops_user', JSON.stringify(data.user));
        set({ user: data.user, isAuthenticated: true });
      } else {
        localStorage.removeItem('transitops_user');
        set({ user: null, isAuthenticated: false });
      }
    } catch (e) {
      localStorage.removeItem('transitops_user');
      set({ user: null, isAuthenticated: false });
    }
  }
}));
