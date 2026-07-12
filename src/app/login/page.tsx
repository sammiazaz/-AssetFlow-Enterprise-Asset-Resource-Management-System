"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { useAuth } from '@/context/AuthContext';

type AuthMode = 'login' | 'signup';

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading, login, register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/');
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);

    try {
      let result;
      if (mode === 'login') {
        result = await login(email.trim().toLowerCase(), password);
      } else {
        result = await register(name.trim(), email.trim().toLowerCase(), password);
      }

      if (result.success) {
        router.push('/');
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Show spinner while checking auth state
  if (isLoading) {
    return (
      <div className={styles.page}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#2e86de' }}>
          <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>progress_activity</span>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Loading…</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>AF</span>
        </div>
        <h1 className={styles.title}>AssetFlow – {mode === 'login' ? 'Sign In' : 'Create Account'}</h1>

        <form onSubmit={handleSubmit} noValidate>
          {mode === 'signup' && (
            <div className={styles.field}>
              <label className={styles.label}>Full Name</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Alex Morgan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={submitting}
                autoFocus
              />
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              autoFocus={mode === 'login'}
            />
          </div>

          <div className={styles.field}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label className={styles.label}>Password</label>
              {mode === 'login' && (
                <a href="#" className={styles.forgotLink} onClick={(e) => e.preventDefault()}>Forgot password?</a>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                className={styles.input}
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPass(!showPass)}
                tabIndex={-1}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  {showPass ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.errorMsg}>
              <span className="material-symbols-outlined" style={{ fontSize: 15 }}>error</span>
              {error}
            </div>
          )}

          <button type="submit" className={styles.loginBtn} disabled={submitting}>
            {submitting ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, animation: 'spin 1s linear infinite' }}>progress_activity</span>
                {mode === 'login' ? 'Signing in…' : 'Creating account…'}
              </span>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        {mode === 'login' && (
          <div className={styles.hintBox}>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#2e86de' }}>info</span>
            <span>Demo: <strong>admin@assetflow.com</strong> / <strong>password123</strong></span>
          </div>
        )}

        <div className={styles.divider} />

        <div className={styles.newHere}>
          <p className={styles.newHereTitle}>{mode === 'login' ? 'New here?' : 'Already have an account?'}</p>
          <p className={styles.newHereDesc}>
            {mode === 'login'
              ? 'Create a free employee account — admin roles are assigned by your organization administrator.'
              : 'Use your existing credentials to sign in to AssetFlow.'}
          </p>
          <button
            type="button"
            className={styles.createBtn}
            disabled={submitting}
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
            }}
          >
            {mode === 'login' ? 'Create Account' : 'Back to Sign In'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
