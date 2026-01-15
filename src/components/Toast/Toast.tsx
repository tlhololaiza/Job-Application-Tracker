import React, { useEffect, useState } from 'react';
import './Toast.css';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'error' | 'success' | 'info' | 'warning';
  duration?: number;
}

interface ToastProps {
  messages: ToastMessage[];
  onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ messages, onRemove }) => {
  return (
    <div className="toast-container">
      {messages.map((msg) => (
        <ToastItem
          key={msg.id}
          message={msg}
          onRemove={() => onRemove(msg.id)}
          duration={msg.duration}
        />
      ))}
    </div>
  );
};

interface ToastItemProps {
  message: ToastMessage;
  onRemove: () => void;
  duration?: number;
}

const ToastItem: React.FC<ToastItemProps> = ({
  message,
  onRemove,
  duration = 4000,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onRemove, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onRemove]);

  return (
    <div
      className={`toast toast-${message.type} ${isExiting ? 'toast-exit' : ''}`}
      role="alert"
    >
      <div className="toast-content">
        <span className="toast-icon">{getIcon(message.type)}</span>
        <span className="toast-message">{message.message}</span>
      </div>
      <button
        className="toast-close"
        onClick={() => {
          setIsExiting(true);
          setTimeout(onRemove, 300);
        }}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

function getIcon(type: string): string {
  switch (type) {
    case 'error':
      return '⚠';
    case 'success':
      return '✓';
    case 'warning':
      return '!';
    case 'info':
    default:
      return 'ℹ';
  }
}

export default Toast;
