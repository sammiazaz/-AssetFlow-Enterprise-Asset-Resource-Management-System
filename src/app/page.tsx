"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const navItems = [
  { href: '/', label: 'Dashboard', icon: 'dashboard', active: true },
  { href: '/organization-setup', label: 'Organization', icon: 'corporate_fare' },
  { href: '/assets', label: 'Assets', icon: 'inventory_2' },
  { href: '#', label: 'Allocation', icon: 'move_up' },
  { href: '#', label: 'Bookings', icon: 'calendar_today' },
  { href: '#', label: 'Maintenance', icon: 'build' },
  { href: '#', label: 'Reports', icon: 'analytics' },
  { href: '#', label: 'Audit', icon: 'fact_check' },
];

const kpiData = [
  { label: 'Total Assets', value: '128', icon: 'inventory_2', color: '#2e86de', bg: '#ddeeff', trend: '+5 this week' },
  { label: 'In Use', value: '76', icon: 'person', color: '#00b894', bg: '#d4f5ee', trend: '59% utilization' },
  { label: 'Available', value: '43', icon: 'check_circle', color: '#6c5ce7', bg: '#ede9ff', trend: 'Ready to allocate' },
  { label: 'Under Maintenance', value: '9', icon: 'build', color: '#e17055', bg: '#ffeee9', trend: '3 overdue' },
];

const recentActivity = [
  { icon: 'laptop_mac', text: 'Laptop AF-0114 checked out to Priya Shah', time: '2 min ago', dept: 'IT Department', status: 'Checked Out', color: '#2e86de' },
  { icon: 'meeting_room', text: 'Conference Room B2 booking confirmed', time: '15 min ago', dept: 'Operations', status: 'Reserved', color: '#00b894' },
  { icon: 'build', text: 'Projector AF-0062 maintenance completed', time: '1 hr ago', dept: 'Facilities', status: 'Available', color: '#6c5ce7' },
  { icon: 'assignment_return', text: 'Camera Kit AF-0031 returned by Rohan Mehta', time: '2 hr ago', dept: 'Marketing', status: 'Returned', color: '#00b894' },
  { icon: 'warning', text: 'Forklift AF-0018 inspection overdue', time: '3 hr ago', dept: 'Warehouse', status: 'Overdue', color: '#e17055' },
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
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span className={`${styles.brandName} headline-sm`}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#54a0ff' }}>grid_view</span>
            AssetFlow
          </span>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${styles.navItem} ${item.active ? styles.navItemActive : ''}`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 18, fontVariationSettings: item.active ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span style={{ fontSize: 13 }}>{item.label}</span>
            </Link>
          ))}

          <div className={styles.navDivider} />

          <a href="#" className={styles.navItem} onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>notifications</span>
            <span style={{ fontSize: 13 }}>Notifications</span>
          </a>
          <a href="#" className={styles.navItem} onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>settings</span>
            <span style={{ fontSize: 13 }}>Settings</span>
          </a>
        </nav>
      </aside>

      {/* Header */}
      <header className={styles.topbar}>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search assets by tag, serial, name..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
          </div>
        </div>

        <div className={styles.topbarActions}>
          <Link href="/assets" className={styles.quickLink} style={{ textDecoration: 'none' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
            New Asset
          </Link>

          <div className={styles.dividerVertical} />

          <button className={styles.helpBtn} title="Notifications">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className={styles.helpBtn} title="Settings">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className={styles.helpBtn} title="Help">
            <span className="material-symbols-outlined">help_outline</span>
          </button>

          <div className={styles.dividerVertical} />

          <div className={styles.userProfile}>
            <div className={styles.userAvatar}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1TUCT6ofiNoGnpP2VdVWgI3ltZnxuWK7zHQFoUJcDXoDItExzQDJebm1BNB2DbHkw4_pM9fk9AO_VzntpjV56193Y0WkMar4K9qeoY4PF_gTIr9FHMlSNFjEbhS9zjURTyU6t9xNZqP00Twern6VKocWScmBRMWOVRQme0OWCriOqt5gl-bZmSMeD_FvoQMn9HyscL5GbvVK0Mou9CtxoAGqr267td_jd6EGn1on-_zlX6oW7MXUk" alt="Profile" />
            </div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>Admin User</p>
              <p className={styles.userRole}>System Administrator</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Dashboard</h1>
            <p className={styles.pageSubtitle}>Overview of your assets and resource management</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.btnSecondary}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_today</span>
              Last 30 days
            </button>
            <Link href="/assets" className={styles.btnPrimary} style={{ textDecoration: 'none' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
              Add Asset
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className={styles.kpiGrid}>
          {kpiData.map((kpi) => (
            <div key={kpi.label} className={styles.kpiCard}>
              <div className={styles.kpiCardHeader}>
                <span className={styles.kpiLabel}>{kpi.label}</span>
                <div className={styles.kpiIconBox} style={{ backgroundColor: kpi.bg }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: kpi.color, fontVariationSettings: "'FILL' 1" }}>
                    {kpi.icon}
                  </span>
                </div>
              </div>
              <div className={styles.kpiValue}>{kpi.value}</div>
              <div className={`${styles.kpiTrend} ${styles.kpiTrendNeutral}`}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>trending_flat</span>
                {kpi.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          {/* Recent Activity */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Recent Activity</h2>
              <button className={styles.btnSecondary} style={{ padding: '4px 10px', fontSize: 12 }}>View All</button>
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
                    <p className={styles.activityTime}>{item.time} · {item.dept}</p>
                  </div>
                  <span
                    className={styles.badge}
                    style={{
                      backgroundColor: item.color + '1a',
                      color: item.color,
                      fontSize: 11,
                      whiteSpace: 'nowrap'
                    }}
                  >
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {assetsByCategory.map((item, idx) => (
                    <div key={item.category}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 13, color: 'var(--color-on-surface)', fontWeight: 500 }}>
                          {item.category}
                        </span>
                        <span style={{ fontSize: 13, color: 'var(--color-on-surface-variant)' }}>
                          {item.count} ({item.pct}%)
                        </span>
                      </div>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${item.pct}%`, backgroundColor: categoryColors[idx] }}
                        />
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
                  { icon: 'add_circle', label: 'Add Asset', color: '#2e86de' },
                  { icon: 'move_up', label: 'Transfer', color: '#6c5ce7' },
                  { icon: 'calendar_today', label: 'Book Room', color: '#00b894' },
                  { icon: 'analytics', label: 'Reports', color: '#e17055' },
                ].map((action) => (
                  <button
                    key={action.label}
                    className={styles.quickActionItem}
                    onClick={() => alert(`${action.label} clicked`)}
                  >
                    <div className={styles.quickActionIcon}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20, color: action.color, fontVariationSettings: "'FILL' 1" }}>
                        {action.icon}
                      </span>
                    </div>
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
