import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';

export default async (req, res, next) => {
  try {
    // Expect Authorization header: "Bearer <token>" OR token cookie
    const authHeader = req.headers.authorization;
    const tokenFromHeader =
      authHeader && authHeader.split(' ')[0] === 'Bearer'
        ? authHeader.split(' ')[1]
        : null;
    const token = tokenFromHeader || req.cookies?.token || req.headers['x-access-token'];

    if (!token)
      return res.status(401).json({ error: 'No token provided. Did you forget your secret handshake?' });

    let payload;
    try {
      payload = verifyToken(token);
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token. Time flies, huh?' });
    }

    const user = await User.findById(payload.id).select('-password');
    if (!user) return res.status(401).json({ error: 'User not found. Maybe they disappeared?' });

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
