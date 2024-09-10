//E:\super_admin\new_pro\pages\api\auth\signin.js


import db from '../../../lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    // Check clients table
    const query = 'SELECT * FROM clients WHERE email = $1';
    const values = [email];
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const client = result.rows[0];
    const isValid = await bcrypt.compare(password, client.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Authentication successful, respond with client data
    return res.status(200).json({ message: 'Login successful', clientId: client.id });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
