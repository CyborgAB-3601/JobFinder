import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.5rem 2rem',
      background: '#2a1053',
      color: 'white',
      fontFamily: 'inherit',
    }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#4e5cf7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#b3baff' }} />
        </div>
        <span style={{ fontWeight: 600, fontSize: 20 }}>job-finder</span>
      </a>
      <div style={{ display: 'flex', gap: '2rem', fontSize: 16 }}>
        <a href="/tips" style={{ color: 'inherit', textDecoration: 'none' }}>Tips</a>
        <a href="/how-it-works" style={{ color: 'inherit', textDecoration: 'none' }}>How it works</a>
        <a href="/about-us" style={{ color: 'inherit', textDecoration: 'none' }}>About us</a>
      </div>
    </nav>
  );
};

export default Navbar; 