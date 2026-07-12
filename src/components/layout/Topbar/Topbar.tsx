"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/app/dashboard/dashboard.module.css';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';

interface TopbarProps {
  title?: string;
}

export default function Topbar({ title }: TopbarProps) {
  const { showToast } = useToast();
  const [hasUnread, setHasUnread] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setHasUnread(data.some(n => !n.read));
        }
      });
  }, []);

  return (
    <header className={styles.topbar}>
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search assets by tag, serial, name..."
          />
          <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
        </div>
      </div>
      <div className={styles.topbarActions}>
        <Link href="/bookings" className={styles.helpBtn} title="Book Resource" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-outlined">calendar_today</span>
        </Link>
        <Link href="/notifications" className={styles.helpBtn} title="Notifications" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <span className="material-symbols-outlined">notifications</span>
          {hasUnread && (
            <span style={{
              position: 'absolute', top: 6, right: 6, width: 8, height: 8,
              backgroundColor: '#e17055', borderRadius: '50%', border: '2px solid #fff'
            }} />
          )}
        </Link>
        <button className={styles.helpBtn} title="Settings" onClick={() => setIsSettingsOpen(true)}>
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className={styles.dividerVertical} />
        <Link href="/profile" className={styles.userProfile} style={{ textDecoration: 'none' }}>
          <div className={styles.userAvatar}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1TUCT6ofiNoGnpP2VdVWgI3ltZnxuWK7zHQFoUJcDXoDItExzQDJebm1BNB2DbHkw4_pM9fk9AO_VzntpjV56193Y0WkMar4K9qeoY4PF_gTIr9FHMlSNFjEbhS9zjURTyU6t9xNZqP00Twern6VKocWScmBRMWOVRQme0OWCriOqt5gl-bZmSMeD_FvoQMn9HyscL5GbvVK0Mou9CtxoAGqr267td_jd6EGn1on-_zlX6oW7MXUk"
              alt="Profile"
            />
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>Admin User</p>
            <p className={styles.userRole}>System Administrator</p>
          </div>
        </Link>
      </div>

      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Settings"
        width="420px"
        footer={
          <button className={styles.btnPrimary} onClick={() => { showToast('Preferences are ready for the next release.'); setIsSettingsOpen(false); }}>
            Close
          </button>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ margin: 0, color: 'var(--color-on-surface-variant)' }}>Notification preferences, theme controls, and account settings will appear here in future updates.</p>
          <div style={{ padding: 12, borderRadius: 10, background: '#f8fafc', color: '#334155' }}>
            Current access level: System Administrator
          </div>
        </div>
      </Modal>
    </header>
  );
}
