// pages/api/visitors/[id].js
//E:\super_admin\new_pro\pages\api\visitors\[id].js
import db from '../../../lib/db';
import { verifyToken } from '../../../utils/jwt';

export default async function handler(req, res) {
  const { id } = req.query;
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
  console.log('Client ID:', clientId); // Log the client ID for debugging

  if (req.method === 'PUT') {
    const { checkOutTime } = req.body;

    if (!checkOutTime) {
      return res.status(400).json({ message: 'Check-out time is required' });
    }

    try {
      const query = `
        UPDATE visitors
        SET check_out_time = $1
        WHERE id = $2 AND client_id = $3 RETURNING *
      `;
      const values = [checkOutTime, id, clientId];
      const result = await db.query(query, values);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Visitor not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error updating visitor:', error);
      res.status(500).json({ message: 'Error updating visitor' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
