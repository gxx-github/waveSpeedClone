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
  setAccessToken: (token: string | null) => void;
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
  const [accessToken, setAccessTokenState] = useState<string | null>(null);

  useEffect(() => {
    // 从本地读取会话
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setAccessTokenState(storedToken);
    }
    setIsLoading(false);
  }, []);

  const setAccessToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    setAccessTokenState(token);
  };

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // 改为真实后端鉴权
      const { access_token, token_type } = await (await import('../api/client')).api.loginWithToken(username, password);
      if (!access_token) throw new Error('No access token');
      setAccessToken(access_token);

      // 若后端未返回用户信息，使用最小占位信息（可后续通过“/me”接口补全）
      const minimalUser: User = {
        id: username,
        email: username,
        name: username,
      };
      setUser(minimalUser);
      localStorage.setItem('user', JSON.stringify(minimalUser));
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
    setAccessToken(null);
  };

  const value = {
    user,
    login,
    loginWithGoogle,
    loginWithGitHub,
    setUser,
    setAccessToken,
    logout,
    isLoading,
    isAuthenticated: !!accessToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
