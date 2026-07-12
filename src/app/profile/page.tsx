"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import layoutStyles from '@/app/dashboard/dashboard.module.css';
import { useToast } from '@/context/ToastContext';

interface ProfileUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  department?: { name?: string } | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data.error || 'Please sign in to view your profile.');
        }

        setUser(data.user);
      } catch (error: any) {
        showToast(error.message || 'Unable to load profile.', 'error');
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router, showToast]);

  const handleLogout = () => {
    document.cookie = 'token=; path=/; max-age=0';
    showToast('Signed out successfully.');
    router.replace('/login');
  };

  return (
    <div className={layoutStyles.layout}>
      <Sidebar />
      <Topbar />
      <main className={layoutStyles.mainContent}>
        <div className={layoutStyles.pageHeader}>
          <div>
            <h1 className={layoutStyles.pageTitle}>My Profile</h1>
            <p className={layoutStyles.pageSubtitle}>Manage your account details and activity access.</p>
          </div>
          <div className={layoutStyles.headerActions}>
            <button className={layoutStyles.btnSecondary} onClick={handleLogout}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>logout</span>
              Sign Out
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: 24, background: '#fff', borderRadius: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
            Loading your profile...
          </div>
        ) : user ? (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #2e86de, #54a0ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, fontWeight: 700 }}>
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: 22, color: '#1e2a3a' }}>{user.name}</h2>
                  <p style={{ margin: '4px 0 0', color: '#64748b' }}>{user.email}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                <div style={{ background: '#f8fafc', borderRadius: 12, padding: 14 }}>
                  <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: '#64748b' }}>Role</p>
                  <p style={{ margin: '6px 0 0', fontSize: 15, fontWeight: 600, color: '#1e2a3a' }}>{user.role}</p>
                </div>
                <div style={{ background: '#f8fafc', borderRadius: 12, padding: 14 }}>
                  <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: '#64748b' }}>Status</p>
                  <p style={{ margin: '6px 0 0', fontSize: 15, fontWeight: 600, color: '#1e2a3a' }}>{user.status}</p>
                </div>
                <div style={{ background: '#f8fafc', borderRadius: 12, padding: 14 }}>
                  <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: '#64748b' }}>Department</p>
                  <p style={{ margin: '6px 0 0', fontSize: 15, fontWeight: 600, color: '#1e2a3a' }}>{user.department?.name || 'Unassigned'}</p>
                </div>
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginTop: 0, marginBottom: 12, color: '#1e2a3a' }}>Quick access</h3>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/assets" className={layoutStyles.btnPrimary} style={{ textDecoration: 'none' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>inventory_2</span>
                  View Assets
                </Link>
                <Link href="/notifications" className={layoutStyles.btnSecondary} style={{ textDecoration: 'none' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>notifications</span>
                  Notifications
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
