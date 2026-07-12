"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import layoutStyles from '../page.module.css';
import styles from './notifications.module.css';

type Tab = 'all' | 'alerts' | 'approvals' | 'bookings';

interface Notification {
  id: string;
  type: Tab;
  icon: string;
  iconColor: string;
  text: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  { id: '1', type: 'approvals', icon: 'assignment_turned_in', iconColor: '#2e86de', text: 'Laptop AF-0114 assigned to Priya Shah', time: '2m ago', read: false },
  { id: '2', type: 'approvals', icon: 'check_circle', iconColor: '#00b894', text: 'Maintenance request AF-0062 approved', time: '10m ago', read: false },
  { id: '3', type: 'bookings', icon: 'event_available', iconColor: '#6c5ce7', text: 'Booking confirmed — Room B2 · 2:00 to 3:00 PM', time: '35m ago', read: false },
  { id: '4', type: 'alerts', icon: 'warning', iconColor: '#e67e22', text: 'Overdue return · Camera Kit AF-0031 — 4 days', time: '1d ago', read: true },
  { id: '5', type: 'alerts', icon: 'flag', iconColor: '#e17055', text: 'Audit discrepancy flagged · AF-0098 damaged', time: '2d ago', read: true },
  { id: '6', type: 'approvals', icon: 'sync', iconColor: '#6c5ce7', text: 'Transfer request pending approval — Projector AF-0062', time: '2d ago', read: true },
  { id: '7', type: 'bookings', icon: 'event', iconColor: '#2e86de', text: 'Room T1 booking cancelled by Sana Iqbal', time: '3d ago', read: true },
  { id: '8', type: 'alerts', icon: 'build', iconColor: '#e67e22', text: 'Maintenance overdue — Forklift AF-0018 inspection', time: '3d ago', read: true },
];

const tabs: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'alerts', label: 'Alerts' },
  { key: 'approvals', label: 'Approvals' },
  { key: 'bookings', label: 'Bookings' },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [items, setItems] = useState(notifications);

  const filtered = activeTab === 'all' ? items : items.filter(n => n.type === activeTab);
  const unread = items.filter(n => !n.read).length;

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <div className={layoutStyles.layout}>
      <Sidebar />
      <Topbar />
      <main className={layoutStyles.mainContent}>
        <div className={layoutStyles.pageHeader}>
          <div>
            <h1 className={layoutStyles.pageTitle}>
              Activity Logs & Notifications
              {unread > 0 && <span className={styles.unreadCount}>{unread}</span>}
            </h1>
            <p className={layoutStyles.pageSubtitle}>System-wide activity, alerts, and approval updates</p>
          </div>
          {unread > 0 && (
            <button className={layoutStyles.btnSecondary} onClick={markAllRead}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>done_all</span>
              Mark all as read
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map(tab => {
            const count = tab.key === 'all' ? items.length : items.filter(n => n.type === tab.key).length;
            return (
              <button
                key={tab.key}
                className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
                <span className={`${styles.tabCount} ${activeTab === tab.key ? styles.tabCountActive : ''}`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Notification List */}
        <div className={styles.listCard}>
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <span className="material-symbols-outlined" style={{ fontSize: 40, opacity: 0.3 }}>notifications_none</span>
              <p>No notifications in this category</p>
            </div>
          ) : (
            filtered.map((n) => (
              <div
                key={n.id}
                className={`${styles.item} ${!n.read ? styles.itemUnread : ''}`}
                onClick={() => markRead(n.id)}
              >
                <div className={styles.itemIcon} style={{ backgroundColor: n.iconColor + '1a' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: n.iconColor, fontVariationSettings: "'FILL' 1" }}>
                    {n.icon}
                  </span>
                </div>
                <div className={styles.itemContent}>
                  <p className={styles.itemText}>{n.text}</p>
                  <p className={styles.itemTime}>{n.time}</p>
                </div>
                {!n.read && <div className={styles.unreadDot} style={{ backgroundColor: n.iconColor }} />}
                <span className={`${styles.typeBadge}`} style={{
                  backgroundColor: n.iconColor + '1a',
                  color: n.iconColor,
                  textTransform: 'capitalize'
                }}>
                  {n.type}
                </span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
