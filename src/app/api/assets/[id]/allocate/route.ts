import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request, context: any) {
  try {
    const params = await context.params;
    const { id } = params;
    const body = await request.json();
    const { toEmployee, expectedReturnDate, notes } = body;
    
    // Prevent double allocation inside a transaction
    const updatedAsset = await prisma.$transaction(async (tx) => {
      const asset = await tx.asset.findUnique({
        where: { id },
      });
      
      if (!asset) {
        throw new Error('Asset not found');
      }
      
      if (asset.status !== 'Available') {
        throw new Error('Asset is already allocated or unavailable');
      }

      // Fetch employee to get department and name for history
      const employee = await tx.user.findUnique({
        where: { id: toEmployee },
      });
      
      if (!employee) {
        throw new Error('Employee not found');
      }

      const historyArray = JSON.parse(asset.history || '[]');
      const newHistoryEvent = `Allocated to ${employee.name}${notes ? ` - Note: ${notes}` : ''}`;
      
      return tx.asset.update({
        where: { id },
        data: {
          status: 'Allocated',
          assignedTo: toEmployee,
          departmentId: employee.departmentId,
          expectedReturnDate: expectedReturnDate || null,
          history: JSON.stringify([newHistoryEvent, ...historyArray]),
        },
      });
    });

    return NextResponse.json({
      ...updatedAsset,
      history: JSON.parse(updatedAsset.history)
    });
  } catch (error: any) {
    console.error('Error allocating asset:', error);
    if (error.message === 'Asset is already allocated or unavailable' || error.message === 'Asset not found' || error.message === 'Employee not found') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
