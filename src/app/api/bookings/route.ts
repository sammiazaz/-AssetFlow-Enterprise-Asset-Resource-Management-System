import { NextResponse } from 'next/server';
import { BookingService } from '@/server/services/BookingService';

export async function GET() {
  try {
    const bookings = await BookingService.getAllBookings();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const booking = await BookingService.createBooking(body);
    return NextResponse.json(booking, { status: 201 });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    if (error.message === 'This resource is already booked for the selected time slot.') {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
