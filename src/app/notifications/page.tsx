"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import layoutStyles from '@/app/dashboard/dashboard.module.css';
import styles from './notifications.module.css';



type Tab = 'all' | 'alerts' | 'approvals' | 'bookings';

const tabs: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'alerts', label: 'Alerts' },
  { key: 'approvals', label: 'Approvals' },
  { key: 'bookings', label: 'Bookings' },
];

function timeAgo(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function mapTypeToTab(type: string): Tab {
  switch (type) {
    case 'Allocation': return 'approvals';
    case 'Booking': return 'bookings';
    default: return 'alerts';
  }
}

function getIconAndColor(type: string) {
  switch (type) {
    case 'Allocation': return { icon: 'assignment_turned_in', color: '#2e86de' };
    case 'Booking': return { icon: 'event_available', color: '#6c5ce7' };
    case 'Maintenance': return { icon: 'build', color: '#e67e22' };
    case 'Audit': return { icon: 'flag', color: '#e17055' };
    default: return { icon: 'notifications', color: '#00b894' };
  }
}

export default function NotificationsPage() {
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('all');

  React.useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setActivityLogs(data);
      });
  }, []);

  const mappedLogs = activityLogs.map(log => {
    const { icon, color } = getIconAndColor(log.type);
    return {
      id: log.id,
      type: mapTypeToTab(log.type),
      originalType: log.type,
      icon,
      iconColor: color,
      text: log.text,
      time: timeAgo(log.date),
      read: !!log.read,
    };
  });

  const filtered = activeTab === 'all' ? mappedLogs : mappedLogs.filter(n => n.type === activeTab);
  const unread = mappedLogs.filter(n => !n.read).length;

  const markAllRead = async () => {
    const unreadLogs = activityLogs.filter(n => !n.read);
    setActivityLogs(prev => prev.map(n => ({ ...n, read: true })));
    for (const log of unreadLogs) {
      fetch(`/api/notifications/${log.id}/read`, { method: 'PATCH' });
    }
  };

  const markRead = async (id: string) => {
    setActivityLogs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    fetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
  };

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
            const count = tab.key === 'all' ? mappedLogs.length : mappedLogs.filter(n => n.type === tab.key).length;
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
                  {n.originalType}
                </span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
