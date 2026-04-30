import { MapPin, Calendar, Star, UserRound } from 'lucide-react';

export default function Hero({ onBook }) {
  const stats = [
    { value: '2000+', label: 'Patients Treated' },
    { value: '15+', label: 'Years Experience' },
    { value: '2', label: 'Clinic Locations' },
  ];

  return (
    <section id="home" style={{
      background: 'linear-gradient(135deg, #0B1D3A 0%, #0D2E50 50%, #0B1D3A 100%)',
      minHeight: '100vh', paddingTop: 68, display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'absolute', top: '20%', right: '10%', width: 400, height: 400,
        borderRadius: '50%', background: 'radial-gradient(circle,rgba(13,148,136,0.18) 0%,transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300,
        borderRadius: '50%', background: 'radial-gradient(circle,rgba(13,148,136,0.1) 0%,transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left content */}
          <div className="animate-fadeInUp">
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(13,148,136,0.15)', border: '1px solid rgba(13,148,136,0.3)',
              borderRadius: 20, padding: '6px 14px', marginBottom: 20,
            }}>
              <span style={{ color: '#0D9488', fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>
                MBBS (KMC) · FCPS (Neurosurgery) · Brain & Spine Surgeon
              </span>
            </div>

            {/* Doctor name */}
            <h1 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              color: '#ffffff', lineHeight: 1.15, marginBottom: 12,
            }}>
              Dr. Tabraiz<br />Wali Shah
            </h1>

            {/* Subtitle */}
            <p style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 20, color: '#0D9488', fontStyle: 'italic', marginBottom: 18,
            }}>
              Consultant Neurosurgeon
            </p>

            <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.75, marginBottom: 24, maxWidth: 480 }}>
              Providing compassionate, evidence-based neurosurgical care. Specialized in treating complex brain and spine disorders. Currently serving as a Senior Registrar at Hayatabad Medical Complex (HMC) and offering visiting clinics in Chitral.
            </p>

            {/* Location chips */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
              {['Peshawar', 'Chitral'].map(loc => (
                <div key={loc} style={{
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 20, padding: '5px 14px',
                  color: '#CBD5E1', fontSize: 13, fontWeight: 500,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}><MapPin size={14} color="#0D9488" /> {loc}</div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
              <button className="btn-primary" style={{ padding: '12px 28px', fontSize: 15 }} onClick={onBook} id="hero-book-btn">
                Book Appointment
              </button>
              <a href="#about">
                <button className="btn-outline" style={{ padding: '12px 28px', fontSize: 15, color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                >
                  Learn More
                </button>
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 32 }}>
              {stats.map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: '#0D9488', fontWeight: 700 }}>{s.value}</div>
                  <div style={{ color: '#64748B', fontSize: 12, fontWeight: 500, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right section — Large Professional Image */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              position: 'absolute', width: '120%', height: '120%',
              background: 'url("/assets/clinic.png") center/cover no-repeat',
              borderRadius: 40, opacity: 0.1, filter: 'grayscale(1) brightness(2)',
              zIndex: 0, transform: 'rotate(-5deg) scale(1.1)'
            }} />

            {/* Background decorative element */}
            <div style={{
              position: 'absolute', width: '90%', height: '90%',
              background: 'linear-gradient(135deg,#0D9488 0%,transparent 100%)',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              opacity: 0.2, filter: 'blur(40px)', zIndex: 0,
            }} />

            {/* Image Container */}
            <div className="animate-float" style={{
              position: 'relative', width: '100%', maxWidth: 460, zIndex: 1,
            }}>
              <div style={{
                position: 'relative', borderRadius: 32, overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(13,148,136,0.2)',
                background: '#0B1D3A', aspectRatio: '4/5',
              }}>
                <img src="/assets/doctor.jpg" alt="Dr. Tabraiz Wali Shah" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
                {/* Bottom overlay info */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(11,29,58,0.95), transparent)',
                  padding: '32px 24px 24px', textAlign: 'center'
                }}>
                   <div style={{ color: '#fff', fontWeight: 700, fontSize: 20, fontFamily: "'DM Serif Display',serif" }}>
                    Dr. Tabraiz Wali Shah
                  </div>
                  <div style={{ color: '#0D9488', fontSize: 13, marginTop: 4, fontWeight: 600 }}>Consultant Neurosurgeon</div>
                </div>
              </div>

              {/* Floating card — Next Available */}
              <div style={{
                position: 'absolute', top: 30, left: -30,
                background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
                borderRadius: 16, padding: '14px 20px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                display: 'flex', alignItems: 'center', gap: 12, minWidth: 200,
                zIndex: 2,
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: '#CCFBF1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Calendar size={20} color="#0D9488" /></div>
                <div>
                  <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Available Today</div>
                  <div style={{ fontSize: 14, color: '#0B1D3A', fontWeight: 700 }}>3:00 PM - 5:00 PM</div>
                </div>
              </div>

              {/* Floating card — Rating */}
              <div style={{
                position: 'absolute', bottom: 40, right: -30,
                background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
                borderRadius: 16, padding: '14px 20px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                display: 'flex', alignItems: 'center', gap: 12,
                zIndex: 2,
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Star size={20} color="#D97706" fill="#D97706" /></div>
                <div>
                  <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Patient Satisfaction</div>
                  <div style={{ fontSize: 14, color: '#0B1D3A', fontWeight: 700 }}>4.9 / 5.0 (2k+ Reviews)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
