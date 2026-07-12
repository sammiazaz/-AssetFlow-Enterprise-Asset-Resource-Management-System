import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Clean existing database records
  await prisma.asset.deleteMany({});
  await prisma.department.updateMany({ data: { headId: null } });
  await prisma.user.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.category.deleteMany({});

  // 2. Create Categories
  const categoriesData = [
    { id: 'c1', name: 'IT Equipment', fields: JSON.stringify(['Warranty Expiry']) },
    { id: 'c2', name: 'Furniture', fields: JSON.stringify(['Material']) },
    { id: 'c3', name: 'Vehicles', fields: JSON.stringify(['License Plate']) },
    { id: 'c4', name: 'AV Equipment', fields: JSON.stringify(['Resolution']) },
  ];

  for (const cat of categoriesData) {
    await prisma.category.create({ data: cat });
  }

  // 3. Create Departments (without headId to avoid foreign key cycle during initial insert)
  const departmentsData = [
    { id: 'd1', name: 'Engineering', parentId: null, status: 'Active' },
    { id: 'd2', name: 'HR', parentId: null, status: 'Active' },
    { id: 'd3', name: 'IT Support', parentId: null, status: 'Active' },
  ];

  for (const dept of departmentsData) {
    await prisma.department.create({ data: dept });
  }

  // 4. Create Users (Employees) with hashed passwords
  const defaultPasswordHash = await bcrypt.hash('password123', 10);

  const usersData = [
    { id: 'e1', name: 'System Admin', email: 'admin@assetflow.com', role: 'Admin', status: 'Active', departmentId: 'd3', password: defaultPasswordHash },
    { id: 'e2', name: 'Aditi Rao', email: 'aditi@assetflow.com', role: 'Department Head', status: 'Active', departmentId: 'd1', password: defaultPasswordHash },
    { id: 'e3', name: 'Rahul Sharma', email: 'rahul@assetflow.com', role: 'Department Head', status: 'Active', departmentId: 'd2', password: defaultPasswordHash },
    { id: 'e4', name: 'Priya Shah', email: 'priya@assetflow.com', role: 'Asset Manager', status: 'Active', departmentId: 'd3', password: defaultPasswordHash },
    { id: 'e5', name: 'Raj Kumar', email: 'raj@assetflow.com', role: 'Employee', status: 'Active', departmentId: 'd1', password: defaultPasswordHash },
  ];

  for (const user of usersData) {
    await prisma.user.create({ data: user });
  }

  // 5. Update Department heads now that users exist
  await prisma.department.update({
    where: { id: 'd1' },
    data: { headId: 'e2' },
  });
  await prisma.department.update({
    where: { id: 'd2' },
    data: { headId: 'e3' },
  });
  await prisma.department.update({
    where: { id: 'd3' },
    data: { headId: 'e4' },
  });

  // 6. Create Assets
  const assetsData = [
    {
      id: 'a1', tag: 'AF-0114', name: 'MacBook Pro M2', categoryId: 'c1', status: 'Allocated',
      assignedTo: 'e4', departmentId: 'd3', location: 'HQ - Floor 3', serialNumber: 'C02ZG123MD6R', condition: 'Good',
      acquisitionDate: '2023-01-15', acquisitionCost: 2400.0, isSharedBookable: false, history: JSON.stringify([])
    },
    {
      id: 'a2', tag: 'AF-0062', name: 'Epson 4K Projector', categoryId: 'c4', status: 'Under Maintenance',
      location: 'HQ - Conf Room B2', serialNumber: 'EPS-9912', condition: 'Needs Repair',
      acquisitionDate: '2022-05-10', acquisitionCost: 850.0, isSharedBookable: true, history: JSON.stringify([])
    },
    {
      id: 'a3', tag: 'AF-0120', name: 'Ergonomic Chair', categoryId: 'c2', status: 'Available',
      location: 'HQ - Floor 2', serialNumber: 'HM-1122', condition: 'Excellent',
      acquisitionDate: '2023-11-01', acquisitionCost: 450.0, isSharedBookable: false, history: JSON.stringify([])
    },
    {
      id: 'a4', tag: 'AF-0010', name: 'Delivery Van', categoryId: 'c3', status: 'Reserved',
      location: 'Warehouse Parking', serialNumber: 'VIN-9012381203', condition: 'Good',
      acquisitionDate: '2021-08-20', acquisitionCost: 25000.0, isSharedBookable: true, history: JSON.stringify([])
    },
    {
      id: 'a5', tag: 'RM-B2', name: 'Conference Room B2', categoryId: 'c2', status: 'Available',
      location: 'HQ - Floor 2', serialNumber: 'ROOM-1', condition: 'Good',
      acquisitionDate: '2015-01-01', acquisitionCost: 0.0, isSharedBookable: true, history: JSON.stringify([])
    },
    {
      id: 'a6', tag: 'RM-B3', name: 'Meeting Room B3', categoryId: 'c2', status: 'Available',
      location: 'HQ - Floor 2', serialNumber: 'ROOM-2', condition: 'Good',
      acquisitionDate: '2015-01-01', acquisitionCost: 0.0, isSharedBookable: true, history: JSON.stringify([])
    }
  ];

  for (const asset of assetsData) {
    await prisma.asset.create({ data: asset });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
