import type { ReactNode } from 'react';

export interface AuthState {
  isAuthenticated: boolean;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
