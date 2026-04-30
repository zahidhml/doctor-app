import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearSession, getAppointments, getPrescriptions, updateUser, getUsers, addAppointment } from '../utils/storage.js';
import { generatePrescriptionPDF, whatsAppPrescription } from '../utils/pdf.js';

const PESHAWAR_SLOTS = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '3:00 PM', '3:30 PM', '4:00 PM'];
const CHITRAL_SLOTS  = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM'];
const today = new Date().toISOString().split('T')[0];

export default function PatientDashboard({ session, setSession }) {
  const [tab, setTab] = useState('appointments');
  const navigate = useNavigate();

  const allAppts = getAppointments().filter(a => a.patientId === session.id);
  const allRx    = getPrescriptions().filter(r => r.patientId === session.id);

  const [bookForm, setBookForm] = useState({
    city: '', date: today, slot: '',
  });

  const initials = (session.name || 'P').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  const handleLogout = () => {
    clearSession();
    setSession(null);
    navigate('/');
  };

  const setB = (k, v) => setBookForm(f => ({ ...f, [k]: v }));

  const handleBookAgain = () => {
    if (!bookForm.city || !bookForm.date || !bookForm.slot) return;
    addAppointment({
      city: bookForm.city, date: bookForm.date, slot: bookForm.slot,
      patientId: session.id, patientName: session.name, phone: session.phone,
      doctor: 'Dr. Tabraiz Wali Shah',
    });
    alert('Appointment booked successfully!');
    setBookForm({ city: '', date: today, slot: '' });
    setTab('appointments');
  };

  const navItems = [
    { id: 'appointments', icon: '📅', label: 'My Appointments' },
    { id: 'prescriptions', icon: '💊', label: 'Prescriptions' },
    { id: 'profile',       icon: '👤', label: 'My Profile' },
    { id: 'book',          icon: '➕', label: 'Book Again' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: 240, background: '#0B1D3A', display: 'flex',
        flexDirection: 'column', padding: '28px 0', flexShrink: 0,
        position: 'fixed', top: 0, left: 0, height: '100vh', overflow: 'auto',
        boxShadow: '4px 0 24px rgba(0,0,0,0.2)',
      }}>
        {/* Logo */}
        <div style={{ padding: '0 20px', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 22 }}>🧠</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>NeuroCore</div>
              <div style={{ color: '#0D9488', fontSize: 10 }}>Neurosurgery Portal</div>
            </div>
          </div>
        </div>

        {/* Avatar */}
        <div style={{ padding: '0 20px', marginBottom: 28, textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', margin: '0 auto 10px',
            background: 'linear-gradient(135deg,#0D9488,#0F766E)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 22, fontWeight: 700,
            boxShadow: '0 0 0 3px rgba(13,148,136,0.3)',
          }}>{initials}</div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{session.name}</div>
          <div style={{ color: '#64748B', fontSize: 11, marginTop: 2 }}>Patient Portal</div>
          <div style={{ color: '#0D9488', fontSize: 10, marginTop: 4, background: 'rgba(13,148,136,0.1)', borderRadius: 10, padding: '2px 8px', display: 'inline-block' }}>
            {session.id}
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '0 20px 16px' }} />

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0 12px' }}>
          {navItems.map(item => (
            <div key={item.id} className={`sidebar-item ${tab === item.id ? 'active' : ''}`}
              onClick={() => setTab(item.id)}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div style={{ padding: '0 12px', marginTop: 12 }}>
          <div className="sidebar-item" onClick={handleLogout}
            style={{ color: '#DC2626', borderRightColor: 'transparent' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span>🚪</span><span>Logout</span>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main style={{ flex: 1, marginLeft: 240, padding: '32px 32px', minHeight: '100vh' }}>

        {/* ── Appointments tab ── */}
        {tab === 'appointments' && (
          <div>
            <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: '#0B1D3A', marginBottom: 6 }}>My Appointments</h1>
            <p style={{ color: '#64748B', fontSize: 14, marginBottom: 28 }}>Track and manage your scheduled visits</p>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 28 }}>
              {[
                { label: 'Total', val: allAppts.length, icon: '📅', color: '#CCFBF1' },
                { label: 'Upcoming', val: allAppts.filter(a => a.status === 'Confirmed').length, icon: '⏳', color: '#FEF3C7' },
                { label: 'Completed', val: allAppts.filter(a => a.status === 'Done').length, icon: '✅', color: '#DCFCE7' },
              ].map(m => (
                <div key={m.label} className="card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ color: '#0D9488', fontSize: 10, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 500 }}>Neurosurgery Clinic</div>
                      <div style={{ fontSize: 32, fontWeight: 700, color: '#0B1D3A', marginTop: 4 }}>{m.val}</div>
                    </div>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{m.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="card" style={{ overflow: 'auto' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontWeight: 700, color: '#0B1D3A', fontSize: 15 }}>Appointment History</span>
              </div>
              {allAppts.length === 0 ? (
                <div style={{ padding: 40, textAlign: 'center', color: '#94A3B8' }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>📭</div>
                  <div style={{ fontWeight: 600 }}>No appointments yet</div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>Book your first appointment to get started</div>
                </div>
              ) : (
                <table className="tbl">
                  <thead>
                    <tr>
                      {['Date', 'Time', 'Location', 'Doctor', 'Status'].map(h => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allAppts.map(a => (
                      <tr key={a.id}>
                        <td style={{ fontWeight: 500 }}>{a.date}</td>
                        <td>{a.slot}</td>
                        <td>📍 {a.city}</td>
                        <td>{a.doctor}</td>
                        <td>
                          <span className={a.status === 'Done' ? 'badge-green' : a.status === 'Confirmed' ? 'badge-blue' : 'badge-amber'}>
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ── Prescriptions tab ── */}
        {tab === 'prescriptions' && (
          <div>
            <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: '#0B1D3A', marginBottom: 6 }}>Prescriptions</h1>
            <p style={{ color: '#64748B', fontSize: 14, marginBottom: 28 }}>Your prescription history from Dr. Tabraiz Wali Shah</p>

            {allRx.length === 0 ? (
              <div className="card" style={{ padding: 48, textAlign: 'center', color: '#94A3B8' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>💊</div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>No prescriptions yet</div>
                <div style={{ fontSize: 13, marginTop: 6 }}>Your doctor will issue prescriptions after your consultation</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {allRx.map(rx => (
                  <div key={rx.id} className="card" style={{ padding: 24 }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0B1D3A', fontSize: 15 }}>{rx.id}</div>
                        <div style={{ color: '#64748B', fontSize: 13, marginTop: 2 }}>
                          {new Date(rx.date).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      </div>
                      <span className="badge-green">Issued</span>
                    </div>

                    {rx.diagnosis && (
                      <div style={{ marginBottom: 12, color: '#475569', fontSize: 14 }}>
                        <strong>Diagnosis:</strong> {rx.diagnosis}
                      </div>
                    )}

                    {/* Medicines */}
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontWeight: 600, color: '#374151', fontSize: 13, marginBottom: 8 }}>💊 Medicines</div>
                      {(rx.medicines || []).filter(m => m.trim()).map((med, i) => (
                        <div key={i} style={{
                          background: '#F0FDF9', border: '1px solid #A7F3D0', borderRadius: 8,
                          padding: '6px 12px', marginBottom: 6, fontSize: 13, color: '#065F46',
                        }}>
                          {i + 1}. {med}
                        </div>
                      ))}
                    </div>

                    {rx.instructions && (
                      <div style={{ color: '#64748B', fontSize: 13, marginBottom: 16, background: '#F8FAFC', borderRadius: 8, padding: '10px 14px' }}>
                        📝 {rx.instructions}
                      </div>
                    )}

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
                        onClick={() => generatePrescriptionPDF({ ...rx, patientName: session.name, prescriptionId: rx.id, date: new Date(rx.date).toLocaleDateString() })}>
                        📥 Download PDF
                      </button>
                      <button style={{
                        background: '#25D366', color: '#fff', border: 'none', borderRadius: 8,
                        padding: '8px 16px', fontFamily: "'Plus Jakarta Sans',sans-serif",
                        fontWeight: 600, fontSize: 13, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 6,
                      }}
                        onClick={() => whatsAppPrescription({ ...rx, patientName: session.name, phone: session.phone })}>
                        💬 WhatsApp
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Profile tab ── */}
        {tab === 'profile' && (
          <div>
            <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: '#0B1D3A', marginBottom: 28 }}>My Profile</h1>
            <div className="card" style={{ padding: 32, maxWidth: 560 }}>
              {/* Avatar */}
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%', margin: '0 auto 12px',
                  background: 'linear-gradient(135deg,#0D9488,#0F766E)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 28, fontWeight: 700,
                }}>{initials}</div>
                <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: '#0B1D3A' }}>{session.name}</div>
                <div style={{ color: '#0D9488', fontSize: 13, marginTop: 2 }}>Patient ID: {session.id}</div>
              </div>

              {[
                { icon: '📞', label: 'Phone',    val: session.phone },
                { icon: '🪪', label: 'CNIC',     val: session.cnic },
                { icon: '📍', label: 'City',     val: session.city || 'Not set' },
                { icon: '🩸', label: 'Blood Group', val: session.bloodGroup || 'Not set' },
                { icon: '👨‍⚕️', label: 'Doctor', val: 'Dr. Tabraiz Wali Shah' },
              ].map(row => (
                <div key={row.label} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0',
                  borderBottom: '1px solid #F1F5F9',
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: '#CCFBF1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{row.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{row.label}</div>
                    <div style={{ color: '#334155', fontWeight: 600, fontSize: 14, marginTop: 2 }}>{row.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Book Again tab ── */}
        {tab === 'book' && (
          <div>
            <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: '#0B1D3A', marginBottom: 6 }}>Book Again</h1>
            <p style={{ color: '#64748B', fontSize: 14, marginBottom: 28 }}>Your details are pre-filled — just pick a date & time</p>

            <div className="card" style={{ padding: 32, maxWidth: 520 }}>
              {/* Pre-filled info */}
              <div style={{ background: '#F0FDF9', border: '1px solid #A7F3D0', borderRadius: 10, padding: '14px 18px', marginBottom: 24 }}>
                <div style={{ fontWeight: 700, color: '#065F46', fontSize: 13, marginBottom: 8 }}>✅ Pre-filled from your profile</div>
                {[
                  { label: 'Name',  val: session.name },
                  { label: 'Phone', val: session.phone },
                  { label: 'CNIC',  val: session.cnic },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                    <span style={{ color: '#047857' }}>{r.label}</span>
                    <span style={{ color: '#065F46', fontWeight: 600 }}>{r.val}</span>
                  </div>
                ))}
              </div>

              {[
                { label: 'Select City', type: 'select' },
                { label: 'Date', type: 'date' },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 16 }}>
                  <label style={lbl}>{f.label}</label>
                  {f.type === 'select' ? (
                    <select className="input-field" value={bookForm.city}
                      onChange={e => { setB('city', e.target.value); setB('slot', ''); }}>
                      <option value="">— Choose location —</option>
                      <option value="Peshawar">📍 Peshawar</option>
                      <option value="Chitral">📍 Chitral</option>
                    </select>
                  ) : (
                    <input type="date" className="input-field" min={today} value={bookForm.date}
                      onChange={e => setB('date', e.target.value)} />
                  )}
                </div>
              ))}

              {bookForm.city && (
                <div style={{ marginBottom: 24 }}>
                  <label style={lbl}>Available Time Slots</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {(bookForm.city === 'Chitral' ? CHITRAL_SLOTS : PESHAWAR_SLOTS).map(sl => (
                      <button key={sl} className={`slot-pill ${bookForm.slot === sl ? 'selected' : ''}`}
                        onClick={() => setB('slot', sl)}>{sl}</button>
                    ))}
                  </div>
                </div>
              )}

              <button className="btn-primary" style={{ width: '100%' }}
                disabled={!bookForm.city || !bookForm.date || !bookForm.slot}
                onClick={handleBookAgain} id="book-again-btn">
                ✅ Confirm Appointment
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const lbl = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 };
