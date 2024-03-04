import React from 'react';

export default function Footer({ isOpen }) {
  return (
    <div style={{ backgroundColor: '#b3d9ff', position: 'fixed', height: 70, width: "100%", bottom: 0, paddingLeft: isOpen ? 300 : 0 }}>
      footer
    </div>
  )
}
