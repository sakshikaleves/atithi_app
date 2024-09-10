//E:\super_admin\new_pro\pages\api\sendWhatsAppMessage.js
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
