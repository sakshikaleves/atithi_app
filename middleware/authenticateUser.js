import { getSession } from 'next-auth/react';

export default async function authenticateUser(req, res, next) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.clientId = session.user.clientId; // Assuming your session includes clientId
  next();
}
