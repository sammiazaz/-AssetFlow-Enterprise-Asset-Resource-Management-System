"use client";

import React, { useState } from 'react';
import layoutStyles from '../page.module.css';
import styles from './assets.module.css';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function AssetDirectory() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
              <button className={styles.iconBtn} onClick={() => alert("Download CSV")}>
                <span className="material-symbols-outlined">download</span>
              </button>
              <button className={styles.iconBtn} onClick={() => alert("Print layout")}>
                <span className="material-symbols-outlined">print</span>
              </button>
            </div>
          </div>

          {/* FILTER CHIPS */}
          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>Filter by:</span>
            
            <button 
              className={styles.filterChip} 
              style={{ borderColor: activeFilter === 'category' ? 'var(--color-primary)' : '', color: activeFilter === 'category' ? 'var(--color-primary)' : '' }}
              onClick={() => setActiveFilter('category')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>category</span>
              <span>Category: All</span>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>expand_more</span>
            </button>
            
            <button 
              className={styles.filterChip}
              style={{ borderColor: activeFilter === 'status' ? 'var(--color-primary)' : '', color: activeFilter === 'status' ? 'var(--color-primary)' : '' }}
              onClick={() => setActiveFilter('status')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>info</span>
              <span>Status: Any</span>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>expand_more</span>
            </button>
            
            <button 
              className={styles.filterChip}
              style={{ borderColor: activeFilter === 'department' ? 'var(--color-primary)' : '', color: activeFilter === 'department' ? 'var(--color-primary)' : '' }}
              onClick={() => setActiveFilter('department')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>corporate_fare</span>
              <span>Department: IT</span>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>expand_more</span>
            </button>
            
            <div className={layoutStyles.dividerVertical}></div>
            
            <button className={styles.clearFilters} onClick={() => setActiveFilter(null)}>Clear Filters</button>
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
              {/* Row 1 */}
              <tr className={styles.tr}>
                <td className={styles.td}>
                  <span className={styles.assetTag}>AF-0012</span>
                </td>
                <td className={styles.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className={`${styles.assetIcon} ${styles.iconElectronics}`}>
                      <span className="material-symbols-outlined">laptop_mac</span>
                    </div>
                    <div>
                      <p className="body-md" style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>Dell Latitude 5420</p>
                      <p className="label-md" style={{ color: 'var(--color-outline)', fontWeight: 400 }}>SN: DL-77X-B49</p>
                    </div>
                  </div>
                </td>
                <td className={`${styles.td} body-md`} style={{ color: 'var(--color-on-surface-variant)' }}>Electronics</td>
                <td className={styles.td}>
                  <span className={`${styles.statusBadge} ${styles.statusAllocated}`}>
                    <span className={styles.statusDotAllocated}></span>
                    Allocated
                  </span>
                </td>
                <td className={styles.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-outline)' }}>location_on</span>
                    <span className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>Bengaluru, KA</span>
                  </div>
                </td>
                <td className={styles.td} style={{ textAlign: 'right' }}>
                  <button className={styles.actionBtn}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>more_vert</span>
                  </button>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className={styles.tr}>
                <td className={styles.td}>
                  <span className={styles.assetTag}>AF-0062</span>
                </td>
                <td className={styles.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className={`${styles.assetIcon} ${styles.iconFurniture}`} style={{ backgroundColor: 'rgba(255, 219, 202, 0.3)', color: 'var(--color-tertiary)' }}>
                      <span className="material-symbols-outlined">videocam</span>
                    </div>
                    <div>
                      <p className="body-md" style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>Epson Projector Pro</p>
                      <p className="label-md" style={{ color: 'var(--color-outline)', fontWeight: 400 }}>SN: EP-V9-9001</p>
                    </div>
                  </div>
                </td>
                <td className={`${styles.td} body-md`} style={{ color: 'var(--color-on-surface-variant)' }}>Electronics</td>
                <td className={styles.td}>
                  <span className={`${styles.statusBadge} ${styles.statusMaintenance}`}>
                    <span className={styles.statusDotMaintenance}></span>
                    Maintenance
                  </span>
                </td>
                <td className={styles.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-outline)' }}>layers</span>
                    <span className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>HQ Floor 2</span>
                  </div>
                </td>
                <td className={styles.td} style={{ textAlign: 'right' }}>
                  <button className={styles.actionBtn}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>more_vert</span>
                  </button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className={styles.tr}>
                <td className={styles.td}>
                  <span className={styles.assetTag}>AF-0201</span>
                </td>
                <td className={styles.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className={`${styles.assetIcon} ${styles.iconFurniture}`}>
                      <span className="material-symbols-outlined">chair_alt</span>
                    </div>
                    <div>
                      <p className="body-md" style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>Ergonomic Office Chair</p>
                      <p className="label-md" style={{ color: 'var(--color-outline)', fontWeight: 400 }}>Batch: FRN-2023-A</p>
                    </div>
                  </div>
                </td>
                <td className={`${styles.td} body-md`} style={{ color: 'var(--color-on-surface-variant)' }}>Furniture</td>
                <td className={styles.td}>
                  <span className={`${styles.statusBadge} ${styles.statusAvailable}`}>
                    <span className={styles.statusDotAvailable}></span>
                    Available
                  </span>
                </td>
                <td className={styles.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-outline)' }}>warehouse</span>
                    <span className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>Warehouse A</span>
                  </div>
                </td>
                <td className={styles.td} style={{ textAlign: 'right' }}>
                  <button className={styles.actionBtn}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>more_vert</span>
                  </button>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className={styles.tr}>
                <td className={styles.td}>
                  <span className={styles.assetTag}>AF-0144</span>
                </td>
                <td className={styles.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className={`${styles.assetIcon} ${styles.iconInfrastructure}`}>
                      <span className="material-symbols-outlined">dns</span>
                    </div>
                    <div>
                      <p className="body-md" style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>Server Unit Blade R740</p>
                      <p className="label-md" style={{ color: 'var(--color-outline)', fontWeight: 400 }}>SN: SVR-XYZ-011</p>
                    </div>
                  </div>
                </td>
                <td className={`${styles.td} body-md`} style={{ color: 'var(--color-on-surface-variant)' }}>Infrastructure</td>
                <td className={styles.td}>
                  <span className={`${styles.statusBadge} ${styles.statusAllocated}`}>
                    <span className={styles.statusDotAllocated}></span>
                    Allocated
                  </span>
                </td>
                <td className={styles.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-outline)' }}>dns</span>
                    <span className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>Data Center 1</span>
                  </div>
                </td>
                <td className={styles.td} style={{ textAlign: 'right' }}>
                  <button className={styles.actionBtn}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className={styles.pagination}>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
              Showing <span style={{ fontWeight: 700 }}>4</span> of <span style={{ fontWeight: 700 }}>1,248</span> assets
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
              <button 
                className={`${styles.pageBtn} ${currentPage === 1 ? styles.pageBtnActive : ''}`}
                onClick={() => setCurrentPage(1)}
              >1</button>
              <button 
                className={`${styles.pageBtn} ${currentPage === 2 ? styles.pageBtnActive : ''}`}
                onClick={() => setCurrentPage(2)}
              >2</button>
              <button 
                className={`${styles.pageBtn} ${currentPage === 3 ? styles.pageBtnActive : ''}`}
                onClick={() => setCurrentPage(3)}
              >3</button>
              <span style={{ display: 'flex', alignItems: 'center', padding: '0 4px', color: 'var(--color-outline)' }}>...</span>
              <button 
                className={`${styles.pageBtn} ${currentPage === 42 ? styles.pageBtnActive : ''}`}
                onClick={() => setCurrentPage(42)}
              >42</button>
              <button 
                className={styles.pageBtn}
                disabled={currentPage === 42}
                style={{ opacity: currentPage === 42 ? 0.5 : 1 }}
                onClick={() => setCurrentPage(prev => Math.min(42, prev + 1))}
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
    </div>
  );
}
