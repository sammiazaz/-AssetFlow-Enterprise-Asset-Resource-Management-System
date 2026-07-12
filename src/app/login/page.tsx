"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

type AuthMode = 'login' | 'signup';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = window.localStorage.getItem('assetflow-user');
      if (storedUser) {
        router.replace('/');
      }
    }
  }, [router]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage('Please enter your email and password.');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const displayName = name.trim() || normalizedEmail.split('@')[0];
    const user = {
      name: displayName,
      email: normalizedEmail,
      role: mode === 'signup' ? 'Admin' : 'Employee',
    };

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('assetflow-user', JSON.stringify(user));
    }

    setMessage(mode === 'signup' ? 'Account created. Redirecting to the dashboard...' : 'Signed in successfully. Redirecting to the dashboard...');
    router.push('/');
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>AF</span>
        </div>
        <h1 className={styles.title}>AssetFlow – {mode === 'login' ? 'login' : 'sign up'}</h1>

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className={styles.field}>
              <label className={styles.label}>Full Name</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Alex Morgan"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            />
          </div>

          <div className={styles.field}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label className={styles.label}>Password</label>
              <a href="#" className={styles.forgotLink}>Forgot password</a>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                className={styles.input}
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPass(!showPass)}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  {showPass ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <button type="submit" className={styles.loginBtn}>
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: 12, fontSize: 13, color: '#2e86de', textAlign: 'center' }}>{message}</p>
        )}

        <div className={styles.divider} />

        <div className={styles.newHere}>
          <p className={styles.newHereTitle}>{mode === 'login' ? 'New here?' : 'Already have an account?'}</p>
          <p className={styles.newHereDesc}>
            {mode === 'login'
              ? 'Sign up creates an employee account\nadmin roles assigned later'
              : 'Use your existing account to jump back into AssetFlow'}
          </p>
          <button
            type="button"
            className={styles.createBtn}
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setMessage('');
            }}
          >
            {mode === 'login' ? 'Create Account' : 'Back to Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
