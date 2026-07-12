"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProfileUser {
  name: string;
  email: string;
  role: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<ProfileUser | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('assetflow-user');
    if (!stored) {
      router.replace('/login');
      return;
    }
    setUser(JSON.parse(stored));
  }, [router]);

  const initials = useMemo(() => {
    if (!user?.name) return 'AF';
    return user.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  }, [user]);

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('assetflow-user');
    }
    router.replace('/login');
  };

  if (!user) {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>Loading profile…</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: 24 }}>
      <div style={{ maxWidth: 760, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)', overflow: 'hidden' }}>
        <div style={{ padding: 32, background: 'linear-gradient(135deg, #2e86de, #6c5ce7)', color: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <div>
              <p style={{ margin: 0, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.18em', opacity: 0.85 }}>Profile</p>
              <h1 style={{ margin: '6px 0 0', fontSize: 28 }}>Welcome back, {user.name}</h1>
            </div>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center', fontSize: 24, fontWeight: 700 }}>{initials}</div>
          </div>
        </div>
        <div style={{ padding: 32, display: 'grid', gap: 16 }}>
          <div style={{ padding: 16, borderRadius: 12, background: '#f8fafc' }}>
            <p style={{ margin: 0, color: '#64748b', fontSize: 13 }}>Email</p>
            <p style={{ margin: '4px 0 0', fontSize: 16, fontWeight: 600 }}>{user.email}</p>
          </div>
          <div style={{ padding: 16, borderRadius: 12, background: '#f8fafc' }}>
            <p style={{ margin: 0, color: '#64748b', fontSize: 13 }}>Access role</p>
            <p style={{ margin: '4px 0 0', fontSize: 16, fontWeight: 600 }}>{user.role}</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/" style={{ textDecoration: 'none', padding: '10px 16px', borderRadius: 999, background: '#2e86de', color: '#fff', fontWeight: 600 }}>Go to dashboard</Link>
            <button onClick={handleSignOut} style={{ border: 'none', padding: '10px 16px', borderRadius: 999, background: '#e17055', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Sign out</button>
          </div>
        </div>
      </div>
    </div>
  );
}
