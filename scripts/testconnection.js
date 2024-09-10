const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://sakshi:sakshi@localhost:5432/atithi',
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connection successful:', res.rows[0]);
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    pool.end();
  }
};

testConnection();
