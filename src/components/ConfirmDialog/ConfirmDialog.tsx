import React from 'react';
import Text from '../Text';
import Button from '../Button';
import './ConfirmDialog.css';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-header">
          <Text variant="h2" size="xl" weight="bold" color="primary">
            {title}
          </Text>
          <button className="confirm-close" onClick={onCancel} aria-label="Close dialog">
            ✕
          </button>
        </div>

        <div className="confirm-body">
          <Text variant="p" size="md" color="secondary">
            {message}
          </Text>
        </div>

        <div className="confirm-actions">
          <Button
            variant="outline"
            size="md"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          <Button
            variant={isDangerous ? 'error' : 'primary'}
            size="md"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
