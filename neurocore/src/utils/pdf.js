import jsPDF from 'jspdf';

export const generatePrescriptionPDF = ({ doctorName, credentials, clinic, patientName, diagnosis, medicines, instructions, date, prescriptionId }) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const W = 210; const margin = 20;

  // Header background
  doc.setFillColor(11, 29, 58);
  doc.rect(0, 0, W, 48, 'F');

  // Doctor name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(doctorName || 'Dr. Tabraiz Wali Shah', margin, 18);

  // Credentials
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(204, 251, 241);
  doc.text(credentials || 'MBBS (KMC) · FCPS Neurosurgery · Consultant Neurosurgeon', margin, 27);

  // Clinic
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(clinic || 'NeuroCore Neurosurgery Clinic | Peshawar & Chitral', margin, 36);
  doc.text('📞 0345-0526102', margin, 43);

  // Divider
  doc.setDrawColor(13, 148, 136);
  doc.setLineWidth(0.8);
  doc.line(margin, 54, W - margin, 54);

  // Rx symbol
  doc.setTextColor(13, 148, 136);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text('Rx', margin, 72);

  // Meta
  let y = 68;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  doc.text(`Patient: ${patientName || '—'}`, margin + 20, y);
  doc.text(`Date: ${date || new Date().toLocaleDateString()}`, W - margin - 50, y);
  y += 8;
  doc.text(`Diagnosis: ${diagnosis || '—'}`, margin + 20, y);
  doc.text(`ID: ${prescriptionId || 'RX-' + Date.now()}`, W - margin - 50, y);

  // Divider
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, y + 6, W - margin, y + 6);

  y += 18;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(11, 29, 58);
  doc.text('Medicines:', margin, y);

  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  (medicines || []).forEach((med, i) => {
    if (!med.trim()) return;
    doc.text(`${i + 1}.  ${med}`, margin + 6, y);
    y += 8;
  });

  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(11, 29, 58);
  doc.text('Instructions:', margin, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const lines = doc.splitTextToSize(instructions || '—', W - margin * 2);
  doc.text(lines, margin, y);
  y += lines.length * 6 + 12;

  // Signature line
  doc.setDrawColor(11, 29, 58);
  doc.setLineWidth(0.5);
  doc.line(W - margin - 50, y, W - margin, y);
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Doctor Signature', W - margin - 50, y + 5);

  // Footer
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 276, W, 21, 'F');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('This prescription is digitally generated. Keep it safe for future reference.', W / 2, 285, { align: 'center' });
  doc.text('NeuroCore Neurosurgery Clinic © 2026', W / 2, 291, { align: 'center' });

  doc.save(`Prescription_${patientName || 'Patient'}_${Date.now()}.pdf`);
};

export const whatsAppPrescription = ({ patientName, diagnosis, medicines, instructions, phone }) => {
  const medList = (medicines || []).filter(m => m.trim()).map((m, i) => `${i + 1}. ${m}`).join('\n');
  const text = `🏥 *NeuroCore Neurosurgery Clinic*\n👨‍⚕️ *Dr. Tabraiz Wali Shah*\nMBBS (KMC) · FCPS Neurosurgery\n\n📋 *PRESCRIPTION*\n\n👤 Patient: ${patientName}\n🔬 Diagnosis: ${diagnosis}\n\n💊 *Medicines:*\n${medList}\n\n📝 *Instructions:*\n${instructions || '—'}\n\n_Please follow the prescribed medicines as directed._`;
  const num = (phone || '923451234567').replace(/\D/g, '');
  window.open(`https://wa.me/${num}?text=${encodeURIComponent(text)}`, '_blank');
};
