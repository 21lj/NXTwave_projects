const db = require('../models');
const bcrypt = require('bcryptjs');

// @desc    Get all students (Admin only)
// @route   GET /api/students
// @access  Private/Admin
exports.getAllStudents = async (req, res) => {
  try {
    const students = await db.all(`
      SELECT s.*, u.role 
      FROM students s 
      JOIN users u ON s.userId = u.id
    `);
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get current student profile
// @route   GET /api/students/me
// @access  Private
exports.getMyProfile = async (req, res) => {
  try {
    const student = await db.get(
      'SELECT * FROM students WHERE userId = ?',
      [req.user.id]
    );
    
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }
    
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new student (Admin only)
// @route   POST /api/students
// @access  Private/Admin
exports.createStudent = async (req, res) => {
  const { name, email, course } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Generate random password for new student
    const password = Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const userResult = await db.run(
      'INSERT INTO users (name, email, password, role, isVerified) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, 'student', 1]
    );
    
    // Create student record
    const studentResult = await db.run(
      'INSERT INTO students (userId, name, email, course) VALUES (?, ?, ?, ?)',
      [userResult.id, name, email, course || 'MERN Bootcamp']
    );
    
    const newStudent = await db.get(
      'SELECT s.*, u.role FROM students s JOIN users u ON s.userId = u.id WHERE s.id = ?',
      [studentResult.id]
    );
    
    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update student profile
// @route   PUT /api/students/:id
// @access  Private (Admin can update any, Student can only update their own)
exports.updateStudent = async (req, res) => {
  const { name, email, course } = req.body;
  const studentId = req.params.id;
  
  try {
    // Check if student exists
    const student = await db.get('SELECT * FROM students WHERE id = ?', [studentId]);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Authorization check: Student can only update their own profile
    if (req.user.role === 'student' && student.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Update student record
    await db.run(
      'UPDATE students SET name = ?, email = ?, course = ? WHERE id = ?',
      [name || student.name, email || student.email, course || student.course, studentId]
    );
    
    // Also update user record if email or name changed
    if (name || email) {
      await db.run(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name || student.name, email || student.email, student.userId]
      );
    }
    
    const updatedStudent = await db.get('SELECT * FROM students WHERE id = ?', [studentId]);
    res.json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update own password
// @route   PUT /api/students/me/password
// @access  Private
exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  try {
    // Get user
    const user = await db.get('SELECT * FROM users WHERE id = ?', [req.user.id]);
    
    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update password
    await db.run(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, req.user.id]
    );
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete student (Admin only)
// @route   DELETE /api/students/:id
// @access  Private/Admin
exports.deleteStudent = async (req, res) => {
  const studentId = req.params.id;
  
  try {
    // Check if student exists
    const student = await db.get('SELECT * FROM students WHERE id = ?', [studentId]);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Delete student (this will cascade delete the user due to foreign key constraint)
    await db.run('DELETE FROM students WHERE id = ?', [studentId]);
    
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
