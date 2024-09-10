// import db from '../../lib/db';

// const handler = async (req, res) => {
//   const { clientId } = req.query;

//   if (!clientId) {
//     return res.status(400).json({ message: 'Client ID is required' });
//   }

//   try {
//     // Fetch visitors for the given clientId
//     const query = 'SELECT * FROM visitors WHERE client_id = $1';
//     const values = [clientId];
//     const result = await db.query(query, values);

//     if (result.rows.length === 0) {
//       // Add sample data if no visitors are found
//       const sampleVisitors = [
//         {
//           id: 1,
//           name: 'John Doe',
//           comingFrom: 'New York',
//           purpose: 'Meeting',
//           host: 'Jane Smith',
//           idType: 'Passport',
//           visitorId: 'A1234567',
//           checkedIn: '2023-07-20 09:00:00',
//           checkedOut: '2023-07-20 17:00:00',
//         },
//       ];
//       return res.status(200).json({ visitors: sampleVisitors });
//     }

//     res.status(200).json({ visitors: result.rows });
//   } catch (error) {
//     console.error('Error fetching visitors:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// export default handler;
// pages/api/visitors.js
// /pages/api/visitors.js
// import db from '../../lib/db';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const result = await db.query('SELECT * FROM visitors');
//       res.status(200).json(result.rows);
//     } catch (error) {
//       console.error('Error fetching visitors:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else if (req.method === 'POST') {
//     const { name, email, phone, visitDate, purpose, photo } = req.body;
//     try {
//       await db.query(
//         'INSERT INTO visitors (name, email, phone, visit_date, purpose, photo) VALUES ($1, $2, $3, $4, $5, $6)',
//         [name, email, phone, visitDate, purpose, photo]
//       );
//       res.status(201).json({ message: 'Visitor added successfully' });
//     } catch (error) {
//       console.error('Error adding visitor:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET', 'POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


// pages/api/visitors.js
// pages/api/visitors.js
// import db from '../../lib/db';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const result = await db.query('SELECT * FROM visitors');
//       res.status(200).json(result.rows);
//     } catch (error) {
//       console.error('Error fetching visitors:', error);
//       res.status(500).json({ message: 'Error fetching visitors' });
//     }
//   } else if (req.method === 'POST') {
//     const {
//       name,
//       email,
//       phone,
//       visitDate,
//       purpose,
//       comingFrom,
//       idType,
//       visitorId,
//       checkInTime,
//       checkOutTime,
//       photo,
//     } = req.body;

//     if (
//       !name ||
//       !email ||
//       !phone ||
//       !visitDate ||
//       !purpose ||
//       !comingFrom ||
//       !idType ||
//       !visitorId ||
//       !checkInTime ||
//       !checkOutTime ||
//       !photo
//     ) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//       const query = `
//         INSERT INTO visitors (name, email, phone, visit_date, purpose, coming_from, id_type, visitor_id, check_in_time, check_out_time, photo)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *
//       `;
//       const values = [
//         name,
//         email,
//         phone,
//         visitDate,
//         purpose,
//         comingFrom,
//         idType,
//         visitorId,
//         checkInTime,
//         checkOutTime,
//         photo,
//       ];
//       const result = await db.query(query, values);
//       res.status(201).json(result.rows[0]);
//     } catch (error) {
//       console.error('Error adding visitor:', error);
//       res.status(500).json({ message: 'Error adding visitor' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
//E:\super_admin\new_pro\pages\api\visitors.js

//E:\super_admin\new_pro\pages\api\visitors.js
// import db from '../../lib/db';
// import authenticateUser from '../../middleware/authenticateUser';

// export default async function handler(req, res) {
//   await authenticateUser(req, res, async () => {
//     const clientId = req.clientId;

//     if (req.method === 'GET') {
//       try {
//         const result = await db.query('SELECT * FROM visitors WHERE client_id = $1', [clientId]);
//         res.status(200).json(result.rows);
//       } catch (error) {
//         console.error('Error fetching visitors:', error);
//         res.status(500).json({ message: 'Error fetching visitors' });
//       }
//     } else if (req.method === 'POST') {
//       const {
//         name,
//         email,
//         phone,
//         purpose,
//         comingFrom,
//         idType,
//         visitorId,
//         checkInTime,
//         checkOutTime,
//         photo,
//       } = req.body;

