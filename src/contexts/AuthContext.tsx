import React, { createContext, useContext, useEffect, useState } from 'react';

interface Profile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  role: 'admin' | 'contributor' | 'user';
  batch?: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock profile data for UI demonstration
  const mockProfile: Profile = {
    id: 'mock-id-1',
    user_id: 'mock-user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software Developer passionate about technology',
    avatar_url: null,
    role: 'user',
    batch: '2024',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const mockUser: User = {
    id: 'mock-user-1',
    email: 'john.doe@example.com',
  };

  useEffect(() => {
    // Simulate loading time for UI demonstration
    const timer = setTimeout(() => {
      setUser(mockUser);
      setProfile(mockProfile);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    // Mock signup - just set the user as logged in
    setUser({ id: 'mock-user-1', email });
    setProfile({ ...mockProfile, email, name });
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Mock signin - just set the user as logged in
    setUser({ id: 'mock-user-1', email });
    setProfile({ ...mockProfile, email });
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (profile) {
      setProfile({ ...profile, ...updates });
    }
    return { error: null };
  };

  const refreshProfile = async () => {
    // No need to refresh in mock mode
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};