"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import layoutStyles from '../page.module.css';
import styles from './allocation.module.css';

const assets = [
  { id: 'AF-0114', name: 'Dell Laptop', category: 'Electronics', currentUser: 'Priya Shah', dept: 'Engineering', status: 'allocated' },
  { id: 'AF-0062', name: 'Projector', category: 'AV Equipment', currentUser: 'Available', dept: '—', status: 'available' },
  { id: 'AF-0031', name: 'Canon Camera Kit', category: 'AV Equipment', currentUser: 'Rohan Mehta', dept: 'Marketing', status: 'allocated' },
  { id: 'AF-0021', name: 'Office Chair', category: 'Furniture', currentUser: 'Sana Iqbal', dept: 'Field Ops', status: 'allocated' },
];

const employees = ['Priya Shah', 'Rohan Mehta', 'Sana Iqbal', 'Aditi Rao', 'Vikram Nair', 'Meera Patel'];

const history = [
  { date: 'Nov 12', event: 'Allocated to Priya Shah — Engineering' },
  { date: 'Jan 16', event: 'Returned by Arjun Shet — condition: good' },
];

export default function AllocationPage() {
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [toEmployee, setToEmployee] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className={layoutStyles.layout}>
      <Sidebar />
      <Topbar />
      <main className={layoutStyles.mainContent}>
        <div className={layoutStyles.pageHeader}>
          <div>
            <h1 className={layoutStyles.pageTitle}>Allocation & Transfer</h1>
            <p className={layoutStyles.pageSubtitle}>Allocate assets to employees or submit transfer requests</p>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Left: Asset Selector + Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Select Asset</h2>
              <div className={styles.assetList}>
                {assets.map((asset) => (
                  <button
                    key={asset.id}
                    className={`${styles.assetItem} ${selectedAsset.id === asset.id ? styles.assetItemActive : ''}`}
                    onClick={() => { setSelectedAsset(asset); setSubmitted(false); }}
                  >
                    <div className={styles.assetItemIcon} style={{ backgroundColor: asset.status === 'available' ? '#d4f5ee' : '#ddeeff' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: asset.status === 'available' ? '#00b894' : '#2e86de', fontVariationSettings: "'FILL' 1" }}>
                        {asset.category === 'Electronics' ? 'laptop_mac' : asset.category === 'AV Equipment' ? 'videocam' : 'chair'}
                      </span>
                    </div>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#1e2a3a' }}>{asset.id} – {asset.name}</p>
                      <p style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{asset.currentUser} · {asset.dept}</p>
                    </div>
                    <span className={`${styles.badge} ${asset.status === 'available' ? styles.badgeGreen : styles.badgeBlue}`}>
                      {asset.status === 'available' ? 'Available' : 'In Use'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Allocation History */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Allocation History</h2>
              <div className={styles.historyList}>
                {history.map((h, i) => (
                  <div key={i} className={styles.historyItem}>
                    <div className={styles.historyDot} />
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#2e86de' }}>{h.date}</p>
                      <p style={{ fontSize: 13, color: '#444', marginTop: 2 }}>{h.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Transfer Request Form */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Transfer Request</h2>

            {/* Status Banner */}
            {selectedAsset.status === 'allocated' ? (
              <div className={styles.alertBanner}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#e17055' }}>warning</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#b03a25' }}>
                    Already allocated to {selectedAsset.currentUser} ({selectedAsset.dept})
                  </p>
                  <p style={{ fontSize: 12, color: '#c0392b', marginTop: 2 }}>
                    Transfer Request is blocked — submit a transfer request below
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.successBanner}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#00b894' }}>check_circle</span>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#006d4e' }}>Asset is available — allocate directly</p>
              </div>
            )}

            {submitted ? (
              <div className={styles.successBanner} style={{ marginTop: 20, flexDirection: 'column', gap: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 32, color: '#00b894' }}>task_alt</span>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#006d4e' }}>Transfer request submitted!</p>
                <button className={styles.btnSecondary} onClick={() => setSubmitted(false)}>New Request</button>
              </div>
            ) : (
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Asset</label>
                  <div className={styles.formValue}>
                    {selectedAsset.id} – {selectedAsset.name}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>From</label>
                  <div className={styles.formValue} style={{ color: selectedAsset.status === 'available' ? '#888' : undefined }}>
                    {selectedAsset.status === 'available' ? 'Unassigned' : selectedAsset.currentUser}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Allocate To</label>
                  <select
                    className={styles.formSelect}
                    value={toEmployee}
                    onChange={(e) => setToEmployee(e.target.value)}
                  >
                    <option value="">Select Employee...</option>
                    {employees.filter(e => e !== selectedAsset.currentUser).map(e => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Notes</label>
                  <textarea
                    className={styles.formTextarea}
                    placeholder="Reason for transfer, condition notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                <button
                  className={styles.btnPrimary}
                  onClick={() => { if (toEmployee) setSubmitted(true); }}
                  disabled={!toEmployee}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
                  {selectedAsset.status === 'available' ? 'Allocate Asset' : 'Submit Transfer Request'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
