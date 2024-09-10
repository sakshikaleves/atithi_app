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

async function updateSuperAdminPassword() {
  const email = 'sakshi';  // Replace with your superadmin email
  const plainPassword = 'sakshi';  // Replace with your superadmin plain password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const query = 'UPDATE superadmin SET password = $1 WHERE email = $2 RETURNING *';
  const values = [hashedPassword, email];

  try {
    const res = await pool.query(query, values);
    console.log('Superadmin password updated:', res.rows[0]);
  } catch (err) {
    console.error('Error updating superadmin password:', err);
  } finally {
    pool.end();
  }
}

updateSuperAdminPassword().catch(err => {
  console.error(err);
  pool.end();
});
