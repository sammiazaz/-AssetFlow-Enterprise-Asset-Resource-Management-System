"use client";

import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  let color = '#5a6474';
  let bg = '#f0f2f5';

  switch (status) {
    case 'Available':
    case 'Active':
    case 'Resolved':
    case 'Completed':
    case 'Approved':
      color = '#00b894';
      bg = 'rgba(0, 184, 148, 0.1)';
      break;
    case 'Allocated':
    case 'Ongoing':
      color = '#2e86de';
      bg = 'rgba(46, 134, 222, 0.1)';
      break;
    case 'Reserved':
    case 'Upcoming':
      color = '#6c5ce7';
      bg = 'rgba(108, 92, 231, 0.1)';
      break;
    case 'Under Maintenance':
    case 'In Progress':
    case 'Pending':
      color = '#e17055';
      bg = 'rgba(225, 112, 85, 0.1)';
      break;
    case 'Lost':
    case 'Disposed':
    case 'Cancelled':
    case 'Rejected':
    case 'Inactive':
      color = '#d63031';
      bg = 'rgba(214, 48, 49, 0.1)';
      break;
    case 'Retired':
      color = '#636e72';
      bg = 'rgba(99, 110, 114, 0.1)';
      break;
  }

  return (
    <span style={{
      backgroundColor: bg,
      color: color,
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      whiteSpace: 'nowrap'
    }}>
      {status}
    </span>
  );
}
