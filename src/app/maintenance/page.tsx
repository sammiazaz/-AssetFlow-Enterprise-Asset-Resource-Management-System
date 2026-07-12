"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import layoutStyles from '../page.module.css';
import styles from './maintenance.module.css';

type KanbanStatus = 'pending' | 'approved' | 'assigned' | 'inprogress' | 'resolved';

interface MaintenanceCard {
  id: string;
  asset: string;
  assetId: string;
  issue: string;
  assignee?: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

const initialCards: Record<KanbanStatus, MaintenanceCard[]> = {
  pending: [
    { id: 'MC-001', asset: 'Dell Laptop', assetId: 'AF-0114', issue: 'Screen flickering, battery drain', date: '8 Jul', priority: 'high' },
    { id: 'MC-002', asset: 'Office Chair', assetId: 'AF-0021', issue: 'Chair repair — wheels stuck', date: '9 Jul', priority: 'low' },
  ],
  approved: [
    { id: 'MC-003', asset: 'Projector', assetId: 'AF-0062', issue: 'Relay not burning up', date: '6 Jul', priority: 'medium' },
    { id: 'MC-004', asset: 'AC Unit', assetId: 'AF-0088', issue: 'Noisy compressor', date: '7 Jul', priority: 'medium' },
  ],
  assigned: [
    { id: 'MC-005', asset: 'HP Server', assetId: 'AF-0079', issue: 'HDD server down', assignee: 'Rohan Mehta', date: '5 Jul', priority: 'high' },
  ],
  inprogress: [
    { id: 'MC-006', asset: 'Printer', assetId: 'AF-892', issue: 'Paper jam, partly ordered', assignee: 'Jun Sato', date: '4 Jul', priority: 'medium' },
  ],
  resolved: [
    { id: 'MC-007', asset: 'Monitor', assetId: 'AF-875', issue: 'Dead pixel rows — replaced', assignee: 'Aditi Rao', date: '2 Jul', priority: 'low' },
  ],
};

const columns: { key: KanbanStatus; label: string; color: string; bg: string }[] = [
  { key: 'pending', label: 'Pending', color: '#e17055', bg: '#fff3f0' },
  { key: 'approved', label: 'Approved', color: '#2e86de', bg: '#f0f7ff' },
  { key: 'assigned', label: 'Technician Assigned', color: '#6c5ce7', bg: '#f5f3ff' },
  { key: 'inprogress', label: 'In Progress', color: '#e67e22', bg: '#fff8f0' },
  { key: 'resolved', label: 'Resolved', color: '#00b894', bg: '#d4f5ee' },
];

const priorityColor = { high: '#e17055', medium: '#e67e22', low: '#00b894' };

export default function MaintenancePage() {
  const [cards, setCards] = useState(initialCards);
  const [dragCard, setDragCard] = useState<{ card: MaintenanceCard; from: KanbanStatus } | null>(null);

  const handleDragStart = (card: MaintenanceCard, from: KanbanStatus) => {
    setDragCard({ card, from });
  };

  const handleDrop = (to: KanbanStatus) => {
    if (!dragCard || dragCard.from === to) return;
    setCards(prev => {
      const updated = { ...prev };
      updated[dragCard.from] = prev[dragCard.from].filter(c => c.id !== dragCard.card.id);
      updated[to] = [...prev[to], { ...dragCard.card }];
      return updated;
    });
    setDragCard(null);
  };

  const total = Object.values(cards).flat().length;
  const resolved = cards.resolved.length;

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
            <button className={layoutStyles.btnSecondary}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
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
                  {cards[col.key].length}
                </span>
              </div>

              <div className={styles.colCards}>
                {cards[col.key].map((card) => (
                  <div
                    key={card.id}
                    className={styles.card}
                    draggable
                    onDragStart={() => handleDragStart(card, col.key)}
                  >
                    <div className={styles.cardTopRow}>
                      <span className={styles.cardId}>{card.assetId}</span>
                      <span
                        className={styles.priorityDot}
                        style={{ backgroundColor: priorityColor[card.priority] }}
                        title={card.priority}
                      />
                    </div>
                    <p className={styles.cardAsset}>{card.asset}</p>
                    <p className={styles.cardIssue}>{card.issue}</p>
                    <div className={styles.cardFooter}>
                      {card.assignee && (
                        <span className={styles.cardAssignee}>
                          <span className="material-symbols-outlined" style={{ fontSize: 12 }}>person</span>
                          {card.assignee}
                        </span>
                      )}
                      <span className={styles.cardDate}>{card.date}</span>
                    </div>
                  </div>
                ))}
                {cards[col.key].length === 0 && (
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
    </div>
  );
}
