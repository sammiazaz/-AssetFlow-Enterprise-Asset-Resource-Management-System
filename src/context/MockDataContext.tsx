"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { initialMockDb, Asset, Department, Employee, Category, Booking, MaintenanceRequest, ActivityLog } from '@/lib/mockDb';

interface MockDataContextType {
  assets: Asset[];
  departments: Department[];
  employees: Employee[];
  categories: Category[];
  bookings: Booking[];
  maintenanceRequests: MaintenanceRequest[];
  activityLogs: ActivityLog[];
  
  // Setters for fake CRUD
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  setMaintenanceRequests: React.Dispatch<React.SetStateAction<MaintenanceRequest[]>>;
  setActivityLogs: React.Dispatch<React.SetStateAction<ActivityLog[]>>;
  
  // Helpers
  addActivityLog: (text: string, type: string) => void;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export function MockDataProvider({ children }: { children: ReactNode }) {
  const [assets, setAssets] = useState<Asset[]>(initialMockDb.assets);
  const [departments, setDepartments] = useState<Department[]>(initialMockDb.departments);
  const [employees, setEmployees] = useState<Employee[]>(initialMockDb.employees);
  const [categories, setCategories] = useState<Category[]>(initialMockDb.categories);
  const [bookings, setBookings] = useState<Booking[]>(initialMockDb.bookings);
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>(initialMockDb.maintenanceRequests);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(initialMockDb.activityLogs);

  const addActivityLog = (text: string, type: string) => {
    const newLog: ActivityLog = {
      id: 'log' + Date.now(),
      text,
      type,
      date: new Date().toISOString(),
      read: false
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  return (
    <MockDataContext.Provider value={{
      assets, setAssets,
      departments, setDepartments,
      employees, setEmployees,
      categories, setCategories,
      bookings, setBookings,
      maintenanceRequests, setMaintenanceRequests,
      activityLogs, setActivityLogs,
      addActivityLog
    }}>
      {children}
    </MockDataContext.Provider>
  );
}

export function useMockData() {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
}
