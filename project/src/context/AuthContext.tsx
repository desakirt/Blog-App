import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (token: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Simulate API call - In production, this would be a real API endpoint
    if (email === 'demo@example.com' && password === 'password') {
      const user = { id: '1', username: 'Demo User', email };
      setUser(user);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    // Simulate API call - In production, this would be a real API endpoint
    const user = { id: Date.now().toString(), username, email };
    setUser(user);
  };

  const resetPassword = async (email: string) => {
    // In production, this would send a real email via SendGrid or similar service
    console.log(`Password reset email sent to ${email}`);
  };

  const updatePassword = async (token: string, newPassword: string) => {
    // In production, this would verify the token and update the password in the database
    console.log(`Password updated with token ${token}`);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register, 
      resetPassword, 
      updatePassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};