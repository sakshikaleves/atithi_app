const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './.env.local' });

const pool = new Pool({
  user: 'sakshi',
  host: 'localhost',
  database: 'atithi',
  password: 'sakshi',
  port: 5432,
});

async function addSuperAdmin() {
  const email = 'sakshi';
  const password = 'sakshi';
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO superadmin (email, password) VALUES ($1, $2) RETURNING *';
  const values = [email, hashedPassword];

  try {
    const res = await pool.query(query, values);
    console.log('SuperAdmin added:', res.rows[0]);
  } catch (err) {
    console.error('Error adding SuperAdmin:', err);
  } finally {
    pool.end();
  }
}

addSuperAdmin().catch(err => {
  console.error(err);
  pool.end();
});
