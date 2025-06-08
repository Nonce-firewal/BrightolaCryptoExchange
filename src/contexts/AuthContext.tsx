import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  kycStatus: 'pending' | 'approved' | 'rejected' | 'not-submitted';
  referralCode: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, referralCode?: string) => Promise<boolean>;
  logout: () => void;
  adminLogin: (email: string, password: string, mfaCode: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
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

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('brightola_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - in real implementation, this would come from your backend
    const mockUser: User = {
      id: 'user_' + Date.now(),
      email,
      name: 'John Doe',
      kycStatus: 'not-submitted',
      referralCode: 'REF' + Math.random().toString(36).substr(2, 8).toUpperCase()
    };
    
    setUser(mockUser);
    localStorage.setItem('brightola_user', JSON.stringify(mockUser));
    return true;
  };

  const register = async (email: string, password: string, name: string, referralCode?: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: 'user_' + Date.now(),
      email,
      name,
      kycStatus: 'not-submitted',
      referralCode: 'REF' + Math.random().toString(36).substr(2, 8).toUpperCase()
    };
    
    setUser(mockUser);
    localStorage.setItem('brightola_user', JSON.stringify(mockUser));
    return true;
  };

  const adminLogin = async (email: string, password: string, mfaCode: string): Promise<boolean> => {
    // Simulate API call with MFA verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (mfaCode !== '123456') { // Mock MFA code
      return false;
    }
    
    const adminUser: User = {
      id: 'admin_' + Date.now(),
      email,
      name: 'Admin User',
      kycStatus: 'approved',
      referralCode: '',
      isAdmin: true
    };
    
    setUser(adminUser);
    localStorage.setItem('brightola_user', JSON.stringify(adminUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('brightola_user');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    adminLogin,
    isAuthenticated: !!user,
    isAdmin: !!user?.isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};