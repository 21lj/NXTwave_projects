import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';

// Auth controller: keeping bad actors out and passwords safe

/**
 * Signup: create user and return token + safe user info
 * expected req.body: { name, email, password }
 */
export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Prevent duplicate email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered. Try another or bribe the admin 😏' });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = signToken({ id: user._id });

    // Return basic user info + token (do not send password!)
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
      expiresIn: process.env.JWT_EXPIRY || '7d'
    });
  } catch (err) {
    console.error('Signup error:', err);
    next(err);
  }
};

/**
 * Login: validate credentials and return token + user
 * expected req.body: { email, password }
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials. No hackers allowed!' });

    const valid = await user.comparePassword(password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials. Nice try though 😅' });

    const token = signToken({ id: user._id });

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
      expiresIn: process.env.JWT_EXPIRY 
    });
  } catch (err) {
    next(err);
  }
};
