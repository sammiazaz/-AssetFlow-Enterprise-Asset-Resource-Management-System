import { NextResponse } from 'next/server';
import { EmployeeService } from '@/server/services/EmployeeService';

export async function GET() {
  try {
    const safeEmployees = await EmployeeService.getAllEmployees();
    return NextResponse.json(safeEmployees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const safeEmployee = await EmployeeService.createEmployee(body);
    return NextResponse.json(safeEmployee, { status: 201 });
  } catch (error: any) {
    console.error('Error creating employee:', error);
    if (error.message === 'Email already exists') {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
