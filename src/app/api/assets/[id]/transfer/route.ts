import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request, context: any) {
  try {
    const params = await context.params;
    const { id } = params;
    const body = await request.json();
    const { toEmployee, notes } = body;
    
    const updatedAsset = await prisma.$transaction(async (tx) => {
      const asset = await tx.asset.findUnique({
        where: { id },
      });
      
      if (!asset) {
        throw new Error('Asset not found');
      }
      
      if (asset.status === 'Available') {
        throw new Error('Asset is not allocated. Please use allocation instead of transfer.');
      }

      const fromEmployee = await tx.user.findUnique({ where: { id: asset.assignedTo! } });
      const toEmployeeRecord = await tx.user.findUnique({ where: { id: toEmployee } });
      
      if (!toEmployeeRecord) {
        throw new Error('Target employee not found');
      }

      const historyArray = JSON.parse(asset.history || '[]');
      const newHistoryEvent = `Transfer requested from ${fromEmployee?.name || 'Unknown'} to ${toEmployeeRecord.name}${notes ? ` - Note: ${notes}` : ''}`;
      
      // Note: A real app might update a separate TransferRequest table.
      // For this hackathon scope, we just append to history and simulate it.
      return tx.asset.update({
        where: { id },
        data: {
          history: JSON.stringify([newHistoryEvent, ...historyArray]),
        },
      });
    });

    return NextResponse.json({
      ...updatedAsset,
      history: JSON.parse(updatedAsset.history)
    });
  } catch (error: any) {
    console.error('Error with transfer request:', error);
    if (error.message.includes('not found') || error.message.includes('not allocated')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
