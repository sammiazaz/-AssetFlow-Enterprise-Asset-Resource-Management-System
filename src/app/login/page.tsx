"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login, redirect to Dashboard
    router.push('/');
  };

  return (
    <div className={styles.container}>
      {/* Auth Card */}
      <div className={styles.authCard}>
        {/* Animated Background Accent (Subtle) */}
        <div className={styles.bgAccentTop}></div>
        <div className={styles.bgAccentBottom}></div>
        
        {/* Header */}
        <div className={styles.header}>
          {/* Logo Badge */}
          <div className={`${styles.logoBadge} headline-md`}>
            AF
          </div>
          <div>
            <h1 className={`${styles.title} headline-md`}>AssetFlow — Login</h1>
            <p className={`${styles.subtitle} body-md`}>Enter your credentials to access your workspace</p>
          </div>
        </div>
        
        {/* Form Fields */}
        <form className={styles.form} onSubmit={handleSignIn}>
          <div className={styles.field}>
            <label htmlFor="email" className="label-md">Email Address</label>
            <div className={styles.inputWrapper}>
              <span className={`material-symbols-outlined ${styles.icon}`}>mail</span>
              <input 
                type="email" 
                id="email" 
                className={`${styles.input} body-md`} 
                placeholder="name@company.com" 
                required 
              />
            </div>
          </div>
          
          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className="label-md">Password</label>
              <a href="#" className="label-md">Forgot password?</a>
            </div>
            <div className={styles.inputWrapper}>
              <span className={`material-symbols-outlined ${styles.icon}`}>lock</span>
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                className={`${styles.input} body-md`} 
                placeholder="••••••••" 
                required 
              />
              <button 
                type="button" 
                className={styles.visibilityToggle}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <span className="material-symbols-outlined">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>
          
          <button type="submit" className={`${styles.submitBtn} headline-sm`}>
            Sign In
          </button>
        </form>
        
        {/* Divider */}
        <div className={styles.divider}>
          <div className={styles.line}></div>
          <span className="label-md">OR</span>
          <div className={styles.line}></div>
        </div>
        
        {/* New Here Section */}
        <div className={styles.newHere}>
          <div className={styles.infoBox}>
            <p className="label-md">
              New here? Sign up creates an Employee account — admin roles assigned later
            </p>
          </div>
          <button type="button" className={`${styles.createBtn} headline-sm`}>
            Create Account
          </button>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className={styles.bgDecoration}>
        <div className={styles.decTop}></div>
        <div className={styles.decBottom}></div>
      </div>
    </div>
  );
}
