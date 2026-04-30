const locations = [
  {
    city: 'Peshawar',
    icon: '🏥',
    address: 'Hayatabad Medical Complex, Peshawar, Khyber Pakhtunkhwa, Pakistan',
    phone: '0345-0526102',
    whatsapp: '923450526102',
    mapUrl: 'https://maps.google.com/?q=Hayatabad+Medical+Complex+Peshawar',
    hours: 'Consultation by Appointment',
  },
  {
    city: 'Chitral',
    icon: '🏔️',
    address: 'Shifa Hospital, Chitral, Khyber Pakhtunkhwa, Pakistan',
    phone: '0345-0526102',
    whatsapp: '923450526102',
    mapUrl: 'https://maps.google.com/?q=Shifa+Hospital+Chitral',
    hours: 'Clinics twice a month',
  },
];

export default function Contact() {
  return (
    <section id="contact" style={{ background: '#F8FAFC', padding: '90px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-block', background: '#CCFBF1',
            borderRadius: 20, padding: '4px 16px', marginBottom: 14,
          }}>
            <span style={{ color: '#0D9488', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>FIND US</span>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 38, color: '#0B1D3A', marginBottom: 10 }}>
            Contact & Locations
          </h2>
          <p style={{ color: '#64748B', fontSize: 15 }}>Visit us at our clinics or reach out directly</p>
        </div>

        {/* Location cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 28 }}>
          {locations.map((loc) => (
            <div key={loc.city} className="card" style={{ padding: 32, transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 36px rgba(13,148,136,0.12)'; e.currentTarget.style.borderColor = '#0D9488'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
            >
              {/* City header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'linear-gradient(135deg,#CCFBF1,#A7F3D0)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>{loc.icon}</div>
                <div>
                  <h3 style={{ fontFamily: "'DM Serif Display',serif", color: '#0B1D3A', fontSize: 22 }}>
                    📍 {loc.city}
                  </h3>
                  <span style={{ fontSize: 11, color: '#0D9488', fontWeight: 600, background: '#CCFBF1', padding: '2px 8px', borderRadius: 10 }}>
                    {loc.city === 'Peshawar' ? 'Main Clinic' : 'Visiting Clinic'}
                  </span>
                </div>
              </div>

              {/* Info rows */}
              {[
                { icon: '📍', label: 'Address', val: loc.address },
                { icon: '🕐', label: 'Hours', val: loc.hours },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 16, marginTop: 2 }}>{row.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{row.label}</div>
                    <div style={{ color: '#334155', fontSize: 14, marginTop: 2, lineHeight: 1.5 }}>{row.val}</div>
                  </div>
                </div>
              ))}

              {/* Phone */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 22, alignItems: 'center' }}>
                <span style={{ fontSize: 16 }}>📞</span>
                <div>
                  <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Phone</div>
                  <a href={`tel:${loc.phone}`} style={{ color: '#0D9488', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                    {loc.phone}
                  </a>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 10 }}>
                <a href={`https://wa.me/${loc.whatsapp}`} target="_blank" rel="noreferrer" style={{ flex: 1 }}>
                  <button style={{
                    width: '100%', background: '#25D366', color: '#fff',
                    border: 'none', borderRadius: 8, padding: '10px 16px',
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontWeight: 600, fontSize: 13, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    transition: 'opacity 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    💬 WhatsApp
                  </button>
                </a>
                <a href={loc.mapUrl} target="_blank" rel="noreferrer" style={{ flex: 1 }}>
                  <button className="btn-outline" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    🗺️ Maps
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency note */}
        <div style={{
          marginTop: 36, background: 'linear-gradient(135deg,#0B1D3A,#132848)',
          borderRadius: 16, padding: '20px 28px',
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <span style={{ fontSize: 28 }}>🚨</span>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Neurological Emergency?</div>
            <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>
              For urgent neurological emergencies, please go directly to the nearest Emergency Room or call{' '}
              <a href="tel:1122" style={{ color: '#0D9488', fontWeight: 700 }}>1122</a>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
