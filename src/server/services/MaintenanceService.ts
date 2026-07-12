import { prisma } from '@/lib/prisma';

export class MaintenanceService {
  static async getAllMaintenanceRequests() {
    return prisma.maintenanceRequest.findMany({
      orderBy: { date: 'desc' }
    });
  }

  static async createMaintenanceRequest(body: any) {
    const { assetId, requestedBy, issue, priority, status } = body;

    return prisma.maintenanceRequest.create({
      data: {
        assetId,
        requestedBy,
        issue,
        priority: priority || 'Medium',
        status: status || 'Pending',
      },
    });
  }
}
