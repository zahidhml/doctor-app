// ── localStorage helpers ────────────────────────────────────────────
export const LS = {
  get: (key, fallback = null) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
  remove: (key) => localStorage.removeItem(key),
};

// ── Users ───────────────────────────────────────────────────────────
export const getUsers = () => LS.get('nc_users', []);
export const saveUsers = (users) => LS.set('nc_users', users);

export const registerUser = ({ name, phone, cnic, password }) => {
  const users = getUsers();
  if (users.find(u => u.phone === phone)) return { error: 'Phone already registered' };
  const id = 'PT-' + Date.now();
  const newUser = { id, name, phone, cnic, password, appointments: [], prescriptions: [], notes: '', city: '', bloodGroup: '' };
  saveUsers([...users, newUser]);
  return { user: newUser };
};

export const loginUser = ({ phone, password }) => {
  const users = getUsers();
  const user = users.find(u => u.phone === phone && u.password === password);
  if (!user) return { error: 'Invalid credentials' };
  return { user };
};

export const updateUser = (updatedUser) => {
  const users = getUsers();
  saveUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
};

// ── Current session ─────────────────────────────────────────────────
export const getSession = () => LS.get('nc_session', null);
export const setSession = (user) => LS.set('nc_session', user);
export const clearSession = () => LS.remove('nc_session');

// ── Appointments (global list for admin) ────────────────────────────
export const getAppointments = () => LS.get('nc_appointments', []);
export const saveAppointments = (arr) => LS.set('nc_appointments', arr);

export const addAppointment = (appt) => {
  const all = getAppointments();
  const newAppt = { ...appt, id: 'APT-' + Date.now(), status: 'Confirmed' };
  saveAppointments([...all, newAppt]);
  // also attach to user
  const users = getUsers();
  saveUsers(users.map(u => u.id === appt.patientId
    ? { ...u, appointments: [...(u.appointments || []), newAppt] } : u));
  return newAppt;
};

export const updateAppointmentStatus = (id, status) => {
  const all = getAppointments();
  saveAppointments(all.map(a => a.id === id ? { ...a, status } : a));
};

export const deleteAppointment = (id) => {
  saveAppointments(getAppointments().filter(a => a.id !== id));
};

// ── Prescriptions ───────────────────────────────────────────────────
export const getPrescriptions = () => LS.get('nc_prescriptions', []);
export const savePrescriptions = (arr) => LS.set('nc_prescriptions', arr);

export const addPrescription = (rx) => {
  const all = getPrescriptions();
  const newRx = { ...rx, id: 'RX-' + Date.now(), date: new Date().toISOString() };
  savePrescriptions([...all, newRx]);
  // also attach to user prescriptions list
  const users = getUsers();
  saveUsers(users.map(u => u.id === rx.patientId
    ? { ...u, prescriptions: [...(u.prescriptions || []), newRx] } : u));
  return newRx;
};

// ── Payments ─────────────────────────────────────────────────────────
export const getPayments = () => LS.get('nc_payments', [
  { id: 'PAY-001', date: '2026-04-28', patient: 'Ahmed Raza', service: 'Consultation', amount: 1500, status: 'Paid' },
  { id: 'PAY-002', date: '2026-04-28', patient: 'Sara Bibi',  service: 'EEG Report',   amount: 3000, status: 'Paid' },
  { id: 'PAY-003', date: '2026-04-29', patient: 'Tariq Khan', service: 'Follow-up',    amount: 800,  status: 'Pending' },
  { id: 'PAY-004', date: '2026-04-30', patient: 'Hina Malik', service: 'Consultation', amount: 1500, status: 'Paid' },
]);
