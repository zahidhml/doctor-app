const schedule = [
  { day: 'Monday',    peshawar: '9:00 AM – 2:00 PM',  chitral: '—' },
  { day: 'Tuesday',   peshawar: '9:00 AM – 2:00 PM',  chitral: '—' },
  { day: 'Wednesday', peshawar: '9:00 AM – 2:00 PM',  chitral: '—' },
  { day: 'Thursday',  peshawar: '—',                   chitral: '10:00 AM – 4:00 PM' },
  { day: 'Friday',    peshawar: '3:00 PM – 7:00 PM',  chitral: '—' },
  { day: 'Saturday',  peshawar: '9:00 AM – 12:00 PM', chitral: '—' },
  { day: 'Sunday',    peshawar: 'Closed',               chitral: 'Closed' },
];

export default function Timetable() {
  return (
    <section style={{ background: '#0B1D3A', padding: '80px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-block', background: 'rgba(13,148,136,0.15)',
            border: '1px solid rgba(13,148,136,0.3)', borderRadius: 20,
            padding: '4px 16px', marginBottom: 14,
          }}>
            <span style={{ color: '#0D9488', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>WEEKLY SCHEDULE</span>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 36, color: '#fff', marginBottom: 8 }}>
            Clinic Timings
          </h2>
          <p style={{ color: '#64748B', fontSize: 15 }}>
            Visit us at your nearest location — Peshawar or Chitral
          </p>
        </div>

        {/* Table card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20, overflow: 'hidden',
        }}>
          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            background: 'rgba(13,148,136,0.2)', padding: '14px 28px',
          }}>
            {['Day', '📍 Peshawar', '📍 Chitral'].map(h => (
              <div key={h} style={{
                color: '#0D9488', fontSize: 12, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: 1,
              }}>{h}</div>
            ))}
          </div>

          {schedule.map((row, i) => {
            const isClosed = row.peshawar === 'Closed' && row.chitral === 'Closed';
            return (
              <div key={row.day} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                padding: '16px 28px',
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(13,148,136,0.07)'}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'}
              >
                {/* Day */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: isClosed ? '#DC2626' : '#0D9488',
                  }} />
                  <span style={{ color: '#E2E8F0', fontWeight: 600, fontSize: 14 }}>{row.day}</span>
                </div>

                {/* Peshawar */}
                <div style={{
                  color: row.peshawar === '—' || row.peshawar === 'Closed' ? '#475569' : '#CCFBF1',
                  fontSize: 14, fontWeight: row.peshawar === 'Closed' ? 600 : 400,
                }}>
                  {row.peshawar === 'Closed'
                    ? <span style={{ color: '#DC2626', fontWeight: 700 }}>🔴 Closed</span>
                    : row.peshawar}
                </div>

                {/* Chitral */}
                <div style={{
                  color: row.chitral === '—' || row.chitral === 'Closed' ? '#475569' : '#CCFBF1',
                  fontSize: 14, fontWeight: row.chitral === 'Closed' ? 600 : 400,
                }}>
                  {row.chitral === 'Closed'
                    ? <span style={{ color: '#DC2626', fontWeight: 700 }}>🔴 Closed</span>
                    : row.chitral}
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.2)',
          borderRadius: 12, padding: '12px 20px', marginTop: 20,
        }}>
          <span style={{ fontSize: 18 }}>ℹ️</span>
          <span style={{ color: '#94A3B8', fontSize: 13 }}>
            Walk-ins welcome. For appointments, please call ahead or use the online booking system.
          </span>
        </div>
      </div>
    </section>
  );
}
