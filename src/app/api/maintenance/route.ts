import { NextResponse } from 'next/server';
import { MaintenanceService } from '@/server/services/MaintenanceService';

export async function GET() {
  try {
    const requests = await MaintenanceService.getAllMaintenanceRequests();
    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching maintenance requests:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const maintenanceReq = await MaintenanceService.createMaintenanceRequest(body);
    return NextResponse.json(maintenanceReq, { status: 201 });
  } catch (error: any) {
    console.error('Error creating maintenance request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
