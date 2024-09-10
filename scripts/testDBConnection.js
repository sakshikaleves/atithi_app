// scripts/testDBConnection.js

const db = require('../lib/db');

async function testConnection() {
  try {
    const result = await db.query('SELECT NOW()');
    console.log('Database connection successful:', result.rows[0]);
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

testConnection();
