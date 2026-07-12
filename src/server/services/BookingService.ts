import { prisma } from '@/lib/prisma';

export class BookingService {
  static async getAllBookings() {
    return prisma.booking.findMany({
      orderBy: { startTime: 'asc' }
    });
  }

  static async createBooking(body: any) {
    const { assetId, employeeId, startTime, endTime, status } = body;

    // Convert strings to Date objects for comparison
    const newStart = new Date(startTime);
    const newEnd = new Date(endTime);

    // Validate double booking (overlap validation)
    const overlappingBookings = await prisma.booking.findMany({
      where: {
        assetId,
        status: { notIn: ['Cancelled', 'Completed'] },
        AND: [
          { startTime: { lt: newEnd } },
          { endTime: { gt: newStart } }
        ]
      }
    });

    if (overlappingBookings.length > 0) {
      throw new Error('This resource is already booked for the selected time slot.');
    }

    return prisma.booking.create({
      data: {
        assetId,
        employeeId,
        startTime: newStart,
        endTime: newEnd,
        status: status || 'Upcoming'
      },
    });
  }
}
