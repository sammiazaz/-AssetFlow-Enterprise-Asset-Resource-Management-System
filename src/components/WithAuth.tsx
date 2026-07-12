"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface WithAuthProps {
  children: React.ReactNode;
}

/**
 * Guards a page — redirects to /login if the user is not authenticated.
 * Shows a loading spinner while auth state is being restored.
 */
export default function WithAuth({ children }: WithAuthProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f2f5',
        gap: 12,
        color: '#2e86de',
        fontSize: 14,
        fontWeight: 500,
      }}>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 24, animation: 'spin 1s linear infinite' }}
        >
          progress_activity
        </span>
        Loading AssetFlow…
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) {
    // Will redirect, show nothing in the meantime
    return null;
  }

  return <>{children}</>;
}
