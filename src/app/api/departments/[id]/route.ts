import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, context: any) {
  // context.params is a Promise in Next.js 15+ App Router, 
  // but in older versions it is an object. We'll await it to be safe for modern Next.js.
  try {
    const params = await context.params;
    const { id } = params;
    const body = await request.json();
    
    const department = await prisma.department.update({
      where: { id },
      data: {
        name: body.name !== undefined ? body.name : undefined,
        headId: body.headId !== undefined ? body.headId : undefined,
        parentId: body.parentId !== undefined ? body.parentId : undefined,
        status: body.status !== undefined ? body.status : undefined,
      },
    });

    return NextResponse.json(department);
  } catch (error) {
    console.error('Error updating department:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const params = await context.params;
    const { id } = params;
    
    await prisma.department.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting department:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
