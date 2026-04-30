import { useState } from 'react';
import { LayoutDashboard, Calendar, Users, FileText, CreditCard, Brain, UserRound, LogOut, Check, Trash2, Search, Plus, Download, MessageSquare, MapPin, Clock, Info } from 'lucide-react';
import { getAppointments, updateAppointmentStatus, deleteAppointment, getUsers, saveUsers, getPrescriptions, getPayments, addPrescription } from '../utils/storage.js';
import { generatePrescriptionPDF, whatsAppPrescription } from '../utils/pdf.js';
import { useNavigate } from 'react-router-dom';

/* ─── helpers ─────────────────────────────────────────────── */
const lbl = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 };
const today = new Date();
const todayStr = today.toISOString().split('T')[0];
const greeting = today.getHours() < 12 ? 'Good Morning' : today.getHours() < 17 ? 'Good Afternoon' : 'Good Evening';

/* ─── Overview Tab ────────────────────────────────────────── */
function OverviewTab({ appts, patients, onPrescribe }) {
  const todayAppts = appts.filter(a => a.date === todayStr);
  const pending = appts.filter(a => a.status === 'Confirmed');
  const payments = getPayments();
  const weekRev = payments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      {/* Greeting */}
      <div style={{ background: 'linear-gradient(135deg,#0B1D3A,#132848)', borderRadius: 16, padding: '24px 28px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", color: '#fff', fontSize: 24 }}>{greeting}, Doctor <UserRound size={24} style={{ display: 'inline', verticalAlign: 'middle' }} /></h2>
          <p style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>
            {today.toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} · NeuroCore Neurology Clinic
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#0D9488', fontWeight: 700, fontSize: 22 }}>{todayAppts.length}</div>
          <div style={{ color: '#64748B', fontSize: 12 }}>Today's Appointments</div>
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: "Today's Appts", val: todayAppts.length, icon: <Calendar size={18} color="#0D9488" />, bg: '#CCFBF1' },
          { label: 'Pending', val: pending.length, icon: <Clock size={18} color="#D97706" />, bg: '#FEF3C7' },
          { label: 'Total Patients', val: patients.length, icon: <Users size={18} color="#2563EB" />, bg: '#DBEAFE' },
          { label: 'Weekly Revenue', val: `Rs ${weekRev.toLocaleString()}`, icon: <CreditCard size={18} color="#9333EA" />, bg: '#F3E8FF' },
        ].map(m => (
          <div key={m.label} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ color: '#64748B', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#0B1D3A' }}>{m.val}</div>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{m.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Today's schedule */}
      <div className="card" style={{ overflow: 'auto' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', fontWeight: 700, color: '#0B1D3A', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Calendar size={18} color="#0B1D3A" /> Today's Schedule
        </div>
        {todayAppts.length === 0 ? (
          <div style={{ padding: 36, textAlign: 'center', color: '#94A3B8' }}>No appointments scheduled for today</div>
        ) : (
          <table className="tbl">
            <thead><tr>{['Patient', 'Time', 'Location', 'Status', 'Action'].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {todayAppts.map(a => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 600 }}>{a.patientName}</td>
                  <td>{a.slot}</td>
                  <td><MapPin size={14} style={{ marginRight: 4, verticalAlign: 'text-bottom' }} /> {a.city}</td>
                  <td><span className={a.status === 'Done' ? 'badge-green' : 'badge-amber'}>{a.status}</span></td>
                  <td>
                    <button className="btn-primary" style={{ padding: '5px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
                      onClick={() => onPrescribe(a)}><FileText size={14} /> Prescribe</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ─── Appointments Tab ───────────────────────────────────── */
function AppointmentsTab({ appts, refresh }) {
  const handleDone = (id) => { updateAppointmentStatus(id, 'Done'); refresh(); };
  const handleDel = (id) => { if (window.confirm('Delete appointment?')) { deleteAppointment(id); refresh(); } };

  return (
    <div>
      <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: '#0B1D3A', marginBottom: 6 }}>Appointments</h1>
      <p style={{ color: '#64748B', fontSize: 14, marginBottom: 24 }}>All patient appointments across both locations</p>
      <div className="card" style={{ overflow: 'auto' }}>
        {appts.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#94A3B8' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}><Search size={40} color="#94A3B8" /></div>
            <div style={{ fontWeight: 600 }}>No appointments yet</div>
          </div>
        ) : (
          <table className="tbl">
            <thead><tr>{['ID', 'Patient', 'Date', 'Time', 'City', 'Status', 'Actions'].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {appts.map(a => (
                <tr key={a.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#64748B' }}>{a.id}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#0B1D3A' }}>{a.patientName}</div>
                    <div style={{ fontSize: 12, color: '#94A3B8' }}>{a.phone}</div>
                  </td>
                  <td>{a.date}</td>
                  <td>{a.slot}</td>
                  <td><MapPin size={14} style={{ marginRight: 4, verticalAlign: 'text-bottom' }} /> {a.city}</td>
                  <td><span className={a.status === 'Done' ? 'badge-green' : a.status === 'Confirmed' ? 'badge-blue' : 'badge-amber'}>{a.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {a.status !== 'Done' && (
                        <button onClick={() => handleDone(a.id)} style={{
                          background: '#DCFCE7', color: '#15803D', border: 'none', borderRadius: 6,
                          padding: '4px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: 4
                        }}><Check size={14} /> Done</button>
                      )}
                      <button onClick={() => handleDel(a.id)} style={{
                        background: '#FEE2E2', color: '#B91C1C', border: 'none', borderRadius: 6,
                        padding: '4px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ─── Patient Records Tab ────────────────────────────────── */
function PatientsTab({ patients, onPrescribe }) {
  const [search, setSearch] = useState('');
  const [cityF, setCityF] = useState('');
  const [modal, setModal] = useState(null);
  const [notes, setNotes] = useState('');

  const filtered = patients.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.phone?.includes(search)) &&
    (cityF ? (p.city || '').toLowerCase().includes(cityF.toLowerCase()) : true)
  );

  const openModal = (p) => { setModal(p); setNotes(p.notes || ''); };
  const saveNotes = () => {
    const updated = patients.map(u => u.id === modal.id ? { ...u, notes } : u);
    saveUsers(updated);
    alert('Notes saved!');
    setModal(null);
  };

  const conditions = ['Migraine', 'Epilepsy', 'Stroke', 'Neuropathy', 'Sleep Disorder', 'Dementia'];

  return (
    <div>
      <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: '#0B1D3A', marginBottom: 6 }}>Patient Records</h1>
      <p style={{ color: '#64748B', fontSize: 14, marginBottom: 20 }}>View and manage all registered patients</p>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <input className="input-field" placeholder="🔍 Search by name or phone…" value={search}
          onChange={e => setSearch(e.target.value)} style={{ maxWidth: 300 }} />
        <select className="input-field" value={cityF} onChange={e => setCityF(e.target.value)} style={{ maxWidth: 160 }}>
          <option value="">All Cities</option>
          <option>Peshawar</option>
          <option>Chitral</option>
        </select>
      </div>

      <div className="card" style={{ overflow: 'auto' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#94A3B8' }}>No patients found</div>
        ) : (
          <table className="tbl">
            <thead><tr>{['Patient ID', 'Name & Phone', 'Condition', 'Last Visit', 'City', 'Action'].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => openModal(p)}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#64748B' }}>{p.id}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#0B1D3A' }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: '#94A3B8' }}>{p.phone}</div>
                  </td>
                  <td><span className="badge-blue">{conditions[i % conditions.length]}</span></td>
                  <td style={{ color: '#64748B', fontSize: 13 }}>
                    {p.appointments?.slice(-1)[0]?.date || 'N/A'}
                  </td>
                  <td>{p.city || '—'}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <button className="btn-primary" style={{ padding: '5px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
                      onClick={() => onPrescribe(p)}><FileText size={14} /> Prescribe</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Patient detail modal */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: '#0B1D3A' }}>Patient Details</h2>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: '1.5px solid #E2E8F0', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', fontSize: 16 }}>×</button>
            </div>
            {/* Avatar */}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', margin: '0 auto 10px', background: 'linear-gradient(135deg,#0D9488,#0F766E)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, fontWeight: 700 }}>
                {modal.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#0B1D3A' }}>{modal.name}</div>
              <div style={{ color: '#0D9488', fontSize: 12 }}>{modal.id}</div>
            </div>
            {[
              { label: 'Phone', val: modal.phone },
              { label: 'CNIC', val: modal.cnic },
              { label: 'City', val: modal.city || 'N/A' },
              { label: 'Blood Group', val: modal.bloodGroup || 'N/A' },
              { label: 'Total Appointments', val: (modal.appointments || []).length },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9', fontSize: 14 }}>
                <span style={{ color: '#64748B' }}>{r.label}</span>
                <span style={{ fontWeight: 600, color: '#0B1D3A' }}>{r.val}</span>
              </div>
            ))}
            <div style={{ marginTop: 16 }}>
              <label style={lbl}>Doctor Notes</label>
              <textarea className="input-field" rows={3} value={notes} onChange={e => setNotes(e.target.value)}
                style={{ resize: 'vertical' }} placeholder="Add clinical notes…" />
            </div>
            <button className="btn-primary" style={{ width: '100%', marginTop: 12 }} onClick={saveNotes}>
              💾 Save Notes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Write Prescription Tab ─────────────────────────────── */
function PrescriptionTab({ prefillPatient, clearPrefill }) {
  const [form, setForm] = useState({
    patientName: prefillPatient?.name || prefillPatient?.patientName || '',
    patientId: prefillPatient?.id || prefillPatient?.patientId || '',
    diagnosis: '',
    medicines: ['', '', ''],
    instructions: '',
  });

  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setMed = (i, v) => setForm(f => { const m = [...f.medicines]; m[i] = v; return { ...f, medicines: m }; });
  const addMed = () => setForm(f => ({ ...f, medicines: [...f.medicines, ''] }));
  const removeMed = (i) => setForm(f => ({ ...f, medicines: f.medicines.filter((_, j) => j !== i) }));

  const rxData = {
    doctorName: 'Dr. Tabraiz Wali Shah',
    credentials: 'MBBS (KMC) · FCPS Neurosurgery · Consultant Neurosurgeon',
    clinic: 'NeuroCore Neurosurgery Clinic',
    patientName: form.patientName,
    patientId: form.patientId,
    diagnosis: form.diagnosis,
    medicines: form.medicines,
    instructions: form.instructions,
    date: new Date().toLocaleDateString(),
  };

  const handleGenPDF = () => {
    if (!form.patientName) { alert('Enter patient name first'); return; }
    addPrescription({ ...rxData });
    generatePrescriptionPDF(rxData);
  };
  const handleWA = () => whatsAppPrescription({ ...rxData, phone: '' });

  return (
    <div>
      <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: '#0B1D3A', marginBottom: 6 }}>Write Prescription</h1>
      <p style={{ color: '#64748B', fontSize: 14, marginBottom: 24 }}>Issue a digital prescription for your patient</p>

      {/* Doctor letterhead */}
      <div style={{ background: 'linear-gradient(135deg,#0B1D3A,#132848)', borderRadius: 16, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(13,148,136,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserRound size={32} color="#0D9488" />
          </div>
          <div>
            <div style={{ fontFamily: "'DM Serif Display',serif", color: '#fff', fontSize: 20 }}>Dr. Tabraiz Wali Shah</div>
            <div style={{ color: '#0D9488', fontSize: 13, marginTop: 2 }}>MBBS (KMC) · FCPS Neurosurgery · Consultant Neurosurgeon</div>
            <div style={{ color: '#64748B', fontSize: 12, marginTop: 2 }}>NeuroCore Neurosurgery Clinic</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={lbl}>Patient Name</label>
            <input className="input-field" value={form.patientName} onChange={e => setF('patientName', e.target.value)} placeholder="Full name" />
          </div>
          <div>
            <label style={lbl}>Diagnosis</label>
            <input className="input-field" value={form.diagnosis} onChange={e => setF('diagnosis', e.target.value)} placeholder="e.g. Migraine" />
          </div>
        </div>

        {/* Medicines */}
        <div style={{ marginBottom: 16 }}>
          <label style={lbl}>Medicines</label>
          {form.medicines.map((med, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <span style={{ alignSelf: 'center', color: '#64748B', fontSize: 13, width: 20 }}>{i + 1}.</span>
              <input className="input-field" value={med} onChange={e => setMed(i, e.target.value)}
                placeholder={`Medicine ${i + 1} (name, dose, frequency)`} style={{ flex: 1 }} />
              {form.medicines.length > 1 && (
                <button onClick={() => removeMed(i)} style={{ background: '#FEE2E2', color: '#B91C1C', border: 'none', borderRadius: 6, padding: '0 10px', cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>✕</button>
              )}
            </div>
          ))}
          <button onClick={addMed} className="btn-outline" style={{ marginTop: 4, padding: '7px 16px', fontSize: 13 }}>
            + Add Medicine
          </button>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={lbl}>Instructions</label>
          <textarea className="input-field" rows={3} value={form.instructions}
            onChange={e => setF('instructions', e.target.value)}
            placeholder="e.g. Take after meals, avoid driving…" style={{ resize: 'vertical' }} />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 22px' }}
            onClick={handleGenPDF} id="admin-gen-pdf">
            <Download size={18} /> Generate PDF
          </button>
          <button onClick={handleWA} style={{
            background: '#25D366', color: '#fff', border: 'none', borderRadius: 8,
            padding: '11px 22px', fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontWeight: 600, fontSize: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <MessageSquare size={18} /> WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Payments Tab ───────────────────────────────────────── */
function PaymentsTab() {
  const payments = getPayments();
  const paid = payments.filter(p => p.status === 'Paid');
  const pending = payments.filter(p => p.status === 'Pending');
  const thisMonth = paid.reduce((s, p) => s + p.amount, 0);
  const thisWeek = paid.slice(-4).reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: '#0B1D3A', marginBottom: 6 }}>Payments</h1>
      <p style={{ color: '#64748B', fontSize: 14, marginBottom: 24 }}>Revenue overview and payment tracking</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'This Week', val: `Rs ${thisWeek.toLocaleString()}`, icon: <Calendar size={18} color="#0D9488" />, bg: '#CCFBF1' },
          { label: 'This Month', val: `Rs ${thisMonth.toLocaleString()}`, icon: <Calendar size={18} color="#2563EB" />, bg: '#DBEAFE' },
          { label: 'Pending', val: `Rs ${pending.reduce((s, p) => s + p.amount, 0).toLocaleString()}`, icon: <Clock size={18} color="#D97706" />, bg: '#FEF3C7' },
        ].map(m => (
          <div key={m.label} className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ color: '#64748B', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#0B1D3A' }}>{m.val}</div>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{m.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ overflow: 'auto' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', fontWeight: 700, color: '#0B1D3A' }}>Payment History</div>
        <table className="tbl">
          <thead><tr>{['Date', 'Patient', 'Service', 'Amount', 'Status'].map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id}>
                <td>{p.date}</td>
                <td style={{ fontWeight: 600 }}>{p.patient}</td>
                <td>{p.service}</td>
                <td style={{ fontWeight: 700, color: '#0B1D3A' }}>Rs {p.amount.toLocaleString()}</td>
                <td><span className={p.status === 'Paid' ? 'badge-green' : 'badge-amber'}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Admin Dashboard (main export) ─────────────────────── */
export default function AdminDashboard() {
  const [tab, setTab] = useState('overview');
  const [tick, setTick] = useState(0);
  const [prescribeFor, setPrescribeFor] = useState(null);
  const navigate = useNavigate();

  const refresh = () => setTick(t => t + 1);

  const appts = getAppointments();
  const patients = getUsers();

  const handlePrescribe = (entity) => {
    setPrescribeFor(entity);
    setTab('prescription');
  };

  const navItems = [
    { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Overview' },
    { id: 'appointments', icon: <Calendar size={18} />, label: 'Appointments' },
    { id: 'patients', icon: <Users size={18} />, label: 'Patient Records' },
    { id: 'prescription', icon: <FileText size={18} />, label: 'Write Prescription' },
    { id: 'payments', icon: <CreditCard size={18} />, label: 'Payments' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, background: '#0B1D3A', display: 'flex', flexDirection: 'column',
        padding: '28px 0', flexShrink: 0, position: 'fixed', top: 0, left: 0,
        height: '100vh', overflow: 'auto', boxShadow: '4px 0 24px rgba(0,0,0,0.2)',
      }}>
        {/* Logo */}
        <div style={{ padding: '0 20px', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg,#0D9488,#0B1D3A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><Brain size={18} color="#fff" /></div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>NeuroCore</div>
              <div style={{ color: '#0D9488', fontSize: 10 }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Doctor avatar */}
        <div style={{ padding: '0 20px', marginBottom: 24, textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', margin: '0 auto 10px',
            background: 'linear-gradient(135deg,#D97706,#92400E)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 3px rgba(217,119,6,0.3)',
            overflow: 'hidden',
          }}>
            <img src="/assets/doctor.jpg" alt="Dr. Tabraiz" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Dr. Tabraiz W. Shah</div>
          <div style={{ color: '#D97706', fontSize: 11, marginTop: 2, fontWeight: 600 }}>Super Admin</div>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '0 20px 16px' }} />

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
          <div className="sidebar-item" onClick={() => navigate('/')}
            style={{ color: '#DC2626' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          ><LogOut size={18} /><span>Exit Admin</span></div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: 240, padding: '32px', minHeight: '100vh' }}>
        {tab === 'overview' && <OverviewTab appts={appts} patients={patients} onPrescribe={handlePrescribe} />}
        {tab === 'appointments' && <AppointmentsTab appts={appts} refresh={refresh} />}
        {tab === 'patients' && <PatientsTab patients={patients} onPrescribe={handlePrescribe} />}
        {tab === 'prescription' && <PrescriptionTab prefillPatient={prescribeFor} clearPrefill={() => setPrescribeFor(null)} />}
        {tab === 'payments' && <PaymentsTab />}
      </main>
    </div>
  );
}
