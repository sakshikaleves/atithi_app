// import { Client, LocalAuth } from 'whatsapp-web.js';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { visitor } = req.body;

//     if (!visitor) {
//       return res.status(400).json({ error: 'Visitor data is required' });
//     }

//     const visitorId = visitor.id;
//     const visitorName = visitor.name;
//     const visitorMobile = "+91" + visitor.phone;

//     // Construct the absolute URL for the Visitor's Pass PDF
//     const root = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`;
//     const passUrl = `${root}/ReportAspx/PrintVisitor.aspx?Id=${visitorId}`;

//     // Construct the WhatsApp message
//     const message = `Hello ${visitorName},\nYour Visitor Pass is ready. Please click the link below to view your pass:\n${passUrl}`;

//     const client = new Client({
//       authStrategy: new LocalAuth(),
//       puppeteer: { headless: true }
//     });

//     client.on('qr', (qr) => {
//       // NOTE: This will print the QR code to the console. You can use any QR code library to display it to the user.
//       console.log('QR RECEIVED', qr);
//     });

//     client.on('ready', async () => {
//       console.log('Client is ready!');
//       try {
//         await client.sendMessage(visitorMobile, message);
//         console.log('Message sent successfully');
//         res.status(200).json({ message: 'WhatsApp message sent successfully' });
//       } catch (error) {
//         console.error('Error sending WhatsApp message:', error);
//         res.status(500).json({ error: 'Error sending WhatsApp message' });
//       } finally {
//         client.destroy();
//       }
//     });

//     client.initialize();
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
// pages/api/sendWhatsAppMessage.js

// new_pro/pages/sendWhatsAppMessage.js
//E:\super_admin\new_pro\pages\sendWhatsAppMessage.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, message } = req.body;

    try {
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${to}&text=${encodeURIComponent(message)}`;
      // For real WhatsApp API integration, you would need to use a service like Twilio or another provider.
      // Here, we'll just return the URL as if it's sent.
      res.status(200).json({ url: whatsappUrl });
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      res.status(500).json({ error: 'Error sending WhatsApp message' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
