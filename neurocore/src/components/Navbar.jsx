import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onBook, onLogin }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
      background: scrolled ? 'rgba(11,29,58,0.98)' : '#0B1D3A',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.25)' : 'none',
      transition: 'all 0.3s',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 68 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'linear-gradient(135deg,#0D9488,#0B1D3A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, boxShadow: '0 2px 10px rgba(13,148,136,0.4)'
          }}>🧠</div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.2 }}>NeuroCore</div>
            <div style={{ color: '#0D9488', fontSize: 10, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 500 }}>Neurology Clinic</div>
          </div>
        </div>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 28, marginRight: 32 }} className="desktop-nav">
          {navLinks.map(l => (
            <a key={l.label} href={l.href} style={{
              color: '#CBD5E1', textDecoration: 'none', fontSize: 14, fontWeight: 500,
              fontFamily: "'Plus Jakarta Sans',sans-serif", transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#0D9488'}
              onMouseLeave={e => e.target.style.color = '#CBD5E1'}
            >{l.label}</a>
          ))}
          <span
            onClick={() => navigate('/admin')}
            style={{
              color: '#D97706', textDecoration: 'none', fontSize: 14, fontWeight: 600,
              fontFamily: "'Plus Jakarta Sans',sans-serif", cursor: 'pointer',
            }}
          >Admin</span>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-outline" style={{ padding: '8px 16px', fontSize: 13 }} onClick={onLogin} id="nav-patient-login">
            Patient Login
          </button>
          <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }} onClick={onBook} id="nav-book-appointment">
            Book Appointment
          </button>
        </div>
      </div>
    </nav>
  );
}
