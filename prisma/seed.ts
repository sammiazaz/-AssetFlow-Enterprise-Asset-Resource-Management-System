import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

const getRandomName = () => `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomCost = (min: number, max: number) => parseFloat((Math.random() * (max - min) + min).toFixed(2));
const randomTag = (prefix: string) => `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

async function main() {
  console.log('Start seeding...');

  // 1. Clean existing database records
  await prisma.notification.deleteMany({});
  await prisma.maintenanceRequest.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.asset.deleteMany({});
  await prisma.department.updateMany({ data: { headId: null } });
  await prisma.user.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.category.deleteMany({});

  // 2. Create 8 Categories
  const categoryNames = [
    { name: 'Laptops', fields: ['RAM', 'Storage', 'Processor'] },
    { name: 'Monitors', fields: ['Resolution', 'Refresh Rate'] },
    { name: 'Mobile Devices', fields: ['OS', 'IMEI'] },
    { name: 'Furniture', fields: ['Material', 'Ergonomic'] },
    { name: 'Vehicles', fields: ['License Plate', 'Mileage'] },
    { name: 'Networking', fields: ['Ports', 'Speed'] },
    { name: 'AV Equipment', fields: ['Resolution', 'Lumens'] },
    { name: 'Software Licenses', fields: ['Key', 'Expiry Date'] }
  ];

  const categories = [];
  for (const cat of categoryNames) {
    const created = await prisma.category.create({
      data: { name: cat.name, fields: JSON.stringify(cat.fields) }
    });
    categories.push(created);
  }

  // 3. Create 5 Departments
  const departmentNames = ['Engineering', 'Human Resources', 'Operations', 'Finance', 'IT Support'];
  const departments = [];
  for (const name of departmentNames) {
    const created = await prisma.department.create({
      data: { name, parentId: null, status: 'Active' }
    });
    departments.push(created);
  }

  // 4. Create Users (1 Admin, 2 Asset Mgrs, 2 Dept Heads, 20 Employees)
  const defaultPasswordHash = await bcrypt.hash('password123', 10);
  const users = [];

  // Admin
  users.push(await prisma.user.create({
    data: { name: 'System Admin', email: 'admin@assetflow.com', role: 'Admin', status: 'Active', departmentId: departments[4].id, password: defaultPasswordHash }
  }));

  // Asset Managers
  for (let i = 0; i < 2; i++) {
    const name = getRandomName();
    users.push(await prisma.user.create({
      data: { name, email: `am${i + 1}@assetflow.com`, role: 'Asset Manager', status: 'Active', departmentId: departments[4].id, password: defaultPasswordHash }
    }));
  }

  // Department Heads
  for (let i = 0; i < 2; i++) {
    const name = getRandomName();
    users.push(await prisma.user.create({
      data: { name, email: `dh${i + 1}@assetflow.com`, role: 'Department Head', status: 'Active', departmentId: departments[i].id, password: defaultPasswordHash }
    }));
    await prisma.department.update({ where: { id: departments[i].id }, data: { headId: users[users.length - 1].id } });
  }

  // 20 Employees
  const employees = [];
  for (let i = 0; i < 20; i++) {
    const name = getRandomName();
    const dept = getRandomElement(departments);
    const emp = await prisma.user.create({
      data: { name, email: `emp${i + 1}@assetflow.com`, role: 'Employee', status: 'Active', departmentId: dept.id, password: defaultPasswordHash }
    });
    users.push(emp);
    employees.push(emp);
  }

  // 5. Create 40 Assets
  const assets = [];
  const assetTemplates: Record<string, string[]> = {
    'Laptops': ['MacBook Pro M2', 'Dell XPS 15', 'Lenovo ThinkPad X1', 'HP EliteBook 840'],
    'Monitors': ['Dell UltraSharp 27', 'LG 34-inch Ultrawide', 'BenQ Designer 32'],
    'Mobile Devices': ['iPhone 14 Pro', 'Samsung Galaxy S23', 'iPad Pro 11-inch'],
    'Furniture': ['Herman Miller Aeron', 'Steelcase Leap', 'Standing Desk'],
    'Vehicles': ['Ford Transit Van', 'Toyota Prius Hybrid'],
    'Networking': ['Cisco Meraki MR46', 'Ubiquiti UniFi AP', 'Netgear ProSafe Switch'],
    'AV Equipment': ['Epson 4K Projector', 'Logitech MeetUp Video Bar', 'Shure Wireless Mic'],
    'Software Licenses': ['Adobe Creative Cloud', 'AutoCAD 2024', 'JetBrains All Products']
  };

  const sharedCategories = ['Vehicles', 'AV Equipment'];

  for (let i = 0; i < 40; i++) {
    const cat = getRandomElement(categories);
    const names = assetTemplates[cat.name] || ['Generic Asset'];
    const name = getRandomElement(names);
    const isSharedBookable = sharedCategories.includes(cat.name);
    
    const asset = await prisma.asset.create({
      data: {
        tag: randomTag('AF'),
        name,
        categoryId: cat.id,
        status: 'Available',
        location: `HQ - Floor ${Math.floor(Math.random() * 5) + 1}`,
        serialNumber: `SN-${Math.floor(Math.random() * 1000000)}`,
        condition: 'Good',
        acquisitionDate: new Date(Date.now() - Math.random() * 100000000000).toISOString().split('T')[0],
        acquisitionCost: randomCost(100, 5000),
        isSharedBookable,
        history: JSON.stringify([])
      }
    });
    assets.push(asset);
  }

  // 6. 15 Allocations (Pick 15 non-shared assets)
  const nonSharedAssets = assets.filter(a => !a.isSharedBookable);
  for (let i = 0; i < 15 && i < nonSharedAssets.length; i++) {
    const asset = nonSharedAssets[i];
    const employee = getRandomElement(employees);
    
    const h = {
      date: new Date().toISOString(),
      action: 'Allocated',
      user: 'System Admin',
      details: `Allocated to ${employee.name}`
    };

    await prisma.asset.update({
      where: { id: asset.id },
      data: {
        status: 'Allocated',
        assignedTo: employee.id,
        departmentId: employee.departmentId,
        history: JSON.stringify([h])
      }
    });
  }

  // 7. 12 Bookings (Pick shared assets)
  const sharedAssets = assets.filter(a => a.isSharedBookable);
  if (sharedAssets.length > 0) {
    for (let i = 0; i < 12; i++) {
      const asset = getRandomElement(sharedAssets);
      const employee = getRandomElement(employees);
      const isPast = Math.random() > 0.5;
      
      const startTime = new Date();
      if (isPast) {
        startTime.setDate(startTime.getDate() - Math.floor(Math.random() * 10));
      } else {
        startTime.setDate(startTime.getDate() + Math.floor(Math.random() * 10));
      }
      startTime.setHours(10 + Math.floor(Math.random() * 6), 0, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 1 + Math.floor(Math.random() * 3));

      let status = 'Upcoming';
      if (isPast) status = 'Completed';
      else if (Math.random() > 0.8) status = 'Ongoing';

      await prisma.booking.create({
        data: {
          assetId: asset.id,
          employeeId: employee.id,
          startTime,
          endTime,
          status
        }
      });
    }
  }

  // 8. 10 Maintenance Requests
  for (let i = 0; i < 10; i++) {
    const asset = getRandomElement(assets);
    const requester = getRandomElement(employees);
    const statuses = ['Pending', 'Approved', 'In Progress', 'Resolved'];
    const status = getRandomElement(statuses);
    
    await prisma.maintenanceRequest.create({
      data: {
        assetId: asset.id,
        requestedBy: requester.id,
        issue: 'Routine maintenance check / reported issue',
        priority: getRandomElement(['Low', 'Medium', 'High']),
        status,
        date: new Date(Date.now() - Math.random() * 10000000000)
      }
    });

    if (status === 'Approved' || status === 'In Progress') {
      await prisma.asset.update({
        where: { id: asset.id },
        data: { status: 'Under Maintenance' }
      });
    }
  }

  // 9. Generate Demo Notifications
  const notificationTypes = ['Allocation', 'Booking', 'Maintenance', 'Alert'];
  for (let i = 0; i < 15; i++) {
    const type = getRandomElement(notificationTypes);
    const read = Math.random() > 0.6; // 60% unread
    
    let text = 'System alert notification.';
    if (type === 'Allocation') text = `Laptop allocated to ${getRandomElement(employees).name}`;
    else if (type === 'Booking') text = `New resource booking created by ${getRandomElement(employees).name}`;
    else if (type === 'Maintenance') text = `Maintenance completed for ${getRandomElement(assets).name}`;
    
    await prisma.notification.create({
      data: {
        type,
        text,
        date: new Date(Date.now() - Math.random() * 100000000), // Random recent time
        read
      }
    });
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
