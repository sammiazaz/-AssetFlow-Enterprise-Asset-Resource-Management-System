"use client";

import React, { useState } from 'react';
import layoutStyles from '../page.module.css';
import styles from './org.module.css';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function OrganizationSetup() {
  const [activeTab, setActiveTab] = useState('departments');

  return (
    <div className={layoutStyles.layout}>
      <Sidebar />
      <Topbar />

      {/* Main Content Area */}
      <main className={layoutStyles.mainContent}>
        
        <div className={styles.pageHeader}>
          <div>
            <h2 className={`${styles.pageTitle} headline-lg`}>Organization Setup</h2>
            <p className={`${styles.pageSubtitle} body-md`}>Manage departments, categories, and system-wide hierarchies.</p>
          </div>
        </div>

        {/* Custom Tabs */}
        <div className={styles.tabContainer} style={{ alignItems: 'center' }}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'departments' ? styles.tabBtnActive : ''} label-md`}
            onClick={() => setActiveTab('departments')}
          >
            Departments
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'categories' ? styles.tabBtnActive : ''} label-md`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'employees' ? styles.tabBtnActive : ''} label-md`}
            onClick={() => setActiveTab('employees')}
          >
            Employee Roles
          </button>
          
          <button 
            className={`${styles.btnPrimary} label-md`} 
            style={{ marginLeft: 'auto' }}
            onClick={() => alert(`Creating new ${activeTab.slice(0, -1)}`)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
            New {activeTab === 'departments' ? 'Department' : activeTab === 'categories' ? 'Category' : 'Employee'}
          </button>
        </div>

        {/* Content Section */}
        <div className={styles.contentGrid}>
          {/* Main Table */}
          <div className={styles.tableCard}>
            
            {activeTab === 'departments' ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Department</th>
                    <th className={styles.th}>Head</th>
                    <th className={styles.th}>Parent Dept</th>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th} style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1 */}
                  <tr className={styles.tr}>
                    <td className={styles.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className={`${styles.deptIcon} ${styles.deptIconE}`}>E</div>
                        <div>
                          <p className="body-md" style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>Engineering</p>
                          <p className="label-md" style={{ color: 'var(--color-on-surface-variant)', opacity: 0.8 }}>248 Personnel</p>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.td} body-md`} style={{ fontWeight: 500, color: 'var(--color-on-surface)' }}>Aditi Rao</td>
                    <td className={`${styles.td} body-md`} style={{ color: 'var(--color-on-surface-variant)' }}>-</td>
                    <td className={styles.td}>
                      <span className={styles.badgeActive}>Active</span>
                    </td>
                    <td className={styles.td} style={{ textAlign: 'right' }}>
                      <button className={styles.actionBtn}>
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>edit</span>
                      </button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className={styles.tr}>
                    <td className={styles.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className={`${styles.deptIcon} ${styles.deptIconF}`}>F</div>
                        <div>
                          <p className="body-md" style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>Facilities</p>
                          <p className="label-md" style={{ color: 'var(--color-on-surface-variant)', opacity: 0.8 }}>32 Personnel</p>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.td} body-md`} style={{ fontWeight: 500, color: 'var(--color-on-surface)' }}>Rohan Mehta</td>
                    <td className={`${styles.td} body-md`} style={{ color: 'var(--color-on-surface-variant)' }}>-</td>
                    <td className={styles.td}>
                      <span className={styles.badgeActive}>Active</span>
                    </td>
                    <td className={styles.td} style={{ textAlign: 'right' }}>
                      <button className={styles.actionBtn}>
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>edit</span>
                      </button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className={styles.tr}>
                    <td className={styles.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className={`${styles.deptIcon} ${styles.deptIconFO}`}>FO</div>
                        <div>
                          <p className="body-md" style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>Field Ops (East)</p>
                          <p className="label-md" style={{ color: 'var(--color-on-surface-variant)', opacity: 0.8 }}>86 Personnel</p>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.td} body-md`} style={{ fontWeight: 500, color: 'var(--color-on-surface)' }}>Sana Iqbal</td>
                    <td className={styles.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-on-surface-variant)' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>subdirectory_arrow_right</span>
                        <span className="body-md">Field Ops</span>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.badgeInactive}>Inactive</span>
                    </td>
                    <td className={styles.td} style={{ textAlign: 'right' }}>
                      <button className={styles.actionBtn}>
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>edit</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-outline)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 48, marginBottom: 16 }}>construction</span>
                <p className="body-md">The {activeTab} section is currently under construction.</p>
              </div>
            )}
          </div>


        </div>
      </main>
    </div>
  );
}
