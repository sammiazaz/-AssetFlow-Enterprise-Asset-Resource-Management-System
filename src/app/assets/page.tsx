"use client";

import React, { useState, useEffect } from 'react';
import layoutStyles from '@/app/dashboard/dashboard.module.css';
import styles from './assets.module.css';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import { useToast } from '@/context/ToastContext';
import StatusBadge from '@/components/ui/StatusBadge';
import Modal from '@/components/ui/Modal';
import Drawer from '@/components/ui/Drawer';
import { Asset } from '@prisma/client';

type UIAsset = Omit<Asset, 'history'> & { history: string[] };

export default function AssetDirectory() {
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [assets, setAssets] = useState<UIAsset[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/assets').then(res => res.json()),
      fetch('/api/categories').then(res => res.json()),
      fetch('/api/departments').then(res => res.json())
    ]).then(([a, c, d]) => {
      if (Array.isArray(a)) setAssets(a);
      if (Array.isArray(c)) setCategories(c);
      if (Array.isArray(d)) setDepartments(d);
    });
  }, []);
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: '', tag: '', categoryId: '', location: '', serialNumber: '', condition: 'Good', isSharedBookable: false });
  const [selectedAsset, setSelectedAsset] = useState<UIAsset | null>(null);

  const filteredAssets = React.useMemo(() => {
    return assets.filter(a => {
      if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.tag.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterCategory && a.categoryId !== filterCategory) return false;
      if (filterStatus && a.status !== filterStatus) return false;
      return true;
    });
  }, [assets, search, filterCategory, filterStatus]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const paginatedAssets = filteredAssets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterCategory, filterStatus]);

  return (
    <div className={layoutStyles.layout}>
      <Sidebar />
      <Topbar />

      {/* Main Content Area */}
      <main className={layoutStyles.mainContent}>
        
        {/* HEADER & FILTER SECTION */}
        <section className={styles.headerSection}>
          <div className={styles.headerTop}>
            <div>
            <h1 className={layoutStyles.pageTitle}>Asset Directory</h1>
              <p className={layoutStyles.pageSubtitle}>Manage and track organization-wide resources across all locations.</p>
            </div>
            <div className={styles.headerActions}>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: 10, top: 10, fontSize: 18, color: 'var(--color-outline)' }}>search</span>
                <input 
                  type="text" 
                  placeholder="Search assets..." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    padding: '8px 12px 8px 36px', borderRadius: '4px', border: '1px solid var(--color-outline-variant)',
                    backgroundColor: 'var(--color-surface)', color: 'var(--color-on-surface)', width: '250px'
                  }}
                />
              </div>
              <button className={styles.iconBtn} onClick={() => alert("Download CSV")} title="Download CSV">
                <span className="material-symbols-outlined">download</span>
              </button>
              <button 
                className={layoutStyles.btnPrimary} 
                onClick={() => setIsModalOpen(true)}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
                Register Asset
              </button>
            </div>
          </div>

          {/* FILTER CHIPS */}
          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>Filter by:</span>
            
            <select 
              className={styles.filterChip} 
              style={{ borderColor: filterCategory ? 'var(--color-primary)' : '' }}
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
            >
              <option value="">Category: All</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            
            <select 
              className={styles.filterChip}
              style={{ borderColor: filterStatus ? 'var(--color-primary)' : '' }}
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">Status: Any</option>
              <option value="Available">Available</option>
              <option value="Allocated">Allocated</option>
              <option value="Under Maintenance">Maintenance</option>
            </select>
            
            <div className={layoutStyles.dividerVertical}></div>
            
            <button className={styles.clearFilters} onClick={() => { setFilterCategory(''); setFilterStatus(''); setSearch(''); }}>Clear Filters</button>
          </div>
        </section>

        {/* DATA TABLE SECTION */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Tag</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Category</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Location</th>
                <th className={styles.th} style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAssets.map(asset => {
                const category = categories.find(c => c.id === asset.categoryId);
                
                return (
                  <tr key={asset.id} className={styles.tr}>
                    <td className={styles.td}>
                      <span className={styles.assetTag}>{asset.tag}</span>
                    </td>
                    <td className={styles.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className={`${styles.assetIcon} ${styles.iconElectronics}`}>
                          <span className="material-symbols-outlined">
                            {asset.categoryId === 'c1' ? 'laptop_mac' : asset.categoryId === 'c2' ? 'chair' : asset.categoryId === 'c3' ? 'directions_car' : 'videocam'}
                          </span>
                        </div>
                        <div>
                          <p className="body-md" style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>{asset.name}</p>
                          <p className="label-md" style={{ color: 'var(--color-outline)', fontWeight: 400 }}>SN: {asset.serialNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.td} body-md`} style={{ color: 'var(--color-on-surface-variant)' }}>{category?.name || '-'}</td>
                    <td className={styles.td}>
                      <StatusBadge status={asset.status} />
                    </td>
                    <td className={styles.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-outline)' }}>location_on</span>
                        <span className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>{asset.location}</span>
                      </div>
                    </td>
                    <td className={styles.td} style={{ textAlign: 'right' }}>
                      <button className={styles.actionBtn} onClick={() => setSelectedAsset(asset)} title="View Details">
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>info</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className={styles.pagination}>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
              Showing <span style={{ fontWeight: 700 }}>{paginatedAssets.length}</span> of <span style={{ fontWeight: 700 }}>{filteredAssets.length}</span> assets
            </p>
            <div className={styles.pageControls}>
              <button 
                className={styles.pageBtn} 
                disabled={currentPage === 1} 
                style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
              </button>
              
              {/* Dynamic Page Buttons */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Logic to show a window of pages around currentPage
                let pageNum = i + 1;
                if (totalPages > 5) {
                   if (currentPage > 3) {
                      pageNum = currentPage - 2 + i;
                      if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                   }
                }
                if (pageNum > totalPages) return null;
                
                return (
                  <button 
                    key={pageNum}
                    className={`${styles.pageBtn} ${currentPage === pageNum ? styles.pageBtnActive : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span style={{ display: 'flex', alignItems: 'center', padding: '0 4px', color: 'var(--color-outline)' }}>...</span>
              )}
              
              <button 
                className={styles.pageBtn}
                disabled={currentPage >= totalPages || totalPages === 0}
                style={{ opacity: (currentPage >= totalPages || totalPages === 0) ? 0.5 : 1 }}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* ASYMMETRIC BENTO GRID FOOTER */}
        <div className={styles.footerGrid}>
          {/* Stat Card 1 */}
          <div className={styles.statCard}>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <p className="body-md" style={{ fontWeight: 600, opacity: 0.8, marginBottom: 8 }}>Recently Registered</p>
              <h3 className="display-kpi" style={{ marginBottom: 16 }}>124</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.2)', width: 'fit-content', padding: '4px 12px', borderRadius: 99, fontSize: 12 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>trending_up</span>
                <span>+12% this month</span>
              </div>
            </div>
            <span className="material-symbols-outlined" style={{ position: 'absolute', right: -16, bottom: -16, fontSize: 120, opacity: 0.1, transform: 'rotate(12deg)' }}>
              inventory_2
            </span>
          </div>

          {/* Featured Asset Highlight */}
          <div className={styles.highlightCard}>
            <img className={styles.featuredImage} src="https://lh3.googleusercontent.com/aida-public/AB6AXuD68A5M_xiVNqYzlKmNEzv5670-D0nihFVDk4acrO3eHVw5j3DC1_7MLhiti3C4ZuMPmfgrc2THBmAn787ljEGkamas88sUHHALw0OY0ejM6drPhNR-26fi1Gbr5asYRq4GwGX8-kguKF21y1ebdIhGbAervbz28fXZqED54o0bBB1N2DAwaZNcVfgtBxVLtZ1kh3vA1g01ghQ9BdrhlEuq651DLuB9HMH7AT-Qe2pzGlT-KlUYTX_i" alt="Dell Precision" />
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ padding: '2px 8px', backgroundColor: 'var(--color-tertiary-fixed)', color: 'var(--color-on-tertiary-fixed)', borderRadius: 4, fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>Asset of the Week</span>
                <span style={{ color: 'var(--color-outline)', fontSize: 12 }}>• High Maintenance Score</span>
              </div>
              
              <h4 className="headline-sm" style={{ color: 'var(--color-on-surface)' }}>Dell Precision Workstation</h4>
              <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: 4, marginBottom: 16 }}>Exceptional performance reported for design and development tasks across the Bangalore engineering hub.</p>
              
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 10, color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700 }}>Reliability</p>
                  <p style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>98.4%</p>
                </div>
                <div style={{ width: 1, height: 32, backgroundColor: 'var(--color-outline-variant)', opacity: 0.5 }}></div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 10, color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700 }}>Active Units</p>
                  <p style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>42</p>
                </div>
              </div>
            </div>
            
            <button style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--color-secondary)', color: 'var(--color-on-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(70, 72, 212, 0.3)' }}>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

      </main>

      {/* FLOATING ACTION BUTTON */}
      <button className={styles.fab}>
        <span className="material-symbols-outlined" style={{ fontSize: 28 }}>add</span>
      </button>

      {/* Register Asset Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Register New Asset"
        width="600px"
        footer={
          <>
            <button className={layoutStyles.btnSecondary} onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className={layoutStyles.btnPrimary} onClick={async () => {
              if (!newAsset.name || !newAsset.tag) {
                showToast('Name and Tag are required.', 'error');
                return;
              }
              const res = await fetch('/api/assets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  ...newAsset,
                  status: 'Available',
                  acquisitionDate: new Date().toISOString().split('T')[0],
                  acquisitionCost: 0,
                  history: []
                })
              });
              if (res.ok) {
                const createdAsset = await res.json();
                setAssets(prev => [createdAsset, ...prev]);
                showToast('Asset registered successfully!');
                setIsModalOpen(false);
                setNewAsset({ name: '', tag: '', categoryId: '', location: '', serialNumber: '', condition: 'Good', isSharedBookable: false });
              } else {
                const errorData = await res.json().catch(() => ({}));
                console.error("Asset registration error:", errorData);
                showToast(`Failed to register asset. ${errorData.details || errorData.error || 'Ensure tag is unique.'}`, 'error');
              }
            }}>Register Asset</button>
          </>
        }
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-on-surface)' }}>Asset Name *</span>
            <input type="text" value={newAsset.name} onChange={e => setNewAsset({...newAsset, name: e.target.value})} style={{ padding: '8px 12px', border: '1px solid var(--color-outline-variant)', borderRadius: 4, background: 'var(--color-surface)', color: 'var(--color-on-surface)' }} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-on-surface)' }}>Asset Tag *</span>
            <input type="text" value={newAsset.tag} onChange={e => setNewAsset({...newAsset, tag: e.target.value})} style={{ padding: '8px 12px', border: '1px solid var(--color-outline-variant)', borderRadius: 4, background: 'var(--color-surface)', color: 'var(--color-on-surface)' }} placeholder="e.g. AF-1023" />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-on-surface)' }}>Category</span>
            <select value={newAsset.categoryId} onChange={e => setNewAsset({...newAsset, categoryId: e.target.value})} style={{ padding: '8px 12px', border: '1px solid var(--color-outline-variant)', borderRadius: 4, background: 'var(--color-surface)', color: 'var(--color-on-surface)' }}>
              <option value="">Select category...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-on-surface)' }}>Serial Number</span>
            <input type="text" value={newAsset.serialNumber} onChange={e => setNewAsset({...newAsset, serialNumber: e.target.value})} style={{ padding: '8px 12px', border: '1px solid var(--color-outline-variant)', borderRadius: 4, background: 'var(--color-surface)', color: 'var(--color-on-surface)' }} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, gridColumn: 'span 2' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-on-surface)' }}>Location</span>
            <input type="text" value={newAsset.location} onChange={e => setNewAsset({...newAsset, location: e.target.value})} style={{ padding: '8px 12px', border: '1px solid var(--color-outline-variant)', borderRadius: 4, background: 'var(--color-surface)', color: 'var(--color-on-surface)' }} />
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, gridColumn: 'span 2', marginTop: 8 }}>
            <input type="checkbox" checked={newAsset.isSharedBookable} onChange={e => setNewAsset({...newAsset, isSharedBookable: e.target.checked})} />
            <span style={{ fontSize: 14, color: 'var(--color-on-surface)' }}>Mark as Shared Bookable Resource</span>
          </label>
        </div>
      </Modal>

      {/* Asset Details Drawer */}
      <Drawer
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        title="Asset Details"
      >
        {selectedAsset && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <p style={{ fontSize: 12, color: 'var(--color-outline)' }}>Tag</p>
              <p style={{ fontSize: 18, fontWeight: 600 }}>{selectedAsset.tag}</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <p style={{ fontSize: 12, color: 'var(--color-outline)' }}>Name</p>
                <p style={{ fontWeight: 500 }}>{selectedAsset.name}</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: 'var(--color-outline)' }}>Serial Number</p>
                <p style={{ fontWeight: 500 }}>{selectedAsset.serialNumber}</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: 'var(--color-outline)' }}>Status</p>
                <div style={{ marginTop: 4 }}><StatusBadge status={selectedAsset.status} /></div>
              </div>
              <div>
                <p style={{ fontSize: 12, color: 'var(--color-outline)' }}>Condition</p>
                <p style={{ fontWeight: 500 }}>{selectedAsset.condition}</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: 'var(--color-outline)' }}>Location</p>
                <p style={{ fontWeight: 500 }}>{selectedAsset.location}</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: 'var(--color-outline)' }}>Shared Bookable</p>
                <p style={{ fontWeight: 500 }}>{selectedAsset.isSharedBookable ? 'Yes' : 'No'}</p>
              </div>
            </div>

            <hr style={{ borderTop: '1px solid var(--color-outline-variant)', borderBottom: 'none' }} />

            <div>
              <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>History</p>
              {selectedAsset.history?.length === 0 ? (
                <p style={{ fontSize: 13, color: 'var(--color-outline)' }}>No history available for this asset.</p>
              ) : (
                <ul style={{ paddingLeft: 20, fontSize: 13, color: 'var(--color-on-surface-variant)' }}>
                  {selectedAsset.history.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              )}
            </div>
          </div>
        )}
      </Drawer>

    </div>
  );
}
