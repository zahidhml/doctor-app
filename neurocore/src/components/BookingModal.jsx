import { useState } from 'react';

const PESHAWAR_SLOTS = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '3:00 PM', '3:30 PM', '4:00 PM'];
const CHITRAL_SLOTS  = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM'];

const today = new Date().toISOString().split('T')[0];

export default function BookingModal({ onClose, onAuthNeeded, prefill }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    city: prefill?.city || '',
    date: prefill?.date || today,
    slot: prefill?.slot || '',
    name: prefill?.name || '',
    phone: prefill?.phone || '',
    cnic: prefill?.cnic || '',
  });

  const slots = form.city === 'Chitral' ? CHITRAL_SLOTS : PESHAWAR_SLOTS;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const canNext1 = form.city && form.date && form.slot;
  const canNext2 = form.name && form.phone && form.cnic;

  const steps = [
    { n: 1, label: 'Location & Time' },
    { n: 2, label: 'Your Details' },
    { n: 3, label: 'Confirm' },
  ];

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: '#0B1D3A' }}>
            Book Appointment
          </h2>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #E2E8F0',
            background: 'none', cursor: 'pointer', fontSize: 18, color: '#64748B',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className={`step-circle ${step > s.n ? 'done' : step === s.n ? 'active' : 'todo'}`}>
                  {step > s.n ? '✓' : s.n}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: step >= s.n ? '#0D9488' : '#94A3B8', whiteSpace: 'nowrap' }}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`step-line ${step > s.n ? 'done' : ''}`} style={{ flex: 1, margin: '0 8px' }} />
              )}
            </div>
          ))}
        </div>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div>
            <label style={lbl}>Select City</label>
            <select className="input-field" value={form.city} onChange={e => { set('city', e.target.value); set('slot', ''); }} style={{ marginBottom: 16 }}>
              <option value="">— Choose location —</option>
              <option value="Peshawar">📍 Peshawar</option>
              <option value="Chitral">📍 Chitral</option>
            </select>

            <label style={lbl}>Select Date</label>
            <input type="date" className="input-field" min={today} value={form.date}
              onChange={e => set('date', e.target.value)} style={{ marginBottom: 16 }} />

            {form.city && (
              <>
                <label style={lbl}>Available Time Slots</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                  {slots.map(sl => (
                    <button key={sl} className={`slot-pill ${form.slot === sl ? 'selected' : ''}`}
                      onClick={() => set('slot', sl)}>{sl}</button>
                  ))}
                </div>
              </>
            )}

            <button className="btn-primary" style={{ width: '100%', marginTop: 20 }}
              disabled={!canNext1} onClick={() => setStep(2)}
              id="book-step1-next"
            >
              Next — Patient Details →
            </button>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div>
            {[
              { key: 'name',  label: 'Full Name',    type: 'text',  ph: 'e.g. Ahmed Khan' },
              { key: 'phone', label: 'Phone Number', type: 'tel',   ph: '03XX-XXXXXXX' },
              { key: 'cnic',  label: 'CNIC Number',  type: 'text',  ph: '12345-1234567-1' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 16 }}>
                <label style={lbl}>{f.label}</label>
                <input className="input-field" type={f.type} placeholder={f.ph}
                  value={form[f.key]} onChange={e => set(f.key, e.target.value)} />
              </div>
            ))}

            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button className="btn-outline" style={{ flex: 1 }} onClick={() => setStep(1)}>← Back</button>
              <button className="btn-primary" style={{ flex: 2 }} disabled={!canNext2}
                onClick={() => setStep(3)} id="book-step2-next">
                Review Appointment →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div>
            {/* Summary card */}
            <div style={{
              background: 'linear-gradient(135deg,#F0FDF9,#ECFDF5)',
              border: '1.5px solid #A7F3D0', borderRadius: 14, padding: 22, marginBottom: 20,
            }}>
              <div style={{ fontWeight: 700, color: '#0B1D3A', marginBottom: 14, fontSize: 15 }}>
                📋 Appointment Summary
              </div>
              {[
                { icon: '📍', label: 'Location', val: form.city },
                { icon: '📅', label: 'Date',     val: form.date },
                { icon: '🕐', label: 'Time',     val: form.slot },
                { icon: '👤', label: 'Patient',  val: form.name },
                { icon: '📞', label: 'Phone',    val: form.phone },
                { icon: '🪪', label: 'CNIC',     val: form.cnic },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9, fontSize: 14 }}>
                  <span style={{ color: '#64748B' }}>{row.icon} {row.label}</span>
                  <span style={{ color: '#0B1D3A', fontWeight: 600 }}>{row.val || '—'}</span>
                </div>
              ))}
            </div>

            {/* Warning */}
            <div style={{
              background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 10,
              padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'center', marginBottom: 20,
            }}>
              <span>⚠️</span>
              <span style={{ color: '#92400E', fontSize: 13 }}>
                Please register or login to save your appointment to your account.
              </span>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-outline" style={{ flex: 1 }} onClick={() => setStep(2)}>← Back</button>
              <button className="btn-primary" style={{ flex: 2 }} id="book-confirm-register"
                onClick={() => onAuthNeeded(form)}>
                Confirm & Register →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const lbl = {
  display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6,
};
