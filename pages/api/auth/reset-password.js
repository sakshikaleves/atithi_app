import db from '../../../lib/db';
import bcrypt from 'bcryptjs';
import { verifyToken } from '../../../utils/jwt';

export default async function handler(req, res) {
  const { token, newPassword } = req.body;

  try {
    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const query = 'UPDATE clients SET password = $1 WHERE id = $2 RETURNING *';
    const values = [hashedPassword, decodedToken.clientId];

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
