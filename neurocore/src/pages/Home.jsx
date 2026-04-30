import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Timetable from '../components/Timetable.jsx';
import Services from '../components/Services.jsx';
import About from '../components/About.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import BookingModal from '../components/BookingModal.jsx';
import AuthModal from '../components/AuthModal.jsx';

export default function Home({ session, setSession }) {
  const [showBook, setShowBook] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [pendingAppt, setPendingAppt] = useState(null);

  const handleAuthNeeded = (apptData) => {
    setPendingAppt(apptData);
    setShowBook(false);
    setShowAuth(true);
  };

  return (
    <div>
      <Navbar
        onBook={() => setShowBook(true)}
        onLogin={() => setShowAuth(true)}
      />

      <Hero onBook={() => setShowBook(true)} />
      <Timetable />
      <Services />
      <About />
      <Contact />
      <Footer />

      {showBook && (
        <BookingModal
          onClose={() => setShowBook(false)}
          onAuthNeeded={handleAuthNeeded}
          prefill={session ? { name: session.name, phone: session.phone, cnic: session.cnic } : {}}
        />
      )}

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          pendingAppt={pendingAppt}
          setSession={setSession}
        />
      )}
    </div>
  );
}
