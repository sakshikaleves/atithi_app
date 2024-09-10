
// // import db from '../../lib/db';

// // export default async function handler(req, res) {
// //   if (req.method === 'POST') {
// //     const { name, address, email, licenseTo, licenseFrom, generalInstructions, isActive } = req.body;

// //     const query = `
// //       INSERT INTO clients (name, address, email, license_to, license_from, general_instructions, is_active)
// //       VALUES ($1, $2, $3, $4, $5, $6, $7)
// //       RETURNING *;
// //     `;
// //     const values = [name, address, email, licenseTo, licenseFrom, generalInstructions, isActive];

// //     try {
// //       const result = await db.query(query, values);
// //       res.status(201).json({ message: 'Client added successfully', client: result.rows[0] });
// //     } catch (error) {
// //       console.error('Error adding client:', error);
// //       res.status(500).json({ message: 'Error adding client', error: error.message });
// //     }
// //   } else if (req.method === 'GET') {
// //     try {
// //       const result = await db.query('SELECT * FROM clients');
// //       res.status(200).json(result.rows);
// //     } catch (error) {
// //       console.error('Error fetching clients:', error);
// //       res.status(500).json({ message: 'Error fetching clients' });
// //     }
// //   } else {
// //     res.setHeader('Allow', ['POST', 'GET']);
// //     res.status(405).end(`Method ${req.method} Not Allowed`);
// //   }
// // }

// import db from '../../lib/db';
// import bcrypt from 'bcryptjs';
// import nodemailer from 'nodemailer';
// import crypto from 'crypto';

// const handler = async (req, res) => {
//   try {
//     const { name, address, email, licenseTo, licenseFrom, generalInstructions, isActive } = req.body;
    
//     if (!name || !address || !email) {
//       return res.status(400).json({ message: 'Name, address, and email are required' });
//     }

//     // Generate a temporary password
//     const tempPassword = crypto.randomBytes(8).toString('hex');
//     const hashedPassword = await bcrypt.hash(tempPassword, 10);

//     const query = `
//       INSERT INTO clients (name, address, email, license_to, license_from, general_instructions, is_active, password)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
//     `;
//     const values = [name, address, email, licenseTo, licenseFrom, generalInstructions, isActive, hashedPassword];

//     const result = await db.query(query, values);

//     // Send email with temporary password (using your email setup)
//     await sendEmail({
//       to: email,
//       subject: 'Your Temporary Password',
//       text: `Dear ${name},

// Your account has been created successfully.
// Your login id is: ${email} and Your temporary password is: ${tempPassword}

// Please use the following link to login and change your password:
// http://localhost:3000/Login

// Best regards,
// Your Company Name
// `
//     });

//     res.status(200).json({ message: 'Client added successfully', client: result.rows[0] });
//   } catch (error) {
//     console.error('Error adding client:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// const sendEmail = async ({ to, subject, text }) => {
//   // Implement email sending logic using your preferred email library
//   // Example: using nodemailer
//   let transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     text,
//   });
// };

// export default handler;

//pages\api\clients.js
// import db from '../../lib/db';
// import bcrypt from 'bcryptjs';
// import nodemailer from 'nodemailer';

// const handler = async (req, res) => {
//   try {
//     const { name, address, email, licenseTo, licenseFrom, generalInstructions, isActive } = req.body;

//     if (!name || !address || !email) {
//       return res.status(400).json({ message: 'Name, address, and email are required' });
//     }

//     // Generate a temporary password
//     const tempPassword = 'TempPass123'; // Ideally, generate a random password
//     const hashedPassword = await bcrypt.hash(tempPassword, 10);

//     const query = `
//       INSERT INTO clients (name, address, email, license_to, license_from, general_instructions, is_active, password)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
//     `;
//     const values = [name, address, email, licenseTo, licenseFrom, generalInstructions, isActive, hashedPassword];

//     const result = await db.query(query, values);

//     // Send email with temporary password (using your email setup)
//     await sendEmail({
//       to: email,
//       subject: 'Your Temporary Password',
//       text: `Your temporary password is: ${tempPassword}
      
//       Your account has been created successfully.
// // Your login id is: ${email} and Your temporary password is: ${tempPassword}

// // Please use the following link to login and change your password:
// // http://localhost:3000/Login

// // Best regards,
// // Your Company Name
// // `
      
      
//     });

//     res.status(200).json({ message: 'Client added successfully', client: result.rows[0] });
//   } catch (error) {
//     console.error('Error adding client:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// const sendEmail = async ({ to, subject, text }) => {
//   let transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     text,
//   });
// };

// export default handler;
















// //E:\super_admin\new_pro\pages\api\mail-clients.js
// import db from '../../lib/db';
// import bcrypt from 'bcryptjs';
// import { sendEmail } from '../../lib/sendEmail';

// const handler = async (req, res) => {
//   const { method, query: { clientId } } = req;

//   if (method === 'POST') {
//     // Logic for adding a new client
//     try {
//       const { name, address, email, licenseTo, licenseFrom, generalInstructions, isActive } = req.body;

//       if (!name || !address || !email) {
//         return res.status(400).json({ message: 'Name, address, and email are required' });
//       }

//       // Generate a temporary password
//       const tempPassword = 'TempPass123'; // Ideally, generate a random password
//       const hashedPassword = await bcrypt.hash(tempPassword, 10);

//       const query = `
//         INSERT INTO clients (name, address, email, license_to, license_from, general_instructions, is_active, password)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
//       `;
//       const values = [name, address, email, licenseTo, licenseFrom, generalInstructions, isActive, hashedPassword];

//       const result = await db.query(query, values);

//       // Send email with temporary password (using your email setup)
//       await sendEmail({
//         to: email,
//         subject: 'Your Temporary Password',
//         text: `Your temporary password is: ${tempPassword}
        
//         Your account has been created successfully.
//         Your login id is: ${email} and Your temporary password is: ${tempPassword}
        
//         Please use the following link to login and change your password:
//         http://localhost:3000/Login
        
//         Best regards,
//         Your Company Name
//         `
//       });

//       res.status(200).json({ message: 'Client added successfully', client: result.rows[0] });
//     } catch (error) {
//       console.error('Error adding client:', error);
//       res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
//   } else if (method === 'GET' && clientId) {
//     // Logic for fetching a client by ID
//     try {
//       const query = 'SELECT * FROM clients WHERE id = $1';
//       const values = [clientId];
//       const result = await db.query(query, values);

//       if (result.rows.length === 0) {
//         return res.status(404).json({ message: 'Client not found' });
//       }

//       res.status(200).json(result.rows[0]);
//     } catch (error) {
//       console.error('Error fetching client:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST', 'GET']);
//     res.status(405).end(`Method ${method} Not Allowed`);
//   }
// };

// export default handler;


//
// pages/api/mail-clients.js
// pages/api/mail-clients.js
import { sendEmail } from '../../lib/sendEmail';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, subject, text } = req.body;

    // Log the received values to debug
    console.log('Received values:', { to, subject, text });

    if (!to || !subject || !text) {
      res.status(400).json({ error: 'Missing required fields: to, subject, text' });
      return;
    }

    try {
      await sendEmail({ to, subject, text });
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
