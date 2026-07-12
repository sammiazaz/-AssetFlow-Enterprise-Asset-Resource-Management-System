"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import layoutStyles from '../page.module.css';
import styles from './bookings.module.css';

const rooms = [
  { id: 'B2', name: 'Conference Room B2', capacity: 12, floor: '2nd Floor', amenities: ['Projector', 'Whiteboard', 'Video Conf'] },
  { id: 'B3', name: 'Meeting Room B3', capacity: 6, floor: '2nd Floor', amenities: ['TV Screen', 'Whiteboard'] },
  { id: 'T1', name: 'Training Hall T1', capacity: 40, floor: 'Ground Floor', amenities: ['Projector', 'Sound System'] },
];

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

// Mock booking data: slot => status
const mockBookings: Record<string, Record<string, string>> = {
  B2: {
    '09:00': 'booked',
    '10:00': 'booked',
    '12:00': 'conflict',
    '15:00': 'booked',
  },
  B3: {
    '10:00': 'booked',
    '14:00': 'booked',
  },
  T1: {
    '09:00': 'booked',
    '13:00': 'conflict',
  },
};

const today = new Date();
const formatDate = (d: Date) => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

const days = Array.from({ length: 5 }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() + i);
  return d;
});

export default function BookingsPage() {
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const roomBookings = mockBookings[selectedRoom.id] || {};

  const handleBook = () => {
    if (selectedSlot) setBooked(true);
  };

  return (
    <div className={layoutStyles.layout}>
      <Sidebar />
      <Topbar />
      <main className={layoutStyles.mainContent}>
        <div className={layoutStyles.pageHeader}>
          <div>
            <h1 className={layoutStyles.pageTitle}>Resource Booking</h1>
            <p className={layoutStyles.pageSubtitle}>Book conference rooms and shared spaces</p>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Room Selector */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Select Room</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {rooms.map((room) => (
                <button
                  key={room.id}
                  className={`${styles.roomItem} ${selectedRoom.id === room.id ? styles.roomItemActive : ''}`}
                  onClick={() => { setSelectedRoom(room); setSelectedSlot(null); setBooked(false); }}
                >
                  <div className={styles.roomIcon}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#2e86de', fontVariationSettings: "'FILL' 1" }}>meeting_room</span>
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#1e2a3a' }}>{room.name}</p>
                    <p style={{ fontSize: 11, color: '#888', marginTop: 2 }}>Capacity: {room.capacity} · {room.floor}</p>
                  </div>
                </button>
              ))}
            </div>

            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--color-outline-variant)' }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 8 }}>AMENITIES</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {selectedRoom.amenities.map(a => (
                  <span key={a} className={styles.amenityTag}>{a}</span>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--color-outline-variant)' }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 8 }}>LEGEND</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { color: '#d4f5ee', border: '#00b894', label: 'Available' },
                  { color: '#ffeaa7', border: '#e67e22', label: 'Booked' },
                  { color: '#ffd5cf', border: '#e17055', label: 'Conflict' },
                  { color: '#ddeeff', border: '#2e86de', label: 'Selected' },
                ].map(l => (
                  <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 4, background: l.color, border: `1.5px solid ${l.border}` }} />
                    <span style={{ fontSize: 12, color: '#555' }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Time Slot Calendar */}
          <div className={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 className={styles.cardTitle} style={{ marginBottom: 0 }}>{selectedRoom.name}</h2>
            </div>

            {/* Day Picker */}
            <div className={styles.dayPicker}>
              {days.map((d, i) => (
                <button
                  key={i}
                  className={`${styles.dayBtn} ${selectedDay === i ? styles.dayBtnActive : ''}`}
                  onClick={() => { setSelectedDay(i); setSelectedSlot(null); setBooked(false); }}
                >
                  <span style={{ fontSize: 11, opacity: 0.8 }}>{d.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{d.getDate()}</span>
                </button>
              ))}
            </div>

            {/* Time Slots */}
            <div className={styles.slotsGrid}>
              {timeSlots.map((slot) => {
                const status = roomBookings[slot];
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    disabled={status === 'booked' || status === 'conflict'}
                    className={`${styles.slot} ${
                      isSelected ? styles.slotSelected :
                      status === 'booked' ? styles.slotBooked :
                      status === 'conflict' ? styles.slotConflict :
                      styles.slotAvailable
                    }`}
                    onClick={() => !status && setSelectedSlot(slot)}
                  >
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{slot}</span>
                    <span style={{ fontSize: 10, marginTop: 2, opacity: 0.8 }}>
                      {status === 'booked' ? 'Booked' : status === 'conflict' ? 'Conflict' : isSelected ? 'Selected' : 'Free'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Book Button */}
            {booked ? (
              <div className={styles.successBox}>
                <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#00b894' }}>check_circle</span>
                <div>
                  <p style={{ fontWeight: 600, color: '#006d4e', fontSize: 14 }}>Booking Confirmed!</p>
                  <p style={{ fontSize: 12, color: '#555', marginTop: 2 }}>
                    {selectedRoom.name} — {formatDate(days[selectedDay])} at {selectedSlot}
                  </p>
                </div>
                <button className={styles.newBookingBtn} onClick={() => { setBooked(false); setSelectedSlot(null); }}>
                  New Booking
                </button>
              </div>
            ) : (
              <button
                className={styles.bookBtn}
                disabled={!selectedSlot}
                onClick={handleBook}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>event_available</span>
                {selectedSlot ? `Book ${selectedSlot} slot` : 'Select a time slot'}
              </button>
            )}

            {selectedSlot && !booked && (
              <p style={{ fontSize: 12, color: '#888', textAlign: 'center', marginTop: 8 }}>
                Booking: {selectedRoom.name} · {formatDate(days[selectedDay])} · {selectedSlot}–{timeSlots[timeSlots.indexOf(selectedSlot) + 1] || '18:00'}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
