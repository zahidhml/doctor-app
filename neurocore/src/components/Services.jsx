import { Brain, Activity, Zap, Microscope, Baby, Stethoscope } from 'lucide-react';

const services = [
  { icon: <Brain size={26} color="#0D9488" />, title: 'Brain Tumor Surgery', desc: 'Expert surgical management of benign and malignant brain tumors using advanced microsurgical and neuro-navigational techniques.' },
  { icon: <Activity size={26} color="#0D9488" />, title: 'Spine Surgery', desc: 'Specialized treatment for spinal disorders, including herniated discs, spinal stenosis, spinal trauma, and spinal tumors.' },
  { icon: <Zap size={26} color="#0D9488" />, title: 'Neurotrauma Care', desc: 'Emergency and specialized care for traumatic brain injuries (TBI) and spinal cord injuries (SCI).' },
  { icon: <Microscope size={26} color="#0D9488" />, title: 'Microsurgery', desc: 'Highly precise surgical procedures using specialized microscopes to treat vascular malformations and complex nerve disorders.' },
  { icon: <Baby size={26} color="#0D9488" />, title: 'Pediatric Neurosurgery', desc: 'Surgical care for children with congenital neurological conditions, hydrocephalus, and other childhood brain and spine disorders.' },
  { icon: <Stethoscope size={26} color="#0D9488" />, title: 'Functional Neurosurgery', desc: 'Surgical interventions for movement disorders, chronic pain, and epilepsy through advanced surgical protocols.' },
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
            Neurosurgical Services
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
