import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const client = await pool.connect();
    const { name, email, phone, visitDate, purpose, comingFrom, idType, visitorId, checkInTime, checkOutTime, photo } = req.body;

    console.log('Received data:', req.body);

    try {
      await client.query('BEGIN');
      console.log('Transaction started.');

      const insertQuery = `
        INSERT INTO visitors (name, email, phone, visit_date, purpose, coming_from, id_type, visitor_id, check_in_time, check_out_time, photo)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *;
      `;
      const values = [name, email, phone, visitDate, purpose, comingFrom, idType, visitorId, checkInTime, checkOutTime, photo];

      const result = await client.query(insertQuery, values);
      await client.query('COMMIT');
      console.log('Transaction committed.');

      console.log('Visitor added successfully:', result.rows[0]);

      res.status(201).json({ message: 'Visitor added successfully', visitor: result.rows[0] });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error adding visitor:', error);
      res.status(500).json({ message: 'Error adding visitor', error: error.message });
    } finally {
      client.release();
      console.log('Client released.');
    }
  } else if (req.method === 'GET') {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM visitors');
      client.release();
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching visitors:', error);
      res.status(500).json({ message: 'Error fetching visitors', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