//       if (
//         !name ||
//         !email ||
//         !phone ||
//         !purpose ||
//         !comingFrom ||
//         !idType ||
//         !visitorId ||
//         !checkInTime ||
//         !checkOutTime ||
//         !photo
//       ) {
//         return res.status(400).json({ message: 'All fields are required' });
//       }

//       try {
//         const query = `
//           INSERT INTO visitors (client_id, name, email, phone, purpose, coming_from, id_type, visitor_id, check_in_time, check_out_time, photo)
//           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *
//         `;
//         const values = [
//           clientId,
//           name,
//           email,
//           phone,
//           purpose,
//           comingFrom,
//           idType,
//           visitorId,
//           checkInTime,
//           checkOutTime,
//           photo,
//         ];
//         const result = await db.query(query, values);
//         res.status(201).json(result.rows[0]);
//       } catch (error) {
//         console.error('Error adding visitor:', error);
//         res.status(500).json({ message: 'Error adding visitor' });
//       }
//     } else {
//       res.status(405).json({ message: 'Method not allowed' });
//     }
//   });
// }

// E:\super_admin\new_pro\pages\api\visitors.js
// import db from '../../lib/db';
// import { verifyToken } from '../../utils/jwt';

// export default async function handler(req, res) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   const token = authHeader.split(' ')[1];
//   const decodedToken = verifyToken(token);

//   if (!decodedToken) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   const clientId = decodedToken.clientId;
//   console.log('Client ID:', clientId); // Log the client ID for debugging

//   if (req.method === 'GET') {
//     try {
//       const result = await db.query('SELECT * FROM visitors WHERE client_id = $1', [clientId]);
//       res.status(200).json(result.rows);
//     } catch (error) {
//       console.error('Error fetching visitors:', error);
//       res.status(500).json({ message: 'Error fetching visitors' });
//     }
//   } else if (req.method === 'POST') {
//     const {
//       name,
//       email,
//       phone,
//       purpose,
//       comingFrom,
//       idType,
//       visitorId,
//       checkInTime,
//       checkOutTime,
//       photo,
//     } = req.body;

//     console.log('Incoming data:', req.body); // Log the incoming data for debugging

//     if (
//       !name ||
//       !email ||
//       !phone ||
//       !purpose ||
//       !comingFrom ||
//       !idType ||
//       !visitorId ||
//       !checkInTime ||
//       !photo
//     ) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//       const query = `
//         INSERT INTO visitors (name, email, phone, purpose, coming_from, id_type, visitor_id, check_in_time, check_out_time, photo, client_id)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *
//       `;
//       const values = [
//         name,
//         email,
//         phone,
//         purpose,
//         comingFrom,
//         idType,
//         visitorId,
//         checkInTime,
//         checkOutTime || null,
//         photo,
//         clientId,
//       ];
//       const result = await db.query(query, values);
//       res.status(201).json(result.rows[0]);
//     } catch (error) {
//       console.error('Error adding visitor:', error);
//       res.status(500).json({ message: 'Error adding visitor' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }


// 


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
  console.log('Client ID:', clientId); // Log the client ID for debugging

  if (req.method === 'GET') {
    try {
      const result = await db.query('SELECT * FROM visitors WHERE client_id = $1', [clientId]);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching visitors:', error);
      res.status(500).json({ message: 'Error fetching visitors' });
    }
  } else if (req.method === 'POST') {
    const {
      name,
      email,
      phone,
      purpose,
      comingFrom,
      idType,
      visitorId,
      checkInTime,
      photo,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !purpose ||
      !comingFrom ||
      !idType ||
      !visitorId ||
      !checkInTime ||
      !photo
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const query = `
        INSERT INTO visitors (name, email, phone, purpose, coming_from, id_type, visitor_id, check_in_time, check_out_time, photo, client_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *
      `;
      const values = [
        name,
        email,
        phone,
        purpose,
        comingFrom,
        idType,
        visitorId,
        checkInTime,
        null,
        photo,
        clientId,
      ];
      const result = await db.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding visitor:', error);
      res.status(500).json({ message: 'Error adding visitor' });
    }
  } else if (req.method === 'PUT') {
    const { id } = req.query;
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




