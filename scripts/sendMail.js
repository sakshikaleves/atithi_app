// scripts/sendMail.js
const puppeteer = require('puppeteer');
require('dotenv').config({ path: './.env.local' });

async function sendMail() {
  const browser = await puppeteer.launch({ headless: false }); // Set headless to false for debugging
  const page = await browser.newPage();

  // Go to the login page
  await page.goto('https://webmail.atithi.org/Mondo/lang/sys/login.aspx');

  // Log in
  await page.type('#login_field', process.env.EMAIL_USER); // Replace with the actual selector for the email field
  await page.type('#password_field', process.env.EMAIL_PASS); // Replace with the actual selector for the password field
  await page.click('#login_button'); // Replace with the actual selector for the login button
  await page.waitForNavigation();

  // Go to the compose email page
  await page.goto('https://webmail.atithi.org/Mondo/lang/sys/client.aspx');

  // Fill in the email form
  await page.type('#to_field', 'recipient@example.com'); // Replace with the actual selector for the 'To' field
  await page.type('#subject_field', 'Your Temporary Password'); // Replace with the actual selector for the 'Subject' field
  await page.type('#body_field', `
    Your temporary password is: TempPass123
   
    Your account has been created successfully.
    Your login id is: your_email@example.com and your temporary password is: TempPass123
   
    Please use the following link to login and change your password:
    http://localhost:3000/Login
   
    Best regards,
    Your Company Name
  `); // Replace with the actual selector for the body field

  // Send the email
  await page.click('#send_button'); // Replace with the actual selector for the send button

  // Close the browser
  await browser.close();
}

sendMail().catch(err => {
  console.error(err);
});
