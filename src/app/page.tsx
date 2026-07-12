"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Dashboard() {
  const [activeQuickLink, setActiveQuickLink] = useState<string | null>(null);

  return (
    <div className={styles.layout}>
      {/* Persistent SideNavBar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={`${styles.brandName} headline-sm`}>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>grid_view</span>
            AssetFlow
          </h1>
          <p className={`${styles.brandSubtitle} label-md`}>Management System</p>
        </div>
        
        <nav className={styles.nav}>
          {/* Dashboard (Active) */}
          <Link href="/" className={`${styles.navItem} ${styles.navItemActive}`}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            <span className="body-md">Dashboard</span>
          </Link>
          
          {/* Inactive Items */}
          <Link href="/organization-setup" className={styles.navItem}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>corporate_fare</span>
            <span className="body-md">Organization Setup</span>
          </Link>
          <Link href="/assets" className={styles.navItem}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>inventory_2</span>
            <span className="body-md">Assets</span>
          </Link>
          <a href="#" className={styles.navItem} onClick={(e) => { e.preventDefault(); alert("Allocation module coming soon!") }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>move_up</span>
            <span className="body-md">Allocation & Transfer</span>
          </a>
          <a href="#" className={styles.navItem} onClick={(e) => { e.preventDefault(); alert("Booking module coming soon!") }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>calendar_today</span>
            <span className="body-md">Resource Booking</span>
          </a>
          <a href="#" className={styles.navItem} onClick={(e) => { e.preventDefault(); alert("Maintenance module coming soon!") }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>build</span>
            <span className="body-md">Maintenance</span>
          </a>
          <a href="#" className={styles.navItem} onClick={(e) => { e.preventDefault(); alert("Audit module coming soon!") }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>fact_check</span>
            <span className="body-md">Audit</span>
          </a>
          <a href="#" className={styles.navItem} onClick={(e) => { e.preventDefault(); alert("Reports module coming soon!") }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>analytics</span>
            <span className="body-md">Reports</span>
          </a>
          <a href="#" className={styles.navItem} onClick={(e) => { e.preventDefault(); alert("Notifications module coming soon!") }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>notifications</span>
            <span className="body-md">Notifications</span>
          </a>
        </nav>
      </aside>

      {/* TopNavBar */}
      <header className={styles.topbar}>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <input 
              type="text" 
              className={`${styles.searchInput} body-md`} 
              placeholder="Search by tag, serial, or QR code..." 
            />
            <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
            <button className={styles.searchBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
            </button>
          </div>
        </div>
        
        <div className={styles.topbarActions}>
          <Link href="/assets" className={`${styles.quickLink} label-md`} style={{ textDecoration: 'none' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, marginRight: 8 }}>add</span>
            Register Asset
          </Link>
          
          <div className={styles.dividerVertical}></div>
          
          <button className={styles.helpBtn} onClick={() => alert("Help opened")}>
            <span className="material-symbols-outlined">help</span>
          </button>
          <button className={styles.helpBtn} onClick={() => alert("Settings opened")}>
            <span className="material-symbols-outlined">settings</span>
          </button>
          
          <div className={styles.userProfile} style={{ padding: 0, borderRadius: 'var(--radius-full)' }} onClick={() => alert("Profile opened")}>
            <div className={styles.userAvatar}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1TUCT6ofiNoGnpP2VdVWgI3ltZnxuWK7zHQFoUJcDXoDItExzQDJebm1BNB2DbHkw4_pM9fk9AO_VzntpjV56193Y0WkMar4K9qeoY4PF_gTIr9FHMlSNFjEbhS9zjURTyU6t9xNZqP00Twern6VKocWScmBRMWOVRQme0OWCriOqt5gl-bZmSMeD_FvoQMn9HyscL5GbvVK0Mou9CtxoAGqr267td_jd6EGn1on-_zlX6oW7MXUk" alt="Profile" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className={styles.mainContent}>
        {/* Header Section */}
        <div className={styles.pageHeader}>
          <div>
            <h2 className={`${styles.pageTitle} headline-lg`}>Today&apos;s Overview</h2>
            <p className={`${styles.pageSubtitle} body-lg`}>Real-time status of your physical and digital resources.</p>
          </div>
          <div className={styles.headerActions}>
            <Link href="/assets" className={`${styles.btnPrimary} label-md`} style={{ textDecoration: 'none' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
              Register Asset
            </Link>
            <button className={`${styles.btnSecondary} label-md`} onClick={() => alert('Book Resource workflow opened')}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>calendar_today</span>
              Book Resource
            </button>
            <button className={`${styles.btnSecondary} label-md`} onClick={() => alert('Raise Request workflow opened')}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>send</span>
              Raise Requests
            </button>
          </div>
        </div>

        {/* Alert Banner */}
        <div className={styles.alertBanner}>
          <span className={`material-symbols-outlined ${styles.alertIcon}`}>warning</span>
          <span className="body-md" style={{ fontWeight: 600 }}>3 assets overdue for return — flagged for follow-up</span>
          <button className={styles.alertAction}>TAKE ACTION</button>
        </div>

        {/* KPI Grid (Bento Style) */}
        <div className={styles.kpiGrid}>
          {/* Available */}
          <div className={styles.kpiCard}>
            <div className={styles.kpiCardHeader}>
              <div className={styles.kpiIconWrapper} style={{ backgroundColor: 'var(--color-secondary-fixed)' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-on-secondary-fixed-variant)', fontSize: 20 }}>check_circle</span>
              </div>
              <span className={styles.kpiLabel}>ASSETS</span>
            </div>
            <div>
              <p className={`${styles.kpiValue} display-kpi`}>128</p>
              <p className={`${styles.kpiTitle} label-md`}>Available</p>
            </div>
          </div>

          {/* Allocated */}
          <div className={styles.kpiCard}>
            <div className={styles.kpiCardHeader}>
              <div className={styles.kpiIconWrapper} style={{ backgroundColor: 'var(--color-primary-fixed)' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-on-primary-fixed-variant)', fontSize: 20 }}>person</span>
              </div>
              <span className={styles.kpiLabel}>USAGE</span>
            </div>
            <div>
              <p className="display-kpi" style={{ color: 'var(--color-on-surface)' }}>76</p>
              <p className={`${styles.kpiTitle} label-md`}>Allocated</p>
            </div>
          </div>

          {/* Available Resources */}
          <div className={styles.kpiCard}>
            <div className={styles.kpiCardHeader}>
              <div className={styles.kpiIconWrapper} style={{ backgroundColor: 'var(--color-tertiary-fixed)' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-on-tertiary-fixed-variant)', fontSize: 20 }}>meeting_room</span>
              </div>
              <span className={styles.kpiLabel}>RESOURCES</span>
            </div>
            <div>
              <p className="display-kpi" style={{ color: 'var(--color-tertiary)' }}>9</p>
              <p className={`${styles.kpiTitle} label-md`}>Available Resources</p>
            </div>
          </div>

          {/* Active Bookings */}
          <div className={styles.kpiCard}>
            <div className={styles.kpiCardHeader}>
              <div className={styles.kpiIconWrapper} style={{ backgroundColor: 'var(--color-surface-container)' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-on-surface-variant)', fontSize: 20 }}>schedule</span>
              </div>
              <span className={styles.kpiLabel}>LIVE</span>
            </div>
            <div>
              <p className="display-kpi" style={{ color: 'var(--color-on-surface)' }}>9</p>
              <p className={`${styles.kpiTitle} label-md`}>Active Bookings</p>
            </div>
          </div>

          {/* Pending Transfers */}
          <div className={styles.kpiCard}>
            <div className={styles.kpiCardHeader}>
              <div className={styles.kpiIconWrapper} style={{ backgroundColor: 'var(--color-secondary-fixed)' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-on-secondary-fixed-variant)', fontSize: 20 }}>sync</span>
              </div>
              <span className={styles.kpiLabel}>TRANSFERS</span>
            </div>
            <div>
              <p className="display-kpi" style={{ color: 'var(--color-secondary)' }}>3</p>
              <p className={`${styles.kpiTitle} label-md`}>Pending Transfers</p>
            </div>
          </div>

          {/* Upcoming Returns */}
          <div className={styles.kpiCard}>
            <div className={styles.kpiCardHeader}>
              <div className={styles.kpiIconWrapper} style={{ backgroundColor: 'var(--color-primary-fixed)' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-on-primary-fixed-variant)', fontSize: 20 }}>keyboard_return</span>
              </div>
              <span className={styles.kpiLabel}>UPCOMING</span>
            </div>
            <div>
              <p className={`${styles.kpiValue} display-kpi`}>12</p>
              <p className={`${styles.kpiTitle} label-md`}>Upcoming Returns</p>
            </div>
          </div>
        </div>

        {/* Dashboard Widgets */}
        <div className={styles.widgetsGrid}>
          {/* Activity Widget */}
          <div className={styles.activityWidget}>
            <div className={styles.widgetHeader}>
              <h3 className={`${styles.widgetTitle} headline-sm`}>Recent Activity</h3>
              <button className={`${styles.viewAllBtn} label-md`}>View All</button>
            </div>
            <div className={styles.activityList}>
              {/* Activity Item 1 */}
              <div className={styles.activityItem}>
                <div className={styles.activityIconWrapper} style={{ backgroundColor: 'var(--color-primary-fixed)' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: 20 }}>laptop_mac</span>
                </div>
                <div className={styles.activityContent}>
                  <p className={`${styles.activityText} body-md`}>Laptop <strong>AF-0114</strong> allocated to <strong>Priya Shah</strong></p>
                  <p className={styles.activityTime}>2 minutes ago • IT Department</p>
                </div>
                <div className={`${styles.statusBadge} ${styles.statusSuccess}`}>SUCCESS</div>
              </div>
              
              {/* Activity Item 2 */}
              <div className={styles.activityItem}>
                <div className={styles.activityIconWrapper} style={{ backgroundColor: 'var(--color-tertiary-fixed)' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-tertiary)', fontSize: 20 }}>meeting_room</span>
                </div>
                <div className={styles.activityContent}>
                  <p className={`${styles.activityText} body-md`}>Room <strong>B2</strong> booking confirmed</p>
                  <p className={styles.activityTime}>15 minutes ago • Conference Center</p>
                </div>
                <div className={`${styles.statusBadge} ${styles.statusSuccess}`}>BOOKED</div>
              </div>

              {/* Activity Item 3 */}
              <div className={styles.activityItem}>
                <div className={styles.activityIconWrapper} style={{ backgroundColor: 'var(--color-secondary-fixed)' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-secondary)', fontSize: 20 }}>build</span>
                </div>
                <div className={styles.activityContent}>
                  <p className={`${styles.activityText} body-md`}>Projector <strong>AF-0062</strong> maintenance resolved</p>
                  <p className={styles.activityTime}>1 hour ago • Facilities Team</p>
                </div>
                <div className={`${styles.statusBadge} ${styles.statusResolved}`}>RESOLVED</div>
              </div>
            </div>
          </div>

          {/* Visualization Widget */}
          <div className={styles.visualizationWidget}>
            <div className={styles.visBgPattern}></div>
            <div style={{ zIndex: 1 }}>
              <h4 className="headline-sm" style={{ marginBottom: 8 }}>Asset Health</h4>
              <p className={styles.visSubtitle}>Aggregate system efficiency and uptime report.</p>
              
              <div className={styles.visStats}>
                <div className={styles.visHeader}>
                  <span className={styles.visLabel}>Utilization</span>
                  <span className={styles.visValue}>92%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill}></div>
                </div>
                <p className={styles.visFooter}>+4.2% from last month</p>
              </div>
            </div>
            
            <div className={styles.visBottom}>
              <div className={styles.visStatus}>
                <div className={styles.visStatusIcon}>
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <p className="label-md" style={{ lineHeight: 1 }}>Optimal Performance</p>
                  <p className={styles.visStatusDesc}>Status: Stable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
