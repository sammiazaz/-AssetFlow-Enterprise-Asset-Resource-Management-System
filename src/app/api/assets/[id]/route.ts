import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, context: any) {
  try {
    const params = await context.params;
    const { id } = params;
    const body = await request.json();
    
    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.tag !== undefined) updateData.tag = body.tag;
    if (body.categoryId !== undefined) updateData.categoryId = body.categoryId;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.location !== undefined) updateData.location = body.location;
    if (body.serialNumber !== undefined) updateData.serialNumber = body.serialNumber;
    if (body.condition !== undefined) updateData.condition = body.condition;
    if (body.isSharedBookable !== undefined) updateData.isSharedBookable = body.isSharedBookable;
    if (body.assignedTo !== undefined) updateData.assignedTo = body.assignedTo;
    if (body.departmentId !== undefined) updateData.departmentId = body.departmentId;
    if (body.expectedReturnDate !== undefined) updateData.expectedReturnDate = body.expectedReturnDate;
    if (body.acquisitionDate !== undefined) updateData.acquisitionDate = body.acquisitionDate;
    if (body.acquisitionCost !== undefined) updateData.acquisitionCost = body.acquisitionCost;
    if (body.history !== undefined) updateData.history = JSON.stringify(body.history);

    const asset = await prisma.asset.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      ...asset,
      history: JSON.parse(asset.history)
    });
  } catch (error) {
    console.error('Error updating asset:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const params = await context.params;
    const { id } = params;
    
    await prisma.asset.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting asset:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
