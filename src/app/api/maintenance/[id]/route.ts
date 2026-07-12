import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, context: any) {
  try {
    const params = await context.params;
    const { id } = params;
    const body = await request.json();
    
    const updatedReq = await prisma.$transaction(async (tx) => {
      const maintenanceReq = await tx.maintenanceRequest.findUnique({
        where: { id },
      });

      if (!maintenanceReq) {
        throw new Error('Maintenance request not found');
      }

      const updateData: any = {};
      if (body.status !== undefined) updateData.status = body.status;
      if (body.priority !== undefined) updateData.priority = body.priority;
      if (body.issue !== undefined) updateData.issue = body.issue;

      const newReq = await tx.maintenanceRequest.update({
        where: { id },
        data: updateData,
      });

      // Automated asset workflow
      if (body.status && body.status !== maintenanceReq.status) {
        const asset = await tx.asset.findUnique({ where: { id: maintenanceReq.assetId } });
        if (asset) {
          const historyArray = JSON.parse(asset.history || '[]');
          
          if ((body.status === 'Approved' || body.status === 'In Progress') && asset.status !== 'Under Maintenance') {
            await tx.asset.update({
              where: { id: asset.id },
              data: {
                status: 'Under Maintenance',
                history: JSON.stringify([`Under maintenance: ${newReq.issue}`, ...historyArray])
              }
            });
          } else if (body.status === 'Resolved' && asset.status === 'Under Maintenance') {
            await tx.asset.update({
              where: { id: asset.id },
              data: {
                status: 'Available',
                history: JSON.stringify([`Maintenance resolved: ${newReq.issue}`, ...historyArray])
              }
            });
          }
        }
      }

      return newReq;
    });

    return NextResponse.json(updatedReq);
  } catch (error: any) {
    console.error('Error updating maintenance request:', error);
    if (error.message === 'Maintenance request not found') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const params = await context.params;
    const { id } = params;
    
    await prisma.maintenanceRequest.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting maintenance request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
