// pages/api/generateVisitorPass.js
//E:\super_admin\new_pro\pages\api\generateVisitorPass.js

import { jsPDF } from 'jspdf';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { visitor } = req.body;

    const doc = new jsPDF();
    doc.text('Visitor Info', 10, 10);
    doc.text(`Name: ${visitor.name}`, 10, 20);
    doc.text(`Email: ${visitor.email}`, 10, 30);
    doc.text(`Phone: ${visitor.phone}`, 10, 40);
    doc.text(`Purpose: ${visitor.purpose}`, 10, 50);
    doc.text(`Coming From: ${visitor.coming_from}`, 10, 60);
    doc.text(`ID Type: ${visitor.id_type}`, 10, 70);
    doc.text(`Visitor ID: ${visitor.visitor_id}`, 10, 80);
    doc.text(`Check-In Time: ${new Date(visitor.check_in_time).toLocaleString()}`, 10, 90);
    doc.text(`Check-Out Time: ${visitor.check_out_time ? new Date(visitor.check_out_time).toLocaleString() : 'N/A'}`, 10, 100);

    const pdf = doc.output('blob');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Visitor_Pass_${visitor.visitor_id}.pdf`);
    res.send(pdf);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
