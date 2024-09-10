// E:\super_admin\new_pro\pages\api\add-clients-backend.js

import db from '../../lib/db';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const result = await db.query('SELECT * FROM clients');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching clients:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await db.query('DELETE FROM clients WHERE id = $1', [id]);
      res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
      console.error('Error deleting client:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
