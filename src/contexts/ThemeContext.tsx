import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    accent: string;
    gradient: string;
    cardBackground: string;
    buttonPrimary: string;
    buttonSecondary: string;
  };
  mode: 'light' | 'dark';
}

const lightTheme: Theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6366f1',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    accent: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardBackground: '#ffffff',
    buttonPrimary: '#3b82f6',
    buttonSecondary: '#6b7280',
  },
  mode: 'light',
};

const darkTheme: Theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6366f1',
    background: '#0f0e1a',
    surface: '#1a1b2e',
    text: '#ffffff',
    textSecondary: '#94a3b8',
    border: '#334155',
    accent: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardBackground: '#1a1b2e',
    buttonPrimary: '#3b82f6',
    buttonSecondary: '#6b7280',
  },
  mode: 'dark',
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
