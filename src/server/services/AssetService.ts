import { prisma } from '@/lib/prisma';

export class AssetService {
  static async getAllAssets() {
    const assets = await prisma.asset.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return assets.map(asset => ({
      ...asset,
      history: JSON.parse(asset.history)
    }));
  }

  static async createAsset(body: any) {
    const historyArray = Array.isArray(body.history) ? body.history : [];
    
    const asset = await prisma.asset.create({
      data: {
        name: body.name,
        tag: body.tag,
        categoryId: body.categoryId,
        status: body.status || 'Available',
        location: body.location || '',
        serialNumber: body.serialNumber || '',
        condition: body.condition || 'Good',
        isSharedBookable: body.isSharedBookable || false,
        assignedTo: body.assignedTo || null,
        departmentId: body.departmentId || null,
        expectedReturnDate: body.expectedReturnDate || null,
        acquisitionDate: body.acquisitionDate || new Date().toISOString().split('T')[0],
        acquisitionCost: typeof body.acquisitionCost === 'number' ? body.acquisitionCost : 0,
        history: JSON.stringify(historyArray),
      },
    });

    return {
      ...asset,
      history: JSON.parse(asset.history)
    };
  }
}
