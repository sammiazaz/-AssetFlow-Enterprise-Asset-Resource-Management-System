import { prisma } from '@/lib/prisma';

export class NotificationService {
  static async getAllNotifications() {
    return prisma.notification.findMany({
      orderBy: { date: 'desc' }
    });
  }

  static async markAsRead(id: string) {
    return prisma.notification.update({
      where: { id },
      data: { read: true }
    });
  }
}
