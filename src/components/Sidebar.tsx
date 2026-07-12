"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from '../app/page.module.css';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { href: '/', label: 'Dashboard', icon: 'dashboard' },
  { href: '/organization-setup', label: 'Organization', icon: 'corporate_fare' },
  { href: '/assets', label: 'Assets', icon: 'inventory_2' },
  { href: '/allocation', label: 'Allocation & Transfer', icon: 'move_up' },
  { href: '/bookings', label: 'Resource Booking', icon: 'calendar_today' },
  { href: '/maintenance', label: 'Maintenance', icon: 'build' },
  { href: '/audit', label: 'Audit', icon: 'fact_check' },
  { href: '/reports', label: 'Reports', icon: 'analytics' },
  { href: '/notifications', label: 'Notifications', icon: 'notifications' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <span className={`${styles.brandName} headline-sm`}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#54a0ff' }}>grid_view</span>
          AssetFlow
        </span>
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 18, fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span style={{ fontSize: 13 }}>{item.label}</span>
            </Link>
          );
        })}
        <div className={styles.navDivider} />
        <button
          onClick={handleLogout}
          className={styles.navItem}
          style={{ color: 'rgba(255,255,255,0.5)', marginTop: 'auto', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>logout</span>
          <span style={{ fontSize: 13 }}>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
