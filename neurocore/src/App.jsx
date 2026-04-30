import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home.jsx';
import PatientDashboard from './pages/PatientDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import { getSession } from './utils/storage.js';

export default function App() {
  const [session, setSession] = useState(() => getSession());

  useEffect(() => {
    const sync = () => setSession(getSession());
    window.addEventListener('nc_session_change', sync);
    return () => window.removeEventListener('nc_session_change', sync);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home session={session} setSession={setSession} />} />
      <Route path="/patient" element={session ? <PatientDashboard session={session} setSession={setSession} /> : <Navigate to="/" />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
