import { NextResponse } from 'next/server';
import { ReportService } from '@/server/services/ReportService';

export async function GET() {
  try {
    const data = await ReportService.getReportsData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch reports data:', error);
    return NextResponse.json({ error: 'Failed to fetch reports data' }, { status: 500 });
  }
}
