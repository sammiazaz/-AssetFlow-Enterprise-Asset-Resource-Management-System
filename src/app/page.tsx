"use client";

import React from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import styles from './page.module.css';

const kpiData = [
  { label: 'Available', value: '128', icon: 'check_circle', color: '#2e86de', bg: '#ddeeff', href: '/assets' },
  { label: 'Allocated', value: '76', icon: 'person', color: '#00b894', bg: '#d4f5ee', href: '/allocation' },
  { label: 'Available Resources', value: '9', icon: 'meeting_room', color: '#6c5ce7', bg: '#ede9ff', href: '/bookings' },
  { label: 'Active Bookings', value: '9', icon: 'calendar_today', color: '#e67e22', bg: '#fff3e0', href: '/bookings' },
  { label: 'Pending Transfers', value: '3', icon: 'sync', color: '#2e86de', bg: '#ddeeff', href: '/allocation' },
  { label: 'Upcoming Returns', value: '12', icon: 'keyboard_return', color: '#6c5ce7', bg: '#ede9ff', href: '/assets' },
];

const recentActivity = [
  { icon: 'laptop_mac', text: 'Laptop AF-0114 allocated to Priya Shah', dept: 'IT dept', status: 'Checked Out', color: '#2e86de' },
  { icon: 'event_available', text: 'Room B2 booking confirmed · 2:00 to 5:00 PM', dept: 'Operations', status: 'Reserved', color: '#00b894' },
  { icon: 'build', text: 'Projector AF-0062 maintenance resolved', dept: 'Facilities', status: 'Resolved', color: '#6c5ce7' },
];

const assetsByCategory = [
  { category: 'IT Equipment', count: 54, pct: 42 },
  { category: 'Furniture', count: 32, pct: 25 },
  { category: 'Vehicles', count: 18, pct: 14 },
  { category: 'AV Equipment', count: 14, pct: 11 },
  { category: 'Others', count: 10, pct: 8 },
];

const categoryColors = ['#2e86de', '#00b894', '#6c5ce7', '#e17055', '#fdcb6e'];

export default function Dashboard() {
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
        <div className={styles.alertBanner}>
          <span className={`material-symbols-outlined ${styles.alertIcon}`}>warning</span>
          <span style={{ fontWeight: 600, fontSize: 13 }}>
            3 assets overdue for return — flagged for follow-up
          </span>
          <Link href="/audit" className={styles.alertAction} style={{ textDecoration: 'none' }}>
            TAKE ACTION
          </Link>
        </div>

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
              {recentActivity.map((item, idx) => (
                <div key={idx} className={styles.activityItem} style={{ padding: '12px 20px' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    backgroundColor: item.color + '1a'
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: item.color, fontVariationSettings: "'FILL' 1" }}>
                      {item.icon}
                    </span>
                  </div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>{item.text}</p>
                    <p className={styles.activityTime}>{item.dept}</p>
                  </div>
                  <span className={styles.badge} style={{ backgroundColor: item.color + '1a', color: item.color, fontSize: 11, whiteSpace: 'nowrap' }}>
                    {item.status}
                  </span>
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
                        <div className={styles.progressFill} style={{ width: `${item.pct}%`, backgroundColor: categoryColors[idx] }} />
                      </div>
                    </div>
                  ))}
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
