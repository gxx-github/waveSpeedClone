import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

interface ToastContextType {
  showToast: (message: string, options?: { type?: ToastType; duration?: number }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

const slideIn = keyframes`
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const ToastContainer = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 2000;
`;

const ToastBox = styled.div<{ $type: ToastType }>`
  min-width: 220px;
  max-width: 380px;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: white;
  font-size: 0.95rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  animation: ${slideIn} 0.18s ease-out;
  background: ${({ $type }) => {
    switch ($type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      default: return '#3b82f6';
    }
  }};
`;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const showToast = useCallback((message: string, options?: { type?: ToastType; duration?: number }) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const type = options?.type ?? 'success';
    const duration = Math.max(1200, Math.min(options?.duration ?? 1800, 8000));
    setToasts(prev => [...prev, { id, message, type, duration }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer>
        {toasts.map(t => (
          <ToastBox key={t.id} $type={t.type}>{t.message}</ToastBox>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};


