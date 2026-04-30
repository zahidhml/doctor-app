import { useState } from 'react';
import { registerUser, loginUser, setSession, addAppointment } from '../utils/storage.js';
import { useNavigate } from 'react-router-dom';

export default function AuthModal({ onClose, pendingAppt, setSession: updateSession }) {
  const [tab, setTab] = useState('register');
  const [form, setForm] = useState({ name: '', cnic: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError(''); };

  const handleRegister = () => {
    if (!form.name || !form.cnic || !form.phone || !form.password) {
      setError('All fields are required.'); return;
    }
    setLoading(true);
    const res = registerUser(form);
    setLoading(false);
    if (res.error) { setError(res.error); return; }
    finalize(res.user);
  };

  const handleLogin = () => {
    if (!form.phone || !form.password) { setError('Phone and password required.'); return; }
    setLoading(true);
    const res = loginUser({ phone: form.phone, password: form.password });
    setLoading(false);
    if (res.error) { setError(res.error); return; }
    finalize(res.user);
  };

  const finalize = (user) => {
    if (pendingAppt) {
      addAppointment({
        ...pendingAppt,
        patientId: user.id,
        patientName: user.name,
        phone: user.phone,
        doctor: 'Dr. Tabraiz Wali Shah',
      });
    }
    setSession(user);
    updateSession(user);
    onClose();
    navigate('/patient');
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 420 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: '#0B1D3A' }}>
            {tab === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button onClick={onClose} style={{
            width: 30, height: 30, borderRadius: '50%', border: '1.5px solid #E2E8F0',
            background: 'none', cursor: 'pointer', fontSize: 18, color: '#64748B',
          }}>×</button>
        </div>
        <p style={{ color: '#64748B', fontSize: 13, marginBottom: 22 }}>
          {tab === 'login' ? 'Sign in to access your patient portal.' : 'Register to book and manage appointments.'}
        </p>

        {/* Tabs */}
        <div style={{
          display: 'flex', background: '#F1F5F9', borderRadius: 10, padding: 4, marginBottom: 24,
        }}>
          {['register', 'login'].map(t => (
            <button key={t} onClick={() => { setTab(t); setError(''); }}
              style={{
                flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 14,
                background: tab === t ? '#0D9488' : 'transparent',
                color: tab === t ? '#fff' : '#64748B',
                transition: 'all 0.2s',
              }}
            >{t === 'register' ? 'Register' : 'Login'}</button>
          ))}
        </div>

        {/* Fields */}
        {tab === 'register' && (
          <div>
            {[
              { k: 'name',     label: 'Full Name',    type: 'text', ph: 'Ahmed Khan' },
              { k: 'cnic',     label: 'CNIC Number',  type: 'text', ph: '12345-1234567-1' },
              { k: 'phone',    label: 'Phone Number', type: 'tel',  ph: '0345-XXXXXXX' },
              { k: 'password', label: 'Password',     type: 'password', ph: '••••••••' },
            ].map(f => (
              <div key={f.k} style={{ marginBottom: 14 }}>
                <label style={lbl}>{f.label}</label>
                <input className="input-field" type={f.type} placeholder={f.ph}
                  value={form[f.k]} onChange={e => set(f.k, e.target.value)} />
              </div>
            ))}
            {error && <div style={{ color: '#DC2626', fontSize: 13, marginBottom: 10 }}>⚠️ {error}</div>}
            <button className="btn-primary" style={{ width: '100%', marginTop: 4 }}
              onClick={handleRegister} disabled={loading} id="auth-register-btn">
              {loading ? 'Creating Account…' : 'Create Account & Confirm Appointment'}
            </button>
          </div>
        )}

        {tab === 'login' && (
          <div>
            {[
              { k: 'phone',    label: 'Phone Number', type: 'tel',      ph: '03XX-XXXXXXX' },
              { k: 'password', label: 'Password',     type: 'password', ph: '••••••••' },
            ].map(f => (
              <div key={f.k} style={{ marginBottom: 14 }}>
                <label style={lbl}>{f.label}</label>
                <input className="input-field" type={f.type} placeholder={f.ph}
                  value={form[f.k]} onChange={e => set(f.k, e.target.value)} />
              </div>
            ))}
            {error && <div style={{ color: '#DC2626', fontSize: 13, marginBottom: 10 }}>⚠️ {error}</div>}
            <button className="btn-primary" style={{ width: '100%', marginTop: 4 }}
              onClick={handleLogin} disabled={loading} id="auth-login-btn">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </div>
        )}

        <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: 12, marginTop: 16 }}>
          {tab === 'register'
            ? <>Already have an account? <span style={{ color: '#0D9488', cursor: 'pointer', fontWeight: 600 }} onClick={() => setTab('login')}>Login</span></>
            : <>Don't have an account? <span style={{ color: '#0D9488', cursor: 'pointer', fontWeight: 600 }} onClick={() => setTab('register')}>Register</span></>
          }
        </p>
      </div>
    </div>
  );
}

const lbl = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 };
