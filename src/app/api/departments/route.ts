import { NextResponse } from 'next/server';
import { DepartmentService } from '@/server/services/DepartmentService';

export async function GET() {
  try {
    const departments = await DepartmentService.getAllDepartments();
    return NextResponse.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const department = await DepartmentService.createDepartment(body);
    return NextResponse.json(department, { status: 201 });
  } catch (error) {
    console.error('Error creating department:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
