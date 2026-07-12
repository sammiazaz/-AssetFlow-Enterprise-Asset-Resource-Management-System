import { prisma } from '@/lib/prisma';

export class DashboardService {
  static async getDashboardMetrics() {
    const [
      totalAssets,
      availableAssets,
      allocatedAssets,
      underMaintenanceAssets,
      activeBookings,
      departmentCount,
      employeeCount
    ] = await Promise.all([
      prisma.asset.count(),
      prisma.asset.count({ where: { status: 'Available' } }),
      prisma.asset.count({ where: { status: 'Allocated' } }),
      prisma.asset.count({ where: { status: 'Under Maintenance' } }),
      prisma.booking.count({ where: { status: { in: ['Ongoing', 'Upcoming'] } } }),
      prisma.department.count(),
      prisma.user.count({ where: { role: 'Employee' } })
    ]);

    return {
      totalAssets,
      availableAssets,
      allocatedAssets,
      underMaintenanceAssets,
      activeBookings,
      departmentCount,
      employeeCount
    };
  }
}
