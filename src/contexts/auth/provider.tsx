import React, { useState } from 'react';
import { AuthContext } from './context';
import type { AuthProviderProps } from './types';
import type { AuthContextType } from './types';

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email: string, password: string) => {
    // In a real app, you would make an API call here
    // For now, we'll just simulate a login
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const register = async (email: string, password: string, name: string) => {
    // In a real app, you would make an API call to register the user
    // For now, we'll just simulate registration
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would store user data somewhere
      console.log('User registered:', { email, name });
      
      // After registration, automatically log in the user
      login(email, password);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
