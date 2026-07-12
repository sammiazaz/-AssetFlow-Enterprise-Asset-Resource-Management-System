"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import layoutStyles from '@/app/dashboard/dashboard.module.css';
import styles from './maintenance.module.css';

type KanbanStatus = 'Pending' | 'Approved' | 'In Progress' | 'Resolved';

const columns: { key: KanbanStatus; label: string; color: string; bg: string }[] = [
  { key: 'Pending', label: 'Pending', color: '#e17055', bg: '#fff3f0' },
  { key: 'Approved', label: 'Approved', color: '#2e86de', bg: '#f0f7ff' },
  { key: 'In Progress', label: 'In Progress', color: '#e67e22', bg: '#fff8f0' },
  { key: 'Resolved', label: 'Resolved', color: '#00b894', bg: '#d4f5ee' },
];



const priorityColor = { High: '#e17055', Medium: '#e67e22', Low: '#00b894' };

import { MaintenanceRequest } from '@prisma/client';
import Modal from '@/components/ui/Modal';

import { useToast } from '@/context/ToastContext';

export default function MaintenancePage() {
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);

  React.useEffect(() => {
    Promise.all([
      fetch('/api/maintenance').then(res => res.json()),
      fetch('/api/assets').then(res => res.json()),
      fetch('/api/employees').then(res => res.json())
    ]).then(([m, a, e]) => {
      if (Array.isArray(m)) setMaintenanceRequests(m);
      if (Array.isArray(a)) setAssets(a);
      if (Array.isArray(e)) setEmployees(e);
    });
  }, []);

  const addActivityLog = (text: string, type: string) => { console.log("Activity Log:", text, type); };
  const { showToast } = useToast();
  
  const [dragCard, setDragCard] = useState<{ card: MaintenanceRequest; from: string } | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({ assetId: '', issue: '', priority: 'Medium' });

  const handleDragStart = (card: MaintenanceRequest, from: string) => {
    setDragCard({ card, from });
  };

  const handleDrop = async (to: KanbanStatus) => {
    if (!dragCard || dragCard.from === to) return;
    
    try {
      const res = await fetch(`/api/maintenance/${dragCard.card.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: to })
      });

      if (res.ok) {
        const updatedReq = await res.json();
        setMaintenanceRequests(prev => prev.map(r => r.id === updatedReq.id ? updatedReq : r));
        
        // Auto-update Asset status locally to match backend logic
        const reqAsset = assets.find(a => a.id === dragCard.card.assetId);
        if (reqAsset) {
          if ((to === 'Approved' || to === 'In Progress') && reqAsset.status !== 'Under Maintenance') {
            setAssets(prev => prev.map(a => a.id === reqAsset.id ? { ...a, status: 'Under Maintenance', history: [`Under maintenance: ${dragCard.card.issue}`, ...a.history] } : a));
            addActivityLog(`${reqAsset.name} moved to Under Maintenance`, 'Maintenance');
          } else if (to === 'Resolved' && reqAsset.status === 'Under Maintenance') {
            setAssets(prev => prev.map(a => a.id === reqAsset.id ? { ...a, status: 'Available', history: [`Maintenance resolved: ${dragCard.card.issue}`, ...a.history] } : a));
            addActivityLog(`${reqAsset.name} is now Available after maintenance`, 'Maintenance');
          }
        }
      } else {
        showToast('Failed to update request', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error updating request', 'error');
    }
    
    setDragCard(null);
  };

  const total = maintenanceRequests.length;
  const resolved = maintenanceRequests.filter(m => m.status === 'Resolved').length;

  const groupedCards = {
    Pending: maintenanceRequests.filter(m => m.status === 'Pending'),
    Approved: maintenanceRequests.filter(m => m.status === 'Approved'),
    'In Progress': maintenanceRequests.filter(m => m.status === 'In Progress'),
    Resolved: maintenanceRequests.filter(m => m.status === 'Resolved'),
  };

  return (
    <div className={layoutStyles.layout}>
      <Sidebar />
      <Topbar />
      <main className={layoutStyles.mainContent}>
        <div className={layoutStyles.pageHeader}>
          <div>
            <h1 className={layoutStyles.pageTitle}>Maintenance Management</h1>
            <p className={layoutStyles.pageSubtitle}>
              {resolved}/{total} resolved · Drag cards to move between stages
            </p>
          </div>
          <div className={layoutStyles.headerActions}>
            <button className={layoutStyles.btnPrimary} onClick={() => setIsModalOpen(true)}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
              New Request
            </button>
          </div>
        </div>

        <p className={styles.hint}>
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>info</span>
          Approving a card moves the asset to under maintenance. Resolving returns it to available.
        </p>

        {/* Kanban Board */}
        <div className={styles.kanban}>
          {columns.map((col) => (
            <div
              key={col.key}
              className={styles.column}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.key)}
            >
              <div className={styles.colHeader} style={{ borderColor: col.color }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: col.color }}>{col.label}</span>
                <span className={styles.colCount} style={{ backgroundColor: col.bg, color: col.color }}>
                  {groupedCards[col.key].length}
                </span>
              </div>

              <div className={styles.colCards}>
                {groupedCards[col.key].map((card) => {
                  const asset = assets.find(a => a.id === card.assetId);
                  const assignee = card.status === 'In Progress' || card.status === 'Resolved' ? employees[0]?.name : undefined;
                  return (
                    <div
                      key={card.id}
                      className={styles.card}
                      draggable
                      onDragStart={() => handleDragStart(card, col.key)}
                    >
                      <div className={styles.cardTopRow}>
                        <span className={styles.cardId}>{asset?.tag || 'Unknown'}</span>
                        <span
                          className={styles.priorityDot}
                          style={{ backgroundColor: priorityColor[card.priority as keyof typeof priorityColor] }}
                          title={card.priority}
                        />
                      </div>
                      <p className={styles.cardAsset}>{asset?.name || 'Unknown Asset'}</p>
                      <p className={styles.cardIssue}>{card.issue}</p>
                      <div className={styles.cardFooter}>
                        {assignee && (
                          <span className={styles.cardAssignee}>
                            <span className="material-symbols-outlined" style={{ fontSize: 12 }}>person</span>
                            {assignee}
                          </span>
                        )}
                        <span className={styles.cardDate} suppressHydrationWarning>{new Date(card.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  );
                })}
                {groupedCards[col.key].length === 0 && (
                  <div className={styles.emptyCol}>
                    <span className="material-symbols-outlined" style={{ fontSize: 24, opacity: 0.3 }}>inbox</span>
                    <p>Drop here</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="New Maintenance Request"
        width="500px"
        footer={
          <>
            <button className={layoutStyles.btnSecondary} onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className={layoutStyles.btnPrimary} onClick={async () => {
              if (!newRequest.assetId || !newRequest.issue) {
                showToast('Asset and Issue are required.', 'error');
                return;
              }
              
              try {
                const res = await fetch('/api/maintenance', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    assetId: newRequest.assetId,
                    requestedBy: 'e1',
                    issue: newRequest.issue,
                    priority: newRequest.priority,
                    status: 'Pending'
                  })
                });

                if (res.ok) {
                  const newMaintenance = await res.json();
                  setMaintenanceRequests(prev => [newMaintenance, ...prev]);
                  addActivityLog(`New maintenance request for ${assets.find(a => a.id === newRequest.assetId)?.name}`, 'Maintenance');
                  showToast('Maintenance request submitted successfully!');
                  setIsModalOpen(false);
                  setNewRequest({ assetId: '', issue: '', priority: 'Medium' });
                } else {
                  showToast('Failed to create maintenance request', 'error');
                }
              } catch (err) {
                console.error(err);
                showToast('An error occurred', 'error');
              }
            }}>Submit Request</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-on-surface)' }}>Asset *</span>
            <select value={newRequest.assetId} onChange={e => setNewRequest({...newRequest, assetId: e.target.value})} style={{ padding: '8px 12px', border: '1px solid var(--color-outline-variant)', borderRadius: 4, background: 'var(--color-surface)' }}>
              <option value="">Select an asset...</option>
              {assets.map(a => <option key={a.id} value={a.id}>{a.tag} - {a.name}</option>)}
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-on-surface)' }}>Issue Description *</span>
            <textarea value={newRequest.issue} onChange={e => setNewRequest({...newRequest, issue: e.target.value})} rows={3} style={{ padding: '8px 12px', border: '1px solid var(--color-outline-variant)', borderRadius: 4, background: 'var(--color-surface)' }} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-on-surface)' }}>Priority</span>
            <select value={newRequest.priority} onChange={e => setNewRequest({...newRequest, priority: e.target.value})} style={{ padding: '8px 12px', border: '1px solid var(--color-outline-variant)', borderRadius: 4, background: 'var(--color-surface)' }}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
        </div>
      </Modal>

    </div>
  );
}
