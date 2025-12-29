'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development - simulates authenticated state
const MOCK_USER: User = {
  id: 'user_mock_123',
  email: 'demo@realestateai.com',
  name: 'Demo User',
  avatar: undefined,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('realestateai_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Mock sign in - in production, this would call Clerk/Supabase Auth
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    const mockUser: User = {
      id: `user_${Date.now()}`,
      email,
      name: email.split('@')[0],
    };

    localStorage.setItem('realestateai_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
  };

  const signUp = async (email: string, password: string, name: string) => {
    // Mock sign up
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser: User = {
      id: `user_${Date.now()}`,
      email,
      name,
    };

    localStorage.setItem('realestateai_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
  };

  const signOut = () => {
    localStorage.removeItem('realestateai_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper hook to require authentication
export function useRequireAuth() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = '/sign-in';
    }
  }, [user, isLoading]);

  return { user, isLoading };
}
