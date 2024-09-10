import { Client } from 'pg';
import { Parser } from 'json2csv';

const { clientId, start, end } = req.query;


export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { clientId, start, end } = req.query;

    // Validate the required parameters
    if (!clientId || !start || !end) {
      console.error('Missing required query parameters:', { clientId, start, end });
      return res.status(400).json({ error: 'Missing required query parameters' });
    }

    console.log('Received query parameters:', { clientId, start, end });

    const client = new Client({
      user: 'sakshi',
      host: 'localhost',
      database: 'atithi',
      password: 'sakshi',
      port: 5432,
    });

    try {
      await client.connect();
      console.log('Connected to PostgreSQL');

      const result = await client.query(
        'SELECT * FROM visitors WHERE client_id = $1 AND check_in_time BETWEEN $2 AND $3',
        [clientId, start, end]
      );

      console.log('Query result:', result.rows);

      await client.end();
      console.log('Disconnected from PostgreSQL');

      if (result.rows.length === 0) {
        console.log('No data found for the specified range');
        return res.status(404).json({ error: 'No data found for the specified range.' });
      }

      const fields = [
        'name',
        'type',
        'mobile',
        'coming_from',
        'purpose',
        'host',
        'check_in_time',
        'check_out_time'
      ];

      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(result.rows);

      res.setHeader('Content-Disposition', `attachment; filename=reports_${clientId}.csv`);
      res.setHeader('Content-Type', 'text/csv');
      res.status(200).send(csv);
      console.log('CSV file sent successfully');
    } catch (error) {
      await client.end();
      console.error('Error fetching visitor data:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
