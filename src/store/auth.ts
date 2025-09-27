import { create } from 'zustand';

export type User = {
  _id: string;
  email: string;
  role: string;
  business_name?: string | null;
  first_name?: string;
  last_name?: string;
  profile_picture?: string | null;
  is_verified: boolean;
  locked_until?: string | null;
  is_in_recovery: boolean;
  is_verified_for_recovery: boolean;
  login_attempts: number;
  is_active: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  onboarded?: boolean;
  phone?: string;
  website?: string;
  address?: string;
};

type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
