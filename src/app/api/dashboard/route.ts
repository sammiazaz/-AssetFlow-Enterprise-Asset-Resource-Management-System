import { NextResponse } from 'next/server';
import { DashboardService } from '@/server/services/DashboardService';

export async function GET() {
  try {
    const metrics = await DashboardService.getDashboardMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
