"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import styles from './dashboard.module.css';


const categoryColors = ['#2e86de', '#00b894', '#6c5ce7', '#e17055', '#fdcb6e'];

export default function Dashboard() {
  const [assets, setAssets] = React.useState<any[]>([]);
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [maintenanceRequests, setMaintenanceRequests] = React.useState<any[]>([]);
  
  const [activityLogs, setActivityLogs] = React.useState<any[]>([]);

  const [dashboardStats, setDashboardStats] = React.useState<any>(null);
  const [reportsData, setReportsData] = React.useState<any>({ assetsByCategory: [] });

  React.useEffect(() => {
    Promise.all([
      fetch('/api/assets').then(res => res.json()),
      fetch('/api/bookings').then(res => res.json()),
      fetch('/api/maintenance').then(res => res.json()),
      fetch('/api/dashboard').then(res => res.json()),
      fetch('/api/reports').then(res => res.json()),
      fetch('/api/notifications').then(res => res.json())
    ]).then(([a, b, m, dStats, rData, notifs]) => {
      if (Array.isArray(a)) setAssets(a);
      if (Array.isArray(b)) setBookings(b);
      if (Array.isArray(m)) setMaintenanceRequests(m);
      if (dStats && !dStats.error) setDashboardStats(dStats);
      if (rData && !rData.error) setReportsData(rData);
      if (Array.isArray(notifs)) setActivityLogs(notifs);
    });
  }, []);

  const kpiData = useMemo(() => {
    if (!dashboardStats) return [];
    return [
      { label: 'Total Assets', value: dashboardStats.totalAssets.toString(), icon: 'inventory_2', color: '#6c5ce7', bg: '#ede9ff', href: '/assets' },
      { label: 'Available', value: dashboardStats.availableAssets.toString(), icon: 'check_circle', color: '#2e86de', bg: '#ddeeff', href: '/assets' },
      { label: 'Allocated', value: dashboardStats.allocatedAssets.toString(), icon: 'person', color: '#00b894', bg: '#d4f5ee', href: '/allocation' },
      { label: 'Under Maintenance', value: dashboardStats.underMaintenanceAssets.toString(), icon: 'build', color: '#e67e22', bg: '#fff3e0', href: '/maintenance' },
      { label: 'Active Bookings', value: dashboardStats.activeBookings.toString(), icon: 'calendar_today', color: '#e17055', bg: '#fff0ec', href: '/bookings' },
      { label: 'Departments', value: dashboardStats.departmentCount.toString(), icon: 'business', color: '#0984e3', bg: '#eef5ff', href: '/organization-setup' },
      { label: 'Employees', value: dashboardStats.employeeCount.toString(), icon: 'groups', color: '#fdcb6e', bg: '#fffceb', href: '/organization-setup' },
    ];
  }, [dashboardStats]);

  const overdueAssets = useMemo(() => {
    return assets.filter(a => a.expectedReturnDate && new Date(a.expectedReturnDate) < new Date()).length;
  }, [assets]);

  const { assetsByCategory } = reportsData;
  return (
    <div className={styles.layout}>
      <Sidebar />
      <Topbar />

      <main className={styles.mainContent}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Today&apos;s Overview</h1>
            <p className={styles.pageSubtitle}>Real-time status of your physical and digital resources</p>
          </div>
          <div className={styles.headerActions}>
            <Link href="/assets" className={styles.btnPrimary} style={{ textDecoration: 'none' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
              Register Asset
            </Link>
            <Link href="/bookings" className={styles.btnSecondary} style={{ textDecoration: 'none' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_today</span>
              Book Resource
            </Link>
            <Link href="/allocation" className={styles.btnSecondary} style={{ textDecoration: 'none' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
              Raise Requests
            </Link>
          </div>
        </div>

        {/* Alert Banner */}
        {overdueAssets > 0 && (
          <div className={styles.alertBanner}>
            <span className={`material-symbols-outlined ${styles.alertIcon}`}>warning</span>
            <span style={{ fontWeight: 600, fontSize: 13 }}>
              {overdueAssets} assets overdue for return — flagged for follow-up
            </span>
            <Link href="/assets" className={styles.alertAction} style={{ textDecoration: 'none' }}>
              TAKE ACTION
            </Link>
          </div>
        )}

        {/* KPI Grid — 6 cards matching Screen 2 */}
        <div className={styles.kpiGrid}>
          {kpiData.map((kpi) => (
            <Link key={kpi.label} href={kpi.href} className={styles.kpiCard} style={{ textDecoration: 'none' }}>
              <div className={styles.kpiCardHeader}>
                <span className={styles.kpiLabel}>{kpi.label}</span>
                <div className={styles.kpiIconBox} style={{ backgroundColor: kpi.bg }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: kpi.color, fontVariationSettings: "'FILL' 1" }}>
                    {kpi.icon}
                  </span>
                </div>
              </div>
              <div className={styles.kpiValue} style={{ color: kpi.color }}>{kpi.value}</div>
            </Link>
          ))}
        </div>

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          {/* Recent Activity */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Recent Activity</h2>
              <Link href="/notifications" className={styles.btnSecondary} style={{ padding: '4px 10px', fontSize: 12, textDecoration: 'none' }}>
                View All
              </Link>
            </div>
            <div className={styles.cardBody} style={{ padding: 0 }}>
              {activityLogs.slice(0, 4).map((item, idx) => (
                <div key={idx} className={styles.activityItem} style={{ padding: '12px 20px' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    backgroundColor: item.type === 'Allocation' ? '#2e86de1a' : item.type === 'Booking' ? '#00b8941a' : '#6c5ce71a'
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: item.type === 'Allocation' ? '#2e86de' : item.type === 'Booking' ? '#00b894' : '#6c5ce7', fontVariationSettings: "'FILL' 1" }}>
                      {item.type === 'Allocation' ? 'person' : item.type === 'Booking' ? 'calendar_today' : 'build'}
                    </span>
                  </div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>{item.text}</p>
                    <p className={styles.activityTime} suppressHydrationWarning>{new Date(item.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Asset Distribution */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Assets by Category</h2>
              </div>
              <div className={styles.cardBody}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {(assetsByCategory || []).map((item: any, idx: number) => (
                    <div key={item.category}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <span style={{ fontSize: 13, color: 'var(--color-on-surface)', fontWeight: 500 }}>
                          {item.category}
                        </span>
                        <span style={{ fontSize: 12, color: 'var(--color-on-surface-variant)' }}>
                          {item.count} ({item.pct}%)
                        </span>
                      </div>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${item.pct}%`, backgroundColor: categoryColors[idx % categoryColors.length] }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Asset Health Placeholder */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Asset Health</h2>
              </div>
              <div className={styles.cardBody}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 24, border: '4px solid #00b894', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-on-surface)' }}>92%</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-on-surface)' }}>Healthy Assets</p>
                    <p style={{ fontSize: 12, color: 'var(--color-on-surface-variant)' }}>Based on recent audits</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: '#00b894', fontWeight: 600 }}>Good: {assets.filter(a => a.condition === 'Good' || a.condition === 'Excellent').length}</span>
                  <span style={{ color: '#e17055', fontWeight: 600 }}>Needs Repair: {assets.filter(a => a.condition === 'Needs Repair').length}</span>
                  <span style={{ color: '#d63031', fontWeight: 600 }}>Lost/Broken: 0</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Quick Actions</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, backgroundColor: 'var(--color-outline-variant)' }}>
                {[
                  { icon: 'add_circle', label: 'Add Asset', color: '#2e86de', href: '/assets' },
                  { icon: 'move_up', label: 'Transfer', color: '#6c5ce7', href: '/allocation' },
                  { icon: 'calendar_today', label: 'Book Room', color: '#00b894', href: '/bookings' },
                  { icon: 'analytics', label: 'Reports', color: '#e17055', href: '/reports' },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className={styles.quickActionItem}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className={styles.quickActionIcon}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20, color: action.color, fontVariationSettings: "'FILL' 1" }}>
                        {action.icon}
                      </span>
                    </div>
                    <span>{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
