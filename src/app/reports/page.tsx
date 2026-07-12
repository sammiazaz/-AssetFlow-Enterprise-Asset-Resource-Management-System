"use client";

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import layoutStyles from '@/app/dashboard/dashboard.module.css';
import styles from './reports.module.css';
import { useToast } from '@/context/ToastContext';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';

export default function ReportsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [reportsData, setReportsData] = React.useState<any>({
    deptData: [],
    mostUsed: [],
    idleAssets: [],
    maintenanceDue: [],
    chartData: []
  });

  React.useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setReportsData(data);
      });
  }, []);

  const { deptData, mostUsed, idleAssets, maintenanceDue, chartData } = reportsData;
  const maxBarValue = deptData.length > 0 ? Math.max(...deptData.map((d: any) => d.value), 100) : 100;
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
            <button className={layoutStyles.btnSecondary} onClick={() => { window.print(); showToast('Report preview opened for printing.'); }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
              Export PDF
            </button>
            <button className={layoutStyles.btnPrimary} style={{ textDecoration: 'none' }} onClick={() => { showToast('Latest report insights refreshed.'); }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>summarize</span>
              Generate Summary
            </button>
          </div>
        </div>

        {/* Charts Row */}
        <div className={styles.chartsRow}>
          {/* Utilization Bar Chart */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Utilization by Department</h2>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8eaed" />
                  <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#2e86de" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Maintenance Frequency Line Chart */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Maintenance Frequency</h2>
            <div style={{ width: '100%', height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2e86de" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2e86de" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8eaed" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                  <Area type="monotone" dataKey="value" stroke="#2e86de" strokeWidth={2.5} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
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
              {(mostUsed || []).map((a: any, i: number) => (
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
              {(idleAssets || []).map((a: any) => (
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
                  <button className={styles.reviewBtn} onClick={() => { showToast(`Review workflow for ${a.name} opened.`); router.push('/maintenance'); }}>Review</button>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Due */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Due for Maintenance / Retirement</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
              {(maintenanceDue || []).map((a: any) => (
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
