import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request, context: any) {
  try {
    const params = await context.params;
    const { id } = params;
    
    const updatedAsset = await prisma.$transaction(async (tx) => {
      const asset = await tx.asset.findUnique({
        where: { id },
      });
      
      if (!asset) {
        throw new Error('Asset not found');
      }
      
      if (asset.status === 'Available') {
        throw new Error('Asset is already returned/available.');
      }

      const historyArray = JSON.parse(asset.history || '[]');
      const newHistoryEvent = `Returned to inventory`;
      
      return tx.asset.update({
        where: { id },
        data: {
          status: 'Available',
          assignedTo: null,
          departmentId: null,
          expectedReturnDate: null,
          history: JSON.stringify([newHistoryEvent, ...historyArray]),
        },
      });
    });

    return NextResponse.json({
      ...updatedAsset,
      history: JSON.parse(updatedAsset.history)
    });
  } catch (error: any) {
    console.error('Error returning asset:', error);
    if (error.message.includes('not found') || error.message.includes('already returned')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
