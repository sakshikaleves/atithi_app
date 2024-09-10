// scripts/testQuery.js
const { Pool } = require('pg');
require('dotenv').config({ path: './.env.local' });

const pool = new Pool({
  user: 'sakshi',
  host: 'localhost',
  database: 'atithi',
  password: 'sakshi',
  port: 5432,
});

async function testQuery() {
  const email = 'admin'; // Use an email that exists in your database
  const query = 'SELECT * FROM super_admin WHERE email = $1';
  const values = [email];

  try {
    const result = await pool.query(query, values);
    console.log('Query result:', result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
  } finally {
    pool.end();
  }
}

testQuery().catch(err => {
  console.error(err);
  pool.end();
});
