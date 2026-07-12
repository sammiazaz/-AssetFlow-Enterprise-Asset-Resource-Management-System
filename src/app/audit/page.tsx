"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import layoutStyles from '../page.module.css';
import styles from './audit.module.css';

type VerificationStatus = 'verified' | 'missing' | 'damaged' | null;

interface AuditAsset {
  id: string;
  name: string;
  expectedLocation: string;
  status: VerificationStatus;
}

const initialAssets: AuditAsset[] = [
  { id: 'AF-0021', name: 'Dell Laptop', expectedLocation: 'Desk #11', status: 'verified' },
  { id: 'AF-0023', name: 'Office Chair', expectedLocation: 'Desk #11', status: null },
  { id: 'AF-4526', name: 'HP Monitor', expectedLocation: 'Desk #11', status: 'missing' },
  { id: 'AF-0043', name: 'Projector', expectedLocation: 'Room B2', status: null },
  { id: 'AF-0061', name: 'Standing Desk', expectedLocation: 'Engineering Bay', status: 'verified' },
  { id: 'AF-0078', name: 'Logitech Webcam', expectedLocation: 'Meeting Room A', status: 'damaged' },
  { id: 'AF-0092', name: 'Extension Board', expectedLocation: 'Server Room', status: 'verified' },
];

const statusConfig = {
  verified: { label: 'Verified', color: '#006d4e', bg: '#d4f5ee', icon: 'check_circle' },
  missing: { label: 'Missing', color: '#b03a25', bg: '#ffd5cf', icon: 'search_off' },
  damaged: { label: 'Damaged', color: '#7d4e00', bg: '#ffeaa7', icon: 'warning' },
};

export default function AuditPage() {
  const [assets, setAssets] = useState<AuditAsset[]>(initialAssets);
  const [cycleOpen, setCycleOpen] = useState(true);

  const setStatus = (id: string, status: VerificationStatus) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const verified = assets.filter(a => a.status === 'verified').length;
  const missing = assets.filter(a => a.status === 'missing').length;
  const damaged = assets.filter(a => a.status === 'damaged').length;
  const flagged = missing + damaged;
  const total = assets.length;
  const progress = Math.round((verified / total) * 100);

  return (
    <div className={layoutStyles.layout}>
      <Sidebar />
      <Topbar />
      <main className={layoutStyles.mainContent}>
        <div className={layoutStyles.pageHeader}>
          <div>
            <h1 className={layoutStyles.pageTitle}>Asset Audit</h1>
            <p className={layoutStyles.pageSubtitle}>
              All audits (Engineering dept) · 3/15 Jul &nbsp;·&nbsp; Auditors: A. Rao, G. Iyer
            </p>
          </div>
          <div className={layoutStyles.headerActions}>
            {cycleOpen ? (
              <button className={styles.closeCycleBtn} onClick={() => setCycleOpen(false)}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>lock</span>
                Close Audit Cycle
              </button>
            ) : (
              <div className={styles.closedBadge}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>lock</span>
                Audit Closed
              </div>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          {[
            { label: 'Total Assets', value: total, color: '#2e86de', bg: '#ddeeff', icon: 'inventory_2' },
            { label: 'Verified', value: verified, color: '#00b894', bg: '#d4f5ee', icon: 'check_circle' },
            { label: 'Missing', value: missing, color: '#e17055', bg: '#ffd5cf', icon: 'search_off' },
            { label: 'Damaged', value: damaged, color: '#e67e22', bg: '#ffeaa7', icon: 'warning' },
          ].map(s => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.statIcon} style={{ backgroundColor: s.bg }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: s.color, fontVariationSettings: "'FILL' 1" }}>
                  {s.icon}
                </span>
              </div>
              <div>
                <p className={styles.statValue} style={{ color: s.color }}>{s.value}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            </div>
          ))}
          <div className={styles.statCard} style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: 'var(--color-on-surface-variant)' }}>Progress</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#2e86de' }}>{progress}%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* Flagged Banner */}
        {flagged > 0 && (
          <div className={styles.flagBanner}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>flag</span>
            <span>
              <strong>{flagged} asset{flagged > 1 ? 's' : ''} flagged</strong> — discrepancy report generated automatically
            </span>
          </div>
        )}

        {/* Audit Table */}
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Asset</th>
                <th className={styles.th}>Expected Location</th>
                <th className={styles.th}>Verification</th>
                <th className={styles.th} style={{ textAlign: 'right' }}>Mark As</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id} className={styles.tr}>
                  <td className={styles.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className={styles.assetIcon}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#2e86de', fontVariationSettings: "'FILL' 1" }}>inventory_2</span>
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)' }}>{asset.name}</p>
                        <p style={{ fontSize: 11, color: '#888', fontFamily: 'monospace' }}>{asset.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span style={{ fontSize: 13, color: 'var(--color-on-surface-variant)' }}>{asset.expectedLocation}</span>
                  </td>
                  <td className={styles.td}>
                    {asset.status ? (
                      <span className={styles.statusBadge} style={{
                        backgroundColor: statusConfig[asset.status].bg,
                        color: statusConfig[asset.status].color
                      }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 13, fontVariationSettings: "'FILL' 1" }}>
                          {statusConfig[asset.status].icon}
                        </span>
                        {statusConfig[asset.status].label}
                      </span>
                    ) : (
                      <span className={styles.pendingBadge}>Pending</span>
                    )}
                  </td>
                  <td className={styles.td}>
                    <div className={styles.actionBtns}>
                      <button
                        className={`${styles.markBtn} ${asset.status === 'verified' ? styles.markBtnActive : ''}`}
                        style={{ '--mark-color': '#00b894' } as React.CSSProperties}
                        onClick={() => setStatus(asset.id, 'verified')}
                        title="Verified"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check</span>
                      </button>
                      <button
                        className={`${styles.markBtn} ${asset.status === 'missing' ? styles.markBtnActive : ''}`}
                        style={{ '--mark-color': '#e17055' } as React.CSSProperties}
                        onClick={() => setStatus(asset.id, 'missing')}
                        title="Missing"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>search_off</span>
                      </button>
                      <button
                        className={`${styles.markBtn} ${asset.status === 'damaged' ? styles.markBtnActive : ''}`}
                        style={{ '--mark-color': '#e67e22' } as React.CSSProperties}
                        onClick={() => setStatus(asset.id, 'damaged')}
                        title="Damaged"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>warning</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
