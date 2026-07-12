export type AssetState = 'Available' | 'Allocated' | 'Reserved' | 'Under Maintenance' | 'Lost' | 'Retired' | 'Disposed';

export interface Asset {
  id: string;
  tag: string;
  name: string;
  categoryId: string;
  status: AssetState;
  departmentId?: string;
  assignedTo?: string; // employee id
  expectedReturnDate?: string;
  location: string;
  serialNumber: string;
  condition: string;
  acquisitionDate: string;
  acquisitionCost: number;
  isSharedBookable: boolean;
  history: any[];
}

export interface Department {
  id: string;
  name: string;
  headId: string; // employee id
  parentId: string | null;
  status: 'Active' | 'Inactive';
}

export interface Category {
  id: string;
  name: string;
  fields: string[]; // e.g., ['Warranty', 'Model']
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  departmentId: string;
  role: 'Admin' | 'Asset Manager' | 'Department Head' | 'Employee';
  status: 'Active' | 'Inactive';
}

export interface Booking {
  id: string;
  assetId: string;
  employeeId: string;
  startTime: string; // ISO 8601
  endTime: string; // ISO 8601
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
}

export interface MaintenanceRequest {
  id: string;
  assetId: string;
  requestedBy: string; // employee id
  issue: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Approved' | 'Rejected' | 'In Progress' | 'Resolved';
  date: string;
}

export interface ActivityLog {
  id: string;
  text: string;
  date: string;
  type: string;
  read?: boolean;
}

export const initialMockDb = {
  departments: [
    { id: 'd1', name: 'Engineering', headId: 'e2', parentId: null, status: 'Active' },
    { id: 'd2', name: 'HR', headId: 'e3', parentId: null, status: 'Active' },
    { id: 'd3', name: 'IT Support', headId: 'e4', parentId: null, status: 'Active' },
  ] as Department[],
  
  categories: [
    { id: 'c1', name: 'IT Equipment', fields: ['Warranty Expiry'] },
    { id: 'c2', name: 'Furniture', fields: ['Material'] },
    { id: 'c3', name: 'Vehicles', fields: ['License Plate'] },
    { id: 'c4', name: 'AV Equipment', fields: ['Resolution'] },
  ] as Category[],

  employees: [
    { id: 'e1', name: 'System Admin', email: 'admin@assetflow.com', departmentId: 'd3', role: 'Admin', status: 'Active' },
    { id: 'e2', name: 'Aditi Rao', email: 'aditi@assetflow.com', departmentId: 'd1', role: 'Department Head', status: 'Active' },
    { id: 'e3', name: 'Rahul Sharma', email: 'rahul@assetflow.com', departmentId: 'd2', role: 'Department Head', status: 'Active' },
    { id: 'e4', name: 'Priya Shah', email: 'priya@assetflow.com', departmentId: 'd3', role: 'Asset Manager', status: 'Active' },
    { id: 'e5', name: 'Raj Kumar', email: 'raj@assetflow.com', departmentId: 'd1', role: 'Employee', status: 'Active' },
  ] as Employee[],

  assets: [
    {
      id: 'a1', tag: 'AF-0114', name: 'MacBook Pro M2', categoryId: 'c1', status: 'Allocated',
      assignedTo: 'e4', departmentId: 'd3', location: 'HQ - Floor 3', serialNumber: 'C02ZG123MD6R', condition: 'Good',
      acquisitionDate: '2023-01-15', acquisitionCost: 2400, isSharedBookable: false, history: []
    },
    {
      id: 'a2', tag: 'AF-0062', name: 'Epson 4K Projector', categoryId: 'c4', status: 'Under Maintenance',
      location: 'HQ - Conf Room B2', serialNumber: 'EPS-9912', condition: 'Needs Repair',
      acquisitionDate: '2022-05-10', acquisitionCost: 850, isSharedBookable: true, history: []
    },
    {
      id: 'a3', tag: 'AF-0120', name: 'Ergonomic Chair', categoryId: 'c2', status: 'Available',
      location: 'HQ - Floor 2', serialNumber: 'HM-1122', condition: 'Excellent',
      acquisitionDate: '2023-11-01', acquisitionCost: 450, isSharedBookable: false, history: []
    },
    {
      id: 'a4', tag: 'AF-0010', name: 'Delivery Van', categoryId: 'c3', status: 'Reserved',
      location: 'Warehouse Parking', serialNumber: 'VIN-9012381203', condition: 'Good',
      acquisitionDate: '2021-08-20', acquisitionCost: 25000, isSharedBookable: true, history: []
    },
    {
      id: 'a5', tag: 'RM-B2', name: 'Conference Room B2', categoryId: 'c2', status: 'Available',
      location: 'HQ - Floor 2', serialNumber: 'ROOM-1', condition: 'Good',
      acquisitionDate: '2015-01-01', acquisitionCost: 0, isSharedBookable: true, history: []
    },
    {
      id: 'a6', tag: 'RM-B3', name: 'Meeting Room B3', categoryId: 'c2', status: 'Available',
      location: 'HQ - Floor 2', serialNumber: 'ROOM-2', condition: 'Good',
      acquisitionDate: '2015-01-01', acquisitionCost: 0, isSharedBookable: true, history: []
    }
  ] as Asset[],

  bookings: [
    { id: 'b1', assetId: 'a2', employeeId: 'e2', startTime: '2026-07-12T14:00:00Z', endTime: '2026-07-12T15:00:00Z', status: 'Upcoming' }
  ] as Booking[],

  maintenanceRequests: [
    { id: 'm1', assetId: 'a2', requestedBy: 'e4', issue: 'Bulb burned out', priority: 'High', status: 'In Progress', date: '2026-07-11T10:00:00Z' }
  ] as MaintenanceRequest[],

  activityLogs: [
    { id: 'log1', text: 'Laptop AF-0114 - allocated to Priya Shah - IT dept', date: '2026-07-10T09:00:00Z', type: 'Allocation', read: true },
    { id: 'log2', text: 'Room B2 - booking confirmed - 2:00 to 3:00 PM', date: '2026-07-11T14:00:00Z', type: 'Booking', read: true },
    { id: 'log3', text: 'Projector AF-0062 - maintenance resolved', date: '2026-07-11T16:00:00Z', type: 'Maintenance', read: false },
  ] as ActivityLog[]
};
