import { GraduationCap, Award, Calendar, MapPin, UserRound, Trophy } from 'lucide-react';

const qualifications = [
  { icon: <GraduationCap size={18} color="#0D9488" />, label: 'MBBS (KMC)', detail: 'Khyber Medical College, Peshawar' },
  { icon: <Award size={18} color="#0D9488" />, label: 'FCPS Neurosurgery', detail: 'College of Physicians & Surgeons Pakistan' },
  { icon: <Calendar size={18} color="#0D9488" />, label: 'Extensive Experience', detail: 'Senior Registrar at HMC' },
  { icon: <MapPin size={18} color="#0D9488" />, label: '2 Locations', detail: 'Peshawar (Main) · Chitral (Visiting)' },
];

export default function About() {
  return (
    <section id="about" style={{ background: '#fff', padding: '90px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-block', background: '#CCFBF1',
            borderRadius: 20, padding: '4px 16px', marginBottom: 14,
          }}>
            <span style={{ color: '#0D9488', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>MEET THE DOCTOR</span>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 38, color: '#0B1D3A' }}>
            About Dr. Tabraiz Wali Shah
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48, alignItems: 'start' }}>
          {/* Left — Profile card */}
          <div className="card" style={{ padding: 32, textAlign: 'center', background: 'linear-gradient(160deg,#0B1D3A,#132848)' }}>
            <div style={{
              width: 100, height: 100, borderRadius: '50%', margin: '0 auto 20px',
              background: 'linear-gradient(135deg,#0D9488,#0B1D3A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 0 4px rgba(13,148,136,0.35)',
              overflow: 'hidden',
            }}>
              <img src="/assets/doctor.jpg" alt="Dr. Tabraiz Wali Shah" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <h3 style={{ fontFamily: "'DM Serif Display',serif", color: '#fff', fontSize: 22, marginBottom: 6 }}>
              Dr. Tabraiz Wali Shah
            </h3>
            <p style={{ color: '#0D9488', fontSize: 14, marginBottom: 20 }}>MBBS (KMC) · FCPS (Neurosurgery)</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
              {[
                { val: '2000+', lbl: 'Patients' },
                { val: '15+', lbl: 'Years Exp.' },
                { val: '4.9', lbl: 'Rating' },
                { val: '2', lbl: 'Clinics' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: 'rgba(13,148,136,0.15)', borderRadius: 10, padding: '12px 8px',
                  border: '1px solid rgba(13,148,136,0.2)',
                }}>
                  <div style={{ fontFamily: "'DM Serif Display',serif", color: '#0D9488', fontSize: 22, fontWeight: 700 }}>{s.val}</div>
                  <div style={{ color: '#94A3B8', fontSize: 11, marginTop: 2 }}>{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* PMC badge */}
            <div style={{
              marginTop: 20, background: 'rgba(217,119,6,0.15)', border: '1px solid rgba(217,119,6,0.3)',
              borderRadius: 10, padding: '10px 16px',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Trophy size={18} color="#D97706" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#D97706', fontSize: 12, fontWeight: 700 }}>PMC Registered</div>
                <div style={{ color: '#94A3B8', fontSize: 11 }}>Reg. No: PMC-2009-11432</div>
              </div>
            </div>
          </div>

          {/* Right — Bio + qualifications */}
          <div>
            <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
              Dr. Tabraiz Wali Shah is a highly skilled Neurosurgeon and currently serves as a Senior Registrar at Hayatabad Medical Complex (HMC) in Peshawar. He completed his MBBS from Khyber Medical College (KMC) and earned his FCPS in Neurosurgery, dedicating his career to advancing brain and spine surgical care.
            </p>
            <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
              Specializing in complex neurosurgical procedures, Dr. Tabraiz provides comprehensive treatment for brain tumors, spinal trauma, and other nervous system disorders. He maintains regular clinics in Peshawar and also offers visiting consultations in Chitral twice a month, ensuring specialized neurosurgical care is accessible across the region.
            </p>

            {/* Qualification boxes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {qualifications.map((q, i) => (
                <div key={i} style={{
                  background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 12,
                  padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'flex-start',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0D9488'; e.currentTarget.style.background = '#F0FDF9'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC'; }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: '#CCFBF1',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
                  }}>{q.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0B1D3A', fontSize: 14 }}>{q.label}</div>
                    <div style={{ color: '#64748B', fontSize: 12, marginTop: 3, lineHeight: 1.5 }}>{q.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Clinic Image */}
        <div style={{ marginTop: 60 }}>
          <div style={{ 
            borderRadius: 24, overflow: 'hidden', height: 400, 
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            position: 'relative'
          }}>
            <img src="/assets/clinic.png" alt="NeuroCore Neurosurgery Clinic" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(11,29,58,0.9), transparent)',
              padding: '40px 32px', color: '#fff'
            }}>
              <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, marginBottom: 8 }}>Our State-of-the-Art Facilities</h3>
              <p style={{ fontSize: 15, opacity: 0.9 }}>Equipped with advanced neuro-navigational and microsurgical technology for precision care.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
