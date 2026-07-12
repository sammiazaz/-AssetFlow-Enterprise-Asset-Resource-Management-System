"use client";

import Link from 'next/link';
import styles from '../app/page.module.css';
import { useAuth } from '@/context/AuthContext';

interface TopbarProps {
  title?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Topbar({ title }: TopbarProps) {
  const { user } = useAuth();

  const displayName = user?.name || 'User';
  const displayRole = user?.role || 'Employee';
  const initials = getInitials(displayName);

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
          <span style={{
            position: 'absolute', top: 6, right: 6, width: 8, height: 8,
            backgroundColor: '#e17055', borderRadius: '50%', border: '2px solid #fff'
          }} />
        </Link>
        <button className={styles.helpBtn} title="Settings">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className={styles.dividerVertical} />
        <div className={styles.userProfile}>
          <div className={styles.userAvatar} style={{
            background: 'linear-gradient(135deg, #2e86de, #6c5ce7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: 13,
            userSelect: 'none',
          }}>
            {initials}
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{displayName}</p>
            <p className={styles.userRole}>{displayRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
