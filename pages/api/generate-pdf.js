import { jsPDF } from 'jspdf';
import db from '../../lib/db'; // Import your PostgreSQL database connection

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    // Fetch visitor details from your database using the id
    const visitor = await getVisitorById(id);

    if (!visitor) {
      return res.status(404).json({ error: 'Visitor not found' });
    }

    // Generate PDF
    const doc = new jsPDF();

    // Include visitor's photo if available
    if (visitor.photo) {
      const imgData = visitor.photo;
      doc.addImage(imgData, 'JPEG', 10, 10, 50, 50);
    }

    doc.text('Visitor Info', 10, 70);
    doc.text(`Name: ${visitor.name}`, 10, 80);
    doc.text(`Email: ${visitor.email}`, 10, 90);
    doc.text(`Phone: ${visitor.phone}`, 10, 100);
    doc.text(`Purpose: ${visitor.purpose}`, 10, 110);
    doc.text(`Coming From: ${visitor.coming_from}`, 10, 120);
    doc.text(`ID Type: ${visitor.id_type}`, 10, 130);
    doc.text(`Visitor ID: ${visitor.visitor_id}`, 10, 140);
    doc.text(`Check-In Time: ${new Date(visitor.check_in_time).toLocaleString()}`, 10, 150);
    doc.text(`Check-Out Time: ${visitor.check_out_time ? new Date(visitor.check_out_time).toLocaleString() : 'N/A'}`, 10, 160);

    const pdfOutput = doc.output();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=visitor_${id}.pdf`);
    res.send(Buffer.from(pdfOutput, 'binary'));
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getVisitorById(id) {
  try {
    const result = await db.query('SELECT * FROM visitors WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching visitor by ID:', error);
    return null;
  }
}
