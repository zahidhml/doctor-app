export default function Footer() {
  return (
    <footer style={{ background: '#07121F', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 24px 28px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 40, marginBottom: 36 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg,#0D9488,#0B1D3A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              }}>🧠</div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>NeuroCore</div>
                <div style={{ color: '#0D9488', fontSize: 11 }}>Neurology Clinic</div>
              </div>
            </div>
            <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.7, maxWidth: 280 }}>
              Expert neurological care in Peshawar & Chitral. Providing compassionate, 
              evidence-based treatment for over 15 years.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Quick Links</div>
            {['Home', 'Services', 'About', 'Contact', 'Book Appointment'].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <a href={`#${l.toLowerCase().replace(' ', '')}`} style={{
                  color: '#64748B', textDecoration: 'none', fontSize: 13,
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = '#0D9488'}
                  onMouseLeave={e => e.target.style.color = '#64748B'}
                >{l}</a>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Contact</div>
            {[
              { icon: '📍', val: 'Hayatabad, Peshawar' },
              { icon: '📞', val: '+92-91-5701234' },
              { icon: '💬', val: 'WhatsApp Available' },
              { icon: '🕐', val: 'Mon–Sat: By Schedule' },
            ].map(c => (
              <div key={c.icon} style={{ display: 'flex', gap: 8, marginBottom: 10, color: '#64748B', fontSize: 13 }}>
                <span>{c.icon}</span><span>{c.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 20,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ color: '#334155', fontSize: 13 }}>
            © 2026 NeuroCore Neurology Clinic. All rights reserved.
          </span>
          <span style={{ color: '#334155', fontSize: 13 }}>
            Dr. Khalid Mehmood Shah · PMC Reg. No: 2009-11432
          </span>
        </div>
      </div>
    </footer>
  );
}
