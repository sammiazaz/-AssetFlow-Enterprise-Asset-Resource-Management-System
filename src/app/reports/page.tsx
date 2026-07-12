"use client";

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import layoutStyles from '../page.module.css';
import styles from './reports.module.css';

const deptData = [
  { dept: 'Engineering', value: 85, assets: 54 },
  { dept: 'Facilities', value: 60, assets: 32 },
  { dept: 'Marketing', value: 72, assets: 18 },
  { dept: 'Field Ops', value: 45, assets: 14 },
  { dept: 'Admin', value: 38, assets: 10 },
];

const mostUsed = [
  { name: 'Projector B2', uses: 34, trips: 27, icon: 'videocam', color: '#2e86de' },
  { name: 'Dell Laptop AF-0114', uses: 28, trips: 21, icon: 'laptop_mac', color: '#6c5ce7' },
  { name: 'Camera Kit AF-0031', uses: 19, trips: 18, icon: 'photo_camera', color: '#00b894' },
];

const idleAssets = [
  { name: 'Monitor AF-0092', days: 45, icon: 'monitor', color: '#e67e22' },
  { name: 'Printer AF-0046', days: 38, icon: 'print', color: '#e17055' },
  { name: 'Webcam AF-0071', days: 31, icon: 'videocam_off', color: '#e17055' },
];

const maintenanceDue = [
  { name: 'Forklift AF-0087', due: 'overdue — due 4 days ago', urgent: true },
  { name: 'Laptop AF-0023', due: '5 years old — nearing retirement', urgent: false },
  { name: 'AC Unit AF-0051', due: 'service due in 12 days', urgent: false },
];

const maxBarValue = Math.max(...deptData.map(d => d.value));

export default function ReportsPage() {
  return (
    <div className={layoutStyles.layout}>
      <Sidebar />
      <Topbar />
      <main className={layoutStyles.mainContent}>
        <div className={layoutStyles.pageHeader}>
          <div>
            <h1 className={layoutStyles.pageTitle}>Reports & Analytics</h1>
            <p className={layoutStyles.pageSubtitle}>Utilization, maintenance frequency, and asset health insights</p>
          </div>
          <div className={layoutStyles.headerActions}>
            <button className={layoutStyles.btnSecondary}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
              Export PDF
            </button>
            <button className={layoutStyles.btnPrimary} style={{ textDecoration: 'none' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>summarize</span>
              Report Report
            </button>
          </div>
        </div>

        {/* Charts Row */}
        <div className={styles.chartsRow}>
          {/* Utilization Bar Chart */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Utilization by Department</h2>
            <div className={styles.barChart}>
              {deptData.map((d) => (
                <div key={d.dept} className={styles.barGroup}>
                  <div className={styles.barLabel}>{d.dept}</div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${(d.value / maxBarValue) * 100}%`,
                        backgroundColor: d.value > 70 ? '#2e86de' : d.value > 50 ? '#6c5ce7' : '#e17055'
                      }}
                    />
                    <span className={styles.barValue}>{d.value}%</span>
                  </div>
                  <div className={styles.barAssets}>{d.assets} assets</div>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Frequency Line Chart */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Maintenance Frequency</h2>
            <div className={styles.lineChartWrapper}>
              <svg viewBox="0 0 300 120" className={styles.lineChart}>
                <defs>
                  <linearGradient id="mGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2e86de" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2e86de" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[20, 45, 70, 95].map(y => (
                  <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#e8eaed" strokeWidth="1" />
                ))}
                {/* Area */}
                <path d="M0,90 L50,70 L100,50 L150,60 L200,30 L250,45 L300,20 L300,120 L0,120 Z" fill="url(#mGrad)" />
                {/* Line */}
                <path d="M0,90 L50,70 L100,50 L150,60 L200,30 L250,45 L300,20" fill="none" stroke="#2e86de" strokeWidth="2.5" strokeLinejoin="round" />
                {/* Dots */}
                {[[0,90],[50,70],[100,50],[150,60],[200,30],[250,45],[300,20]].map(([x,y], i) => (
                  <circle key={i} cx={x} cy={y} r="3.5" fill="#fff" stroke="#2e86de" strokeWidth="2" />
                ))}
              </svg>
              <div className={styles.lineLabels}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map(m => (
                  <span key={m} style={{ fontSize: 10, color: '#aaa' }}>{m}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              <div className={styles.metricChip} style={{ background: '#ddeeff', color: '#2e86de' }}>
                <span style={{ fontWeight: 700 }}>23</span> this month
              </div>
              <div className={styles.metricChip} style={{ background: '#ede9ff', color: '#6c5ce7' }}>
                <span style={{ fontWeight: 700 }}>↑ 18%</span> vs last month
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className={styles.bottomRow}>
          {/* Most Used */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Most Used Assets</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
              {mostUsed.map((a, i) => (
                <div key={a.name} className={styles.listItem}>
                  <span className={styles.rankNum}>{i + 1}</span>
                  <div className={styles.listIcon} style={{ background: a.color + '1a' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: a.color, fontVariationSettings: "'FILL' 1" }}>
                      {a.icon}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)' }}>{a.name}</p>
                    <p style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
                      {a.uses} uses this month · {a.trips} trips
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Idle Assets */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Idle Assets</h2>
            <p style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>Not moved in 60+ days</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {idleAssets.map((a) => (
                <div key={a.name} className={styles.listItem}>
                  <div className={styles.listIcon} style={{ background: '#fff3f0' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#e17055', fontVariationSettings: "'FILL' 1" }}>
                      {a.icon}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)' }}>{a.name}</p>
                    <p style={{ fontSize: 11, color: '#e17055', marginTop: 2 }}>Idle for {a.days} days</p>
                  </div>
                  <button className={styles.reviewBtn}>Review</button>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Due */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Due for Maintenance / Retirement</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
              {maintenanceDue.map((a) => (
                <div key={a.name} className={`${styles.dueItem} ${a.urgent ? styles.dueItemUrgent : ''}`}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: a.urgent ? '#e17055' : '#e67e22', fontVariationSettings: "'FILL' 1" }}>
                    {a.urgent ? 'error' : 'schedule'}
                  </span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)' }}>{a.name}</p>
                    <p style={{ fontSize: 11, color: a.urgent ? '#e17055' : '#e67e22', marginTop: 2 }}>{a.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
