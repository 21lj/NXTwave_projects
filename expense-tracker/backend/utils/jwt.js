import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET 
const JWT_EXPIRY = process.env.JWT_EXPIRY 

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
