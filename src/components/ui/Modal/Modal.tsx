"use client";

import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}

export default function Modal({ isOpen, onClose, title, children, footer, width = '560px' }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        zIndex: 1000,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Dialog'}
        onClick={(event) => event.stopPropagation()}
        style={{
          width,
          maxWidth: '100%',
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 16px 48px rgba(15, 23, 42, 0.24)',
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
        }}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1e2a3a' }}>{title || 'Dialog'}</h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              style={{
                border: 'none',
                background: 'transparent',
                color: '#64748b',
                cursor: 'pointer',
                fontSize: 20,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>

        <div style={{ padding: 24 }}>{children}</div>

        {footer && (
          <div style={{ padding: '0 24px 24px', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

