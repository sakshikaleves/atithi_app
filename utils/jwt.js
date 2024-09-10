//E:\super_admin\new_pro\utils\jwt.js
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

export const signToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
