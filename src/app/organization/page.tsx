"use client";

import React, { useState, useEffect } from 'react';
import layoutStyles from '@/app/dashboard/dashboard.module.css';
import styles from './org.module.css';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import { useToast } from '@/context/ToastContext';
import StatusBadge from '@/components/ui/StatusBadge';
import Modal from '@/components/ui/Modal';

export default function OrganizationSetup() {
  const [activeTab, setActiveTab] = useState('departments');
  const [search, setSearch] = useState('');
  
  const [departments, setDepartments] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/departments').then(res => res.json()),
      fetch('/api/categories').then(res => res.json()),
      fetch('/api/employees').then(res => res.json())
    ]).then(([d, c, e]) => {
      if (Array.isArray(d)) setDepartments(d);
      if (Array.isArray(c)) setCategories(c);
      if (Array.isArray(e)) setEmployees(e);
    });
  }, []);

  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', detail: '' });

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
          <div>
             <input 
               type="text" 
               placeholder="Search..." 
               value={search}
               onChange={e => setSearch(e.target.value)}
               style={{
                 padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--color-outline-variant)',
                 backgroundColor: 'var(--color-surface)', color: 'var(--color-on-surface)'
               }}
             />
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
            onClick={() => {
              setFormData({ name: '', detail: '' });
              setIsModalOpen(true);
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
            New {activeTab === 'departments' ? 'Department' : activeTab === 'categories' ? 'Category' : 'Employee'}
          </button>
        </div>

        {/* Content Section */}
        <div className={styles.contentGrid}>
          {/* Main Table */}
          <div className={styles.tableCard}>
            
            {activeTab === 'departments' && (
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
                  {departments.filter(d => d.name.toLowerCase().includes(search.toLowerCase())).map(dept => {
                    const head = employees.find(e => e.id === dept.headId);
                    const parent = departments.find(d => d.id === dept.parentId);
                    
                    return (
                      <tr key={dept.id} className={styles.tr}>
                        <td className={styles.td}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div className={`${styles.deptIcon} ${styles.deptIconE}`}>{dept.name.substring(0, 1)}</div>
                            <div>
                              <p className="body-md" style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>{dept.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className={`${styles.td} body-md`} style={{ fontWeight: 500, color: 'var(--color-on-surface)' }}>{head?.name || '-'}</td>
                        <td className={`${styles.td} body-md`} style={{ color: 'var(--color-on-surface-variant)' }}>{parent?.name || '-'}</td>
                        <td className={styles.td}>
                          <StatusBadge status={dept.status} />
                        </td>
                        <td className={styles.td} style={{ textAlign: 'right' }}>
                          <button className={styles.actionBtn}>
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>edit</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {activeTab === 'categories' && (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Category Name</th>
                    <th className={styles.th}>Custom Fields</th>
                    <th className={styles.th} style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(cat => (
                    <tr key={cat.id} className={styles.tr}>
                      <td className={styles.td}>
                        <p className="body-md" style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>{cat.name}</p>
                      </td>
                      <td className={`${styles.td} body-md`} style={{ color: 'var(--color-on-surface-variant)' }}>{cat.fields.join(', ')}</td>
                      <td className={styles.td} style={{ textAlign: 'right' }}>
                        <button className={styles.actionBtn}>
                          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'employees' && (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Employee Name</th>
                    <th className={styles.th}>Email</th>
                    <th className={styles.th}>Department</th>
                    <th className={styles.th}>Role</th>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th} style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase())).map(emp => {
                    const dept = departments.find(d => d.id === emp.departmentId);
                    return (
                      <tr key={emp.id} className={styles.tr}>
                        <td className={styles.td}>
                          <p className="body-md" style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>{emp.name}</p>
                        </td>
                        <td className={`${styles.td} body-md`} style={{ color: 'var(--color-on-surface-variant)' }}>{emp.email}</td>
                        <td className={`${styles.td} body-md`} style={{ color: 'var(--color-on-surface-variant)' }}>{dept?.name || '-'}</td>
                        <td className={`${styles.td} body-md`} style={{ color: 'var(--color-on-surface-variant)' }}>{emp.role}</td>
                        <td className={styles.td}>
                          <StatusBadge status={emp.status} />
                        </td>
                        <td className={styles.td} style={{ textAlign: 'right' }}>
                          <button className={styles.actionBtn} onClick={async () => {
                             const newRole = emp.role === 'Employee' ? 'Asset Manager' : 'Employee';
                             const res = await fetch(`/api/employees/${emp.id}`, {
                               method: 'PUT',
                               headers: { 'Content-Type': 'application/json' },
                               body: JSON.stringify({ role: newRole })
                             });
                             if (res.ok) {
                               const updatedEmp = await res.json();
                               setEmployees(prev => prev.map(e => e.id === emp.id ? updatedEmp : e));
                               showToast(`${emp.name} role changed to ${newRole}`);
                             }
                          }} title="Toggle Role">
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>admin_panel_settings</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`New ${activeTab === 'departments' ? 'Department' : activeTab === 'categories' ? 'Category' : 'Employee'}`}
        footer={
          <>
            <button className={styles.btnSecondary} onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className={styles.btnPrimary} onClick={async () => {
               if (activeTab === 'departments') {
                 const res = await fetch('/api/departments', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({ name: formData.name, headId: null, parentId: null, status: 'Active' })
                 });
                 if (res.ok) {
                   const newDept = await res.json();
                   setDepartments(prev => [...prev, newDept]);
                   showToast('Department created successfully!');
                 }
               } else if (activeTab === 'categories') {
                 const res = await fetch('/api/categories', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({ name: formData.name, fields: formData.detail.split(',').map(f => f.trim()) })
                 });
                 if (res.ok) {
                   const newCat = await res.json();
                   setCategories(prev => [...prev, newCat]);
                   showToast('Category created successfully!');
                 }
               } else {
                 const res = await fetch('/api/employees', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({ name: formData.name, email: formData.detail, departmentId: null, role: 'Employee', status: 'Active' })
                 });
                 if (res.ok) {
                   const newEmp = await res.json();
                   setEmployees(prev => [...prev, newEmp]);
                   showToast('Employee created successfully!');
                 } else {
                   showToast('Failed to create employee (Email might exist).');
                 }
               }
               setIsModalOpen(false);
            }}>Save</button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
           <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
             <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-on-surface)' }}>Name</span>
             <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '8px 12px', border: '1px solid var(--color-outline)', borderRadius: 4, background: 'var(--color-surface)', color: 'var(--color-on-surface)' }} />
           </label>
           
           <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
             <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-on-surface)' }}>
               {activeTab === 'categories' ? 'Custom Fields (comma separated)' : activeTab === 'employees' ? 'Email Address' : 'Description'}
             </span>
             <input type="text" value={formData.detail} onChange={e => setFormData({...formData, detail: e.target.value})} style={{ padding: '8px 12px', border: '1px solid var(--color-outline)', borderRadius: 4, background: 'var(--color-surface)', color: 'var(--color-on-surface)' }} />
           </label>
        </div>
      </Modal>
    </div>
  );
}
