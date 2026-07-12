"use client";

import React, { useState } from 'react';
import layoutStyles from '../page.module.css';
import styles from './org.module.css';
import Link from 'next/link';

export default function OrganizationSetup() {
  const [activeTab, setActiveTab] = useState('departments');

  return (
    <div className={layoutStyles.layout}>
      {/* Persistent SideNavBar */}
      <aside className={layoutStyles.sidebar}>
        <div className={layoutStyles.sidebarHeader}>
          <span className={`${layoutStyles.brandName} headline-sm`}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#54a0ff' }}>grid_view</span>
            AssetFlow
          </span>
        </div>
        
        <nav className={layoutStyles.nav}>
          <Link href="/" className={layoutStyles.navItem}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>dashboard</span>
            <span style={{ fontSize: 13 }}>Dashboard</span>
          </Link>
          <Link href="/organization-setup" className={`${layoutStyles.navItem} ${layoutStyles.navItemActive}`}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
            <span style={{ fontSize: 13 }}>Organization</span>
          </Link>
          <Link href="/assets" className={layoutStyles.navItem}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>inventory_2</span>
            <span style={{ fontSize: 13 }}>Assets</span>
          </Link>
          <a href="#" className={layoutStyles.navItem} onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>move_up</span>
            <span style={{ fontSize: 13 }}>Allocation</span>
          </a>
          <a href="#" className={layoutStyles.navItem} onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>calendar_today</span>
            <span style={{ fontSize: 13 }}>Bookings</span>
          </a>
          <a href="#" className={layoutStyles.navItem} onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>build</span>
            <span style={{ fontSize: 13 }}>Maintenance</span>
          </a>
          <a href="#" className={layoutStyles.navItem} onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>analytics</span>
            <span style={{ fontSize: 13 }}>Reports</span>
          </a>
          <div className={layoutStyles.navDivider} />
          <a href="#" className={layoutStyles.navItem} onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>settings</span>
            <span style={{ fontSize: 13 }}>Settings</span>
          </a>
        </nav>
      </aside>

      {/* TopNavBar */}
      <header className={layoutStyles.topbar}>
        <div className={layoutStyles.searchContainer}>
          <div className={layoutStyles.searchInputWrapper}>
            <input 
              type="text" 
              className={layoutStyles.searchInput} 
              placeholder="Search assets, people, locations..." 
            />
            <span className={`material-symbols-outlined ${layoutStyles.searchIcon}`}>search</span>
          </div>
        </div>
        
        <div className={layoutStyles.topbarActions}>
          <Link href="/assets" className={layoutStyles.quickLink} style={{ textDecoration: 'none' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
            New Asset
          </Link>
          <div className={layoutStyles.dividerVertical}></div>
          <button className={layoutStyles.helpBtn}>
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className={layoutStyles.helpBtn}>
            <span className="material-symbols-outlined">help_outline</span>
          </button>
          <div className={layoutStyles.dividerVertical}></div>
          <div className={layoutStyles.userProfile}>
            <div className={layoutStyles.userAvatar}>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1TUCT6ofiNoGnpP2VdVWgI3ltZnxuWK7zHQFoUJcDXoDItExzQDJebm1BNB2DbHkw4_pM9fk9AO_VzntpjV56193Y0WkMar4K9qeoY4PF_gTIr9FHMlSNFjEbhS9zjURTyU6t9xNZqP00Twern6VKocWScmBRMWOVRQme0OWCriOqt5gl-bZmSMeD_FvoQMn9HyscL5GbvVK0Mou9CtxoAGqr267td_jd6EGn1on-_zlX6oW7MXUk" alt="Profile" />
            </div>
            <div className={layoutStyles.userInfo}>
              <p className={layoutStyles.userName}>Admin User</p>
              <p className={layoutStyles.userRole}>Administrator</p>
            </div>
          </div>
        </div>
      </header>

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
