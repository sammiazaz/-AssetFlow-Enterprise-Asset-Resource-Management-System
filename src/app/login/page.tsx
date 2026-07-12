"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>AF</span>
        </div>
        <h1 className={styles.title}>AssetFlow – login</h1>

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

        <Link href="/" className={styles.loginBtn}>
          Login
        </Link>

        <div className={styles.divider} />

        <div className={styles.newHere}>
          <p className={styles.newHereTitle}>New here?</p>
          <p className={styles.newHereDesc}>
            Sign up creates an employee account<br />
            admin roles assigned later
          </p>
          <button className={styles.createBtn}>Create Account</button>
        </div>
      </div>
    </div>
  );
}
