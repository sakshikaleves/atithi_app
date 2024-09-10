// // lib/db.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.local' });

const pool = new Pool({
  user: 'sakshi',
  host: 'localhost',
  database: 'atithi',
  password: 'sakshi',
  port: 5432,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default {
  query: (text, params) => pool.query(text, params),
};
//E:\super_admin\new_pro\lib\db.js
// lib/db.js

// const { Pool } = require('pg');
// const dotenv = require('dotenv');

// dotenv.config({ path: './.env.local' });

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// pool.on('error', (err) => {
//   console.error('Unexpected error on idle client', err);
//   process.exit(-1);
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };
