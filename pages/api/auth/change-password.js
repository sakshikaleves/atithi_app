// import db from '../../../lib/db';
// import bcrypt from 'bcryptjs';

// export default async function handler(req, res) {
//   const { clientId, newPassword } = req.body;

//   try {
//     if (!clientId || !newPassword) {
//       return res.status(400).json({ message: 'Client ID and new password are required' });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     const query = 'UPDATE clients SET password = $1 WHERE id = $2 RETURNING *';
//     const values = [hashedPassword, clientId];

//     const result = await db.query(query, values);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Client not found' });
//     }

//     res.status(200).json({ message: 'Password changed successfully' });
//   } catch (error) {
//     console.error('Error changing password:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// }

// import db from '../../../lib/db';
// import bcrypt from 'bcryptjs';

// export default async function handler(req, res) {
//   const { clientId, newPassword } = req.body;

//   try {
//     if (!clientId || !newPassword) {
//       return res.status(400).json({ message: 'Client ID and new password are required' });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     const query = 'UPDATE clients SET password = $1 WHERE id = $2 RETURNING *';
//     const values = [hashedPassword, clientId];

//     const result = await db.query(query, values);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Client not found' });
//     }

//     res.status(200).json({ message: 'Password changed successfully' });
//   } catch (error) {
//     console.error('Error changing password:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// }

import db from '../../../lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  const { clientId, newPassword } = req.body;

  try {
    if (!clientId || !newPassword) {
      return res.status(400).json({ message: 'Client ID and new password are required' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const query = 'UPDATE clients SET password = $1, first_login = false WHERE id = $2 RETURNING *';
    const values = [hashedPassword, clientId];

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
