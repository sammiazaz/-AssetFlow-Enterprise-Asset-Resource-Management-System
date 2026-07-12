"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { useToast } from '@/context/ToastContext';
import Modal from '@/components/ui/Modal';

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Unable to sign in.');
      }

      showToast('Login successful. Welcome back!');
      router.push('/');
    } catch (error: any) {
      showToast(error.message || 'Login failed.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Unable to create account.');
      }

      showToast('Account created successfully. You can sign in now.');
      setRegisterData({ name: '', email: '', password: '' });
      setIsRegisterOpen(false);
    } catch (error: any) {
      showToast(error.message || 'Account creation failed.', 'error');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>AF</span>
        </div>
        <h1 className={styles.title}>AssetFlow – login</h1>

        <form onSubmit={handleLogin}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label className={styles.label}>Password</label>
              <button
                type="button"
                className={styles.forgotLink}
                onClick={() => showToast('Password reset is handled by your administrator.', 'info')}
              >
                Forgot password
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                className={styles.input}
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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

          <button type="submit" className={styles.loginBtn} disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <div className={styles.divider} />

        <div className={styles.newHere}>
          <p className={styles.newHereTitle}>New here?</p>
          <p className={styles.newHereDesc}>
            Sign up creates an employee account<br />
            admin roles assigned later
          </p>
          <button type="button" className={styles.createBtn} onClick={() => setIsRegisterOpen(true)}>
            Create Account
          </button>
        </div>
      </div>

      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title="Create Account"
        width="420px"
        footer={
          <>
            <button type="button" className={styles.createBtn} onClick={() => setIsRegisterOpen(false)}>
              Cancel
            </button>
            <button type="submit" form="register-form" className={styles.loginBtn}>
              Create
            </button>
          </>
        }
      >
        <form id="register-form" onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className={styles.label}>Full Name</span>
            <input
              className={styles.input}
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              placeholder="Your full name"
              required
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className={styles.label}>Email</span>
            <input
              type="email"
              className={styles.input}
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              placeholder="name@company.com"
              required
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className={styles.label}>Password</span>
            <input
              type="password"
              className={styles.input}
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              placeholder="Create a password"
              required
            />
          </label>
        </form>
      </Modal>
    </div>
  );
}
