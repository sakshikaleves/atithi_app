// // lib/sendEmail.js
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// // Load environment variables from .env.local file
// dotenv.config();

// console.log("Email User:", process.env.EMAIL_USER);
// console.log("Email Pass:", process.env.EMAIL_PASS);
// console.log("Email Host:", process.env.EMAIL_HOST);
// console.log("Email Port:", process.env.EMAIL_PORT);

// export const sendEmail = async ({ to, subject, text }) => {
//   // Log the email fields to verify they are defined
//   console.log(`Attempting to send email to: ${to}`);
//   console.log(`Subject: ${subject}`);
//   console.log(`Text: ${text}`);

//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: parseInt(process.env.EMAIL_PORT),
//     secure: false, // Use TLS
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//     tls: {
//       rejectUnauthorized: false // Accept self-signed certificates
//     },
//     logger: true, // Log information for debugging
//     debug: true, // Include debug output
//     connectionTimeout: 1200000, // 1200 seconds (20 minutes)
//     greetingTimeout: 1200000, // 1200 seconds (20 minutes)
//     socketTimeout: 1200000 // 1200 seconds (20 minutes)
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     text,
//   };

//   try {
//     console.log(`Attempting to send email to: ${to}`);
//     let info = await transporter.sendMail(mailOptions);
//     console.log('Message sent: %s', info.messageId);
//     return info;
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// };

// lib/sendEmail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env.local file
dotenv.config();

console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS);
console.log("Email Host:", process.env.EMAIL_HOST);
console.log("Email Port:", process.env.EMAIL_PORT);

export const sendEmail = async ({ to, subject, text }) => {
  // Log the email fields to verify they are defined
  console.log(`Attempting to send email to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Text: ${text}`);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false // Accept self-signed certificates
    },
    logger: true, // Log information for debugging
    debug: true, // Include debug output
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 60000, // 60 seconds
    socketTimeout: 60000 // 60 seconds
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    console.log(`Attempting to send email to: ${to}`);
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
