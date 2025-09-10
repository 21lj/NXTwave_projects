const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { generateToken } = require('../utils/jwt');
const db = require('../models');
const { sendVerificationEmail } = require('../utils/email');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  const { name, email, password, role = 'student' } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Generate verification token
    const verificationToken = uuidv4();
    
    // Create user
    const result = await db.run(
      'INSERT INTO users (name, email, password, role, verificationToken) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, verificationToken]
    );
    
    // Create student record if role is student
    if (role === 'student') {
      await db.run(
        'INSERT INTO students (userId, name, email) VALUES (?, ?, ?)',
        [result.id, name, email]
      );
    }
    
    // Send verification email
    await sendVerificationEmail(email, verificationToken);
    
    res.status(201).json({
      message: 'User registered successfully. Please check your email to verify your account.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Check if user exists
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check if email is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email before logging in' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = generateToken(user);
    
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Verify email
// @route   GET /api/auth/verify-email
// @access  Public
exports.verifyEmail = async (req, res) => {
  const { token } = req.query;
  
  try {
    const user = await db.get('SELECT * FROM users WHERE verificationToken = ?', [token]);
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }
    
    await db.run(
      'UPDATE users SET isVerified = 1, verificationToken = NULL WHERE id = ?',
      [user.id]
    );
    
    res.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Request password reset
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }
    
    // Generate reset token
    const resetToken = uuidv4();
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour
    
    await db.run(
      'UPDATE users SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE id = ?',
      [resetToken, resetExpires, user.id]
    );
    
    // Send reset email
    await sendPasswordResetEmail(email, resetToken);
    
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  
  try {
    const user = await db.get(
      'SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpires > ?',
      [token, new Date()]
    );
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Update password and clear reset token
    await db.run(
      'UPDATE users SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE id = ?',
      [hashedPassword, user.id]
    );
    
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
