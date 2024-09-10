// pages/api/clients/[clientID].js
import db from '../../../lib/db';

const handler = async (req, res) => {
  const { method, query: { clientID } } = req;

  if (method === 'GET') {
    try {
      const query = 'SELECT * FROM clients WHERE id = $1';
      const values = [clientID];
      const result = await db.query(query, values);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Client not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching client:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
