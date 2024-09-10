import db from '../../../lib/db';
import nodemailer from 'nodemailer';
import { signToken } from '../../../utils/jwt';

export default async function handler(req, res) {
  const { email } = req.body;

  try {
    const query = 'SELECT * FROM clients WHERE email = $1';
    const values = [email];
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const client = result.rows[0];
    const token = signToken({ clientId: client.id, email: client.email });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    await sendEmail({
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
    });

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error during password reset request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const sendEmail = async ({ to, subject, text }) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};
