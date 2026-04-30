const services = [
  { icon: '🧠', title: 'Migraine Treatment', desc: 'Advanced diagnosis and management of chronic migraines, cluster headaches, and tension-type headaches with personalized treatment plans.' },
  { icon: '⚡', title: 'Epilepsy Care', desc: 'Comprehensive seizure management including EEG evaluation, medication optimization, and long-term monitoring for epilepsy patients.' },
  { icon: '🫀', title: 'Stroke Management', desc: 'Rapid assessment and treatment of ischemic and hemorrhagic strokes, plus post-stroke rehabilitation and recurrence prevention.' },
  { icon: '🔬', title: 'Nerve Disorders', desc: 'Diagnosis and treatment of peripheral neuropathy, Guillain-Barré syndrome, and other nerve conduction disorders.' },
  { icon: '😴', title: 'Sleep Disorders', desc: 'Evaluation of sleep apnea, insomnia, narcolepsy, and restless leg syndrome using advanced sleep study protocols.' },
  { icon: '🩺', title: 'Memory & Cognition', desc: 'Assessment and management of Alzheimer\'s disease, dementia, mild cognitive impairment, and other memory-related conditions.' },
];

export default function Services() {
  return (
    <section id="services" style={{ background: '#F8FAFC', padding: '90px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-block', background: '#CCFBF1',
            borderRadius: 20, padding: '4px 16px', marginBottom: 14,
          }}>
            <span style={{ color: '#0D9488', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>WHAT WE OFFER</span>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 38, color: '#0B1D3A', marginBottom: 12 }}>
            Neurological Services
          </h2>
          <p style={{ color: '#64748B', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Specialized care for all conditions affecting the brain, spine, and nervous system
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {services.map((svc, i) => (
            <div key={i} className="card" style={{ padding: 28, cursor: 'default', transition: 'all 0.25s' }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(13,148,136,0.12)';
                e.currentTarget.style.borderColor = '#0D9488';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              {/* Icon */}
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: 'linear-gradient(135deg,#CCFBF1,#A7F3D0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, marginBottom: 18,
              }}>{svc.icon}</div>

              <h3 style={{
                fontFamily: "'DM Serif Display',serif",
                fontSize: 20, color: '#0B1D3A', marginBottom: 10,
              }}>{svc.title}</h3>

              <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.7 }}>{svc.desc}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 18, color: '#0D9488', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Learn more <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
