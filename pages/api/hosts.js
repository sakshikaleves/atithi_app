import db from '../../lib/db';
import { verifyToken } from '../../utils/jwt';

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const clientId = decodedToken.clientId;

  if (req.method === 'GET') {
    try {
      const result = await db.query('SELECT * FROM host WHERE client_id = $1', [clientId]);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching hosts:', error);
      res.status(500).json({ message: 'Error fetching hosts' });
    }
  } else if (req.method === 'POST') {
    const { name, mobile, phone, email, department, image } = req.body;

    console.log('Incoming data:', req.body); // Log the incoming data for debugging

    if (!name || !mobile || !phone || !email || !department) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const query = `
        INSERT INTO host (name, mobile, phone, email, department, image, client_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
      `;
      const values = [name, mobile, phone, email, department, image, clientId];
      const result = await db.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding host:', error);
      res.status(500).json({ message: 'Error adding host' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
