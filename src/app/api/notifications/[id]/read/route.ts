import { NextResponse } from 'next/server';
import { NotificationService } from '@/server/services/NotificationService';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const notification = await NotificationService.markAsRead(id);
    return NextResponse.json(notification);
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
    return NextResponse.json({ error: 'Failed to mark as read' }, { status: 500 });
  }
}
