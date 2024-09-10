const nodemailer = require('nodemailer');
require('dotenv').config({ path: './.env.local' });

async function testEmail() {
  console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
  console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
  console.log('EMAIL_USER:', process.env.EMAIL_USER);

  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "kaleeshrikant72@gmail.com", // Replace with a valid recipient email
      subject: "Test Email",
      text: "This is a test email.",
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
}

testEmail();
