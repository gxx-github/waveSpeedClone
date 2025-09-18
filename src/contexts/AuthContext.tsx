import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGitHub: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // 虚拟测试账户验证
      const testAccounts = {
        'admin': { password: 'admin123', role: 'admin' },
        'user': { password: 'user123', role: 'user' },
        'test': { password: 'test123', role: 'user' }
      };

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      const account = testAccounts[username as keyof typeof testAccounts];
      
      if (!account || account.password !== password) {
        throw new Error('Invalid username or password');
      }

      const mockUser: User = {
        id: username === 'admin' ? '1' : '2',
        email: `${username}@example.com`,
        name: username === 'admin' ? '管理员' : '普通用户',
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', `mock_token_${username}_${Date.now()}`);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      // 重定向到谷歌OAuth授权页面，并显式告知后端回跳到前端的回调路由
      // 开发环境使用相对路径（通过Vite代理），生产使用完整后端地址
      const apiBase = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE_URL || 'http://47.242.127.155:8000');
      const redirectUri = `${window.location.origin}/auth/callback`;
      const authUrl = `${apiBase}/auth/google?redirect_uri=${encodeURIComponent(redirectUri)}`;
      window.location.href = authUrl;
    } catch (error) {
      throw new Error('Google login failed');
    }
  };

  const loginWithGitHub = async () => {
    try {
      // 重定向到GitHub OAuth授权页面
      window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://47.242.127.155:8000'}/auth/github`;
    } catch (error) {
      throw new Error('GitHub login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    loginWithGoogle,
    loginWithGitHub,
    setUser,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
