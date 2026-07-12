import React from 'react';

export default function StatusBadge({ status }: { status: string }) {
  let badgeStyle = {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    display: 'inline-block',
    backgroundColor: '#ddeeff',
    color: '#2e86de'
  };
  
  if (status === 'Available') {
    badgeStyle.backgroundColor = '#d4f5ee';
    badgeStyle.color = '#00b894';
  } else if (status === 'Under Maintenance' || status === 'Maintenance') {
    badgeStyle.backgroundColor = '#ffe5e5';
    badgeStyle.color = '#d63031';
  }

  return <span style={badgeStyle}>{status}</span>;
}
