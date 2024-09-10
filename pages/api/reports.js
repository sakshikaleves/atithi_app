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

  const { start, end } = req.query;

  if (req.method === 'GET') {
    try {
      const result = await db.query(
        'SELECT * FROM visitors WHERE check_in_time BETWEEN $1 AND $2',
        [start, end]
      );
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).json({ message: 'Error fetching reports' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
