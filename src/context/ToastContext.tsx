import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ToastMessage } from '../components/Toast/Toast';

interface ToastContextType {
  messages: ToastMessage[];
  showToast: (message: string, type: 'error' | 'success' | 'info' | 'warning', duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (message: string, type: 'error' | 'success' | 'info' | 'warning' = 'info', duration?: number) => {
      const id = `${Date.now()}-${Math.random()}`;
      const newMessage: ToastMessage = {
        id,
        message,
        type,
        duration,
      };
      setMessages((prev) => [...prev, newMessage]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ messages, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
