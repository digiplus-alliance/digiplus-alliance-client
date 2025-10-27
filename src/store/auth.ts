import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type User = {
  _id: string;
  email: string;
  role: string;
  business_name?: string | null;
  first_name?: string;
  last_name?: string;
  profile_picture?: string | null;
  logo_url?: string | null;
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
  last_login?: string;
  // Legacy fields (keeping for backward compatibility)
  phone_number?: string;
  website?: string;
  address?: string;
  // New business profile fields
  industry?: string;
  company_website?: string;
  company_address?: string;
  city?: string;
  state?: string;
  country?: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  clearUser: () => void;
  clearAuth: () => void;
  openNotification: boolean;
  setOpenNotification: (open: boolean) => void;
  suggestedServices: string[];
  setSuggestedServices: (services: string[]) => void;
  selectedService: string | null;
  setSelectedService: (service: string | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token }),
      clearUser: () => set({ user: null }),
      clearAuth: () => {
        set({ user: null, accessToken: null });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
        }
      },
      openNotification: false,
      setOpenNotification: (open) => set({ openNotification: open }),
      suggestedServices: [],
      setSuggestedServices: (services) => set({ suggestedServices: services }),
      selectedService: null,
      setSelectedService: (service) => set({ selectedService: service }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);
