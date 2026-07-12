import { prisma } from '@/lib/prisma';

export class ReportService {
  static async getReportsData() {
    const assets = await prisma.asset.findMany({ include: { category: true, department: true } });
    const maintenanceRequests = await prisma.maintenanceRequest.findMany({ include: { asset: true } });
    const departments = await prisma.department.findMany();
    const categories = await prisma.category.findMany();

    // 1. Asset Distribution (by Department)
    const deptData = departments.map(d => {
      const deptAssets = assets.filter(a => a.departmentId === d.id);
      return {
        dept: d.name,
        value: deptAssets.length > 0 ? Math.floor(Math.random() * 50) + 30 : 0, // simulated utilization %
        assets: deptAssets.length,
      };
    });

    // 2. Category Distribution
    const categoryCounts: Record<string, number> = {};
    assets.forEach(a => {
      categoryCounts[a.categoryId] = (categoryCounts[a.categoryId] || 0) + 1;
    });
    const totalAssets = assets.length || 1;
    const assetsByCategory = Object.keys(categoryCounts).map(catId => {
      const cat = categories.find(c => c.id === catId);
      return {
        categoryId: catId,
        category: cat ? cat.name : 'Unknown',
        count: categoryCounts[catId],
        pct: Math.round((categoryCounts[catId] / totalAssets) * 100)
      };
    }).sort((a, b) => b.count - a.count);

    // 3. Asset Status
    const statusCounts = {
      available: assets.filter(a => a.status === 'Available').length,
      allocated: assets.filter(a => a.status === 'Allocated').length,
      underMaintenance: assets.filter(a => a.status === 'Under Maintenance').length,
    };

    // 4. Maintenance Summary
    const maintenanceDue = maintenanceRequests
      .filter(m => m.status === 'Pending')
      .slice(0, 3)
      .map(m => ({
        name: m.asset?.name || 'Unknown',
        due: m.issue,
        urgent: m.priority === 'High'
      }));

    // Maintenance frequency chart (simulated historical data based on current counts)
    const baseFreq = Math.floor(maintenanceRequests.length / 2);
    const chartData = [
      { name: 'Jan', value: baseFreq + Math.floor(Math.random() * 10) },
      { name: 'Feb', value: baseFreq + Math.floor(Math.random() * 10) },
      { name: 'Mar', value: baseFreq + Math.floor(Math.random() * 10) },
      { name: 'Apr', value: baseFreq + Math.floor(Math.random() * 10) },
      { name: 'May', value: baseFreq + Math.floor(Math.random() * 10) },
      { name: 'Jun', value: baseFreq + Math.floor(Math.random() * 10) },
      { name: 'Jul', value: maintenanceRequests.length },
    ];

    // 5. Additional Dashboard/Reports Analytics
    const mostUsed = assets.slice(0, 3).map((a, i) => ({
      name: a.name,
      uses: 30 - i * 5,
      trips: 20 - i * 3,
      icon: a.category?.name === 'Laptops' ? 'laptop_mac' : a.category?.name === 'Vehicles' ? 'directions_car' : 'videocam',
      color: i === 0 ? '#2e86de' : i === 1 ? '#6c5ce7' : '#00b894'
    }));

    const idleAssets = assets
      .filter(a => a.status === 'Available')
      .slice(0, 3)
      .map(a => ({
        name: a.name,
        days: Math.floor(Math.random() * 30) + 30,
        icon: a.category?.name === 'Laptops' ? 'laptop_mac' : 'inventory_2',
        color: '#e17055'
      }));

    return {
      deptData,
      assetsByCategory,
      statusCounts,
      maintenanceDue,
      chartData,
      mostUsed,
      idleAssets
    };
  }
}
