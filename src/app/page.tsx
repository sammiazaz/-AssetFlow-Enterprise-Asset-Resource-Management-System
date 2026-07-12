"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import WithAuth from '@/components/WithAuth';
import styles from './page.module.css';
import { useMockData } from '@/context/MockDataContext';

const categoryColors = ['#2e86de', '#00b894', '#6c5ce7', '#e17055', '#fdcb6e'];

export default function Dashboard() {
  const { assets, bookings, maintenanceRequests, activityLogs } = useMockData();

  const kpiData = useMemo(() => {
    const available = assets.filter(a => a.status === 'Available').length;
    const allocated = assets.filter(a => a.status === 'Allocated').length;
    const activeBookings = bookings.filter(b => b.status === 'Ongoing' || b.status === 'Upcoming').length;
    const pendingTransfers = 0; // Fake state for now
    const upcomingReturns = assets.filter(a => a.expectedReturnDate && new Date(a.expectedReturnDate) > new Date()).length;
    
    return [
      { label: 'Available', value: available.toString(), icon: 'check_circle', color: '#2e86de', bg: '#ddeeff', href: '/assets' },
      { label: 'Allocated', value: allocated.toString(), icon: 'person', color: '#00b894', bg: '#d4f5ee', href: '/allocation' },
      { label: 'Available Resources', value: assets.filter(a => a.isSharedBookable).length.toString(), icon: 'meeting_room', color: '#6c5ce7', bg: '#ede9ff', href: '/bookings' },
      { label: 'Active Bookings', value: activeBookings.toString(), icon: 'calendar_today', color: '#e67e22', bg: '#fff3e0', href: '/bookings' },
      { label: 'Pending Transfers', value: pendingTransfers.toString(), icon: 'sync', color: '#2e86de', bg: '#ddeeff', href: '/allocation' },
      { label: 'Upcoming Returns', value: upcomingReturns.toString(), icon: 'keyboard_return', color: '#6c5ce7', bg: '#ede9ff', href: '/assets' },
    ];
  }, [assets, bookings]);

  const overdueAssets = useMemo(() => {
    return assets.filter(a => a.expectedReturnDate && new Date(a.expectedReturnDate) < new Date()).length;
  }, [assets]);

  const assetsByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    assets.forEach(a => {
      counts[a.categoryId] = (counts[a.categoryId] || 0) + 1;
    });
    const total = assets.length || 1;
    return Object.keys(counts).map(key => ({
      category: key === 'c1' ? 'IT Equipment' : key === 'c2' ? 'Furniture' : key === 'c3' ? 'Vehicles' : 'AV Equipment',
      count: counts[key],
      pct: Math.round((counts[key] / total) * 100)
    })).sort((a, b) => b.count - a.count);
  }, [assets]);
  return (
    <WithAuth>
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
                    {assetsByCategory.map((item, idx) => (
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
    </WithAuth>
  );
}
