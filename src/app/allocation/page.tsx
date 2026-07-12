"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import layoutStyles from '../page.module.css';
import styles from './allocation.module.css';
import { useMockData } from '@/context/MockDataContext';
import { useToast } from '@/context/ToastContext';
import { Asset } from '@/lib/mockDb';

export default function AllocationPage() {
  const { assets, employees, departments, setAssets, addActivityLog } = useMockData();
  const { showToast } = useToast();

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [toEmployee, setToEmployee] = useState('');
  const [expectedReturnDate, setExpectedReturnDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (assets.length > 0 && !selectedAsset) {
      setSelectedAsset(assets[0]);
    }
  }, [assets, selectedAsset]);

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
                {assets.map((asset) => {
                  const currentUser = employees.find(e => e.id === asset.assignedTo)?.name || 'Available';
                  const dept = departments.find(d => d.id === asset.departmentId)?.name || '—';
                  return (
                    <button
                      key={asset.id}
                      className={`${styles.assetItem} ${selectedAsset?.id === asset.id ? styles.assetItemActive : ''}`}
                      onClick={() => { setSelectedAsset(asset); setSubmitted(false); }}
                    >
                      <div className={styles.assetItemIcon} style={{ backgroundColor: asset.status === 'Available' ? '#d4f5ee' : '#ddeeff' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: asset.status === 'Available' ? '#00b894' : '#2e86de', fontVariationSettings: "'FILL' 1" }}>
                          {asset.categoryId === 'c1' ? 'laptop_mac' : asset.categoryId === 'c4' ? 'videocam' : 'chair'}
                        </span>
                      </div>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#1e2a3a' }}>{asset.tag} – {asset.name}</p>
                        <p style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{currentUser} · {dept}</p>
                      </div>
                      <span className={`${styles.badge} ${asset.status === 'Available' ? styles.badgeGreen : styles.badgeBlue}`}>
                        {asset.status === 'Available' ? 'Available' : 'In Use'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Allocation History */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Allocation History</h2>
              <div className={styles.historyList}>
                {selectedAsset?.history?.slice(0, 5).map((h, i) => (
                  <div key={i} className={styles.historyItem}>
                    <div className={styles.historyDot} />
                    <div>
                      <p style={{ fontSize: 13, color: '#444', marginTop: 2 }}>{h}</p>
                    </div>
                  </div>
                ))}
                {(!selectedAsset?.history || selectedAsset.history.length === 0) && (
                   <p style={{ fontSize: 13, color: '#888', padding: 12 }}>No recent allocation history.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right: Transfer Request Form */}
          {selectedAsset && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Transfer Request</h2>

              {/* Status Banner */}
              {selectedAsset.status === 'Allocated' ? (
                <div className={styles.alertBanner}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#e17055' }}>warning</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#b03a25' }}>
                      Already allocated to {employees.find(e => e.id === selectedAsset.assignedTo)?.name}
                    </p>
                    <p style={{ fontSize: 12, color: '#c0392b', marginTop: 2 }}>
                      Direct allocation is blocked — submit a transfer request below
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
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#006d4e' }}>{selectedAsset.status === 'Available' ? 'Allocation created!' : 'Transfer request submitted!'}</p>
                  <button className={styles.btnSecondary} onClick={() => setSubmitted(false)}>New Request</button>
                </div>
              ) : (
                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Asset</label>
                    <div className={styles.formValue}>
                      {selectedAsset.tag} – {selectedAsset.name}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>From</label>
                    <div className={styles.formValue} style={{ color: selectedAsset.status === 'Available' ? '#888' : undefined }}>
                      {selectedAsset.status === 'Available' ? 'Unassigned' : employees.find(e => e.id === selectedAsset.assignedTo)?.name}
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
                      {employees.filter(e => e.id !== selectedAsset.assignedTo).map(e => (
                        <option key={e.id} value={e.id}>{e.name} ({departments.find(d => d.id === e.departmentId)?.name})</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Expected Return Date (Optional)</label>
                    <input
                      type="date"
                      className={styles.formSelect}
                      value={expectedReturnDate}
                      onChange={(e) => setExpectedReturnDate(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Notes</label>
                    <textarea
                      className={styles.formTextarea}
                      placeholder="Add reason for request..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <button 
                    className={styles.btnPrimary} 
                    style={{ marginTop: 8 }}
                    onClick={() => {
                      if (!toEmployee) {
                        showToast('Please select an employee.', 'error');
                        return;
                      }
                      
                      const empName = employees.find(e => e.id === toEmployee)?.name;
                      const deptId = employees.find(e => e.id === toEmployee)?.departmentId;
                      
                      setAssets(prev => prev.map(a => {
                        if (a.id === selectedAsset.id) {
                          const eventDesc = a.status === 'Available' 
                            ? `Allocated to ${empName}` 
                            : `Transfer requested from ${employees.find(e => e.id === a.assignedTo)?.name} to ${empName}`;
                            
                          return {
                            ...a,
                            status: a.status === 'Available' ? 'Allocated' : a.status, // Fake transfer logic just leaves it allocated until approved
                            assignedTo: a.status === 'Available' ? toEmployee : a.assignedTo,
                            departmentId: a.status === 'Available' ? deptId : a.departmentId,
                            expectedReturnDate: expectedReturnDate || a.expectedReturnDate,
                            history: [eventDesc, ...a.history]
                          } as Asset;
                        }
                        return a;
                      }));
                      
                      addActivityLog(`${selectedAsset.name} ${selectedAsset.status === 'Available' ? 'allocated to' : 'transfer requested by'} ${empName}`, 'Allocation');
                      showToast('Request processed successfully!');
                      setSubmitted(true);
                      setToEmployee('');
                      setExpectedReturnDate('');
                      setNotes('');
                    }}
                  >
                    {selectedAsset.status === 'Available' ? 'Allocate Asset' : 'Submit Transfer Request'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
