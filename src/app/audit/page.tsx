"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import layoutStyles from '@/app/dashboard/dashboard.module.css';
import styles from './audit.module.css';


import { useToast } from '@/context/ToastContext';

type VerificationStatus = 'verified' | 'missing' | 'damaged' | null;

const statusConfig = {
  verified: { label: 'Verified', color: '#006d4e', bg: '#d4f5ee', icon: 'check_circle' },
  missing: { label: 'Missing', color: '#b03a25', bg: '#ffd5cf', icon: 'search_off' },
  damaged: { label: 'Damaged', color: '#7d4e00', bg: '#ffeaa7', icon: 'warning' },
};

export default function AuditPage() {
  const [assets, setAssets] = useState<any[]>([]);
  
  React.useEffect(() => {
    fetch('/api/assets').then(res => res.json()).then(data => {
      if (Array.isArray(data)) setAssets(data);
    });
  }, []);

  const addActivityLog = (text: string, type: string) => { console.log("Activity Log:", text, type); };
  const { showToast } = useToast();
  
  const [auditStatuses, setAuditStatuses] = useState<Record<string, VerificationStatus>>({});
  const [cycleOpen, setCycleOpen] = useState(true);

  const setStatus = (id: string, status: VerificationStatus) => {
    if (!cycleOpen) return;
    setAuditStatuses(prev => ({ ...prev, [id]: status }));
  };

  const getStatus = (id: string) => auditStatuses[id] || null;

  const verified = assets.filter(a => getStatus(a.id) === 'verified').length;
  const missing = assets.filter(a => getStatus(a.id) === 'missing').length;
  const damaged = assets.filter(a => getStatus(a.id) === 'damaged').length;
  const flagged = missing + damaged;
  const total = assets.length;
  const progress = total === 0 ? 0 : Math.round((Object.keys(auditStatuses).length / total) * 100);

  const closeAudit = () => {
    setCycleOpen(false);
    
    // Update assets in context
    setAssets(prev => prev.map(a => {
      const st = getStatus(a.id);
      if (st === 'missing') {
        return { ...a, status: 'Lost', history: ['Flagged missing during audit', ...a.history] } as any;
      }
      if (st === 'damaged') {
        return { ...a, condition: 'Needs Repair', history: ['Flagged damaged during audit', ...a.history] } as any;
      }
      return a;
    }));
    
    addActivityLog(`Audit cycle closed. ${flagged} assets flagged.`, 'Audit');
    showToast('Audit cycle closed successfully.', 'success');
  };

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
              <button className={styles.closeCycleBtn} onClick={closeAudit}>
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
              {assets.map((asset) => {
                const status = getStatus(asset.id);
                return (
                  <tr key={asset.id} className={styles.tr}>
                    <td className={styles.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className={styles.assetIcon}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#2e86de', fontVariationSettings: "'FILL' 1" }}>
                            {asset.categoryId === 'c1' ? 'laptop_mac' : asset.categoryId === 'c2' ? 'chair' : asset.categoryId === 'c3' ? 'directions_car' : 'videocam'}
                          </span>
                        </div>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)' }}>{asset.name}</p>
                          <p style={{ fontSize: 11, color: '#888', fontFamily: 'monospace' }}>{asset.tag}</p>
                        </div>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span style={{ fontSize: 13, color: 'var(--color-on-surface-variant)' }}>{asset.location}</span>
                    </td>
                    <td className={styles.td}>
                      {status ? (
                        <span className={styles.statusBadge} style={{
                          backgroundColor: statusConfig[status].bg,
                          color: statusConfig[status].color
                        }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{statusConfig[status].icon}</span>
                          {statusConfig[status].label}
                        </span>
                      ) : (
                        <span style={{ fontSize: 13, color: '#aaa', fontStyle: 'italic' }}>Pending Verification</span>
                      )}
                    </td>
                    <td className={styles.td} style={{ textAlign: 'right' }}>
                      <div className={styles.actionBtns}>
                        <button
                          className={`${styles.markBtn} ${status === 'verified' ? styles.markBtnActive : ''}`}
                          style={{ '--mark-color': '#00b894' } as React.CSSProperties}
                          onClick={() => setStatus(asset.id, 'verified')}
                          disabled={!cycleOpen}
                          title="Verified"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check</span>
                        </button>
                        <button
                          className={`${styles.markBtn} ${status === 'missing' ? styles.markBtnActive : ''}`}
                          style={{ '--mark-color': '#e17055' } as React.CSSProperties}
                          onClick={() => setStatus(asset.id, 'missing')}
                          disabled={!cycleOpen}
                          title="Missing"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>search_off</span>
                        </button>
                        <button
                          className={`${styles.markBtn} ${status === 'damaged' ? styles.markBtnActive : ''}`}
                          style={{ '--mark-color': '#e67e22' } as React.CSSProperties}
                          onClick={() => setStatus(asset.id, 'damaged')}
                          disabled={!cycleOpen}
                          title="Damaged"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>warning</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
