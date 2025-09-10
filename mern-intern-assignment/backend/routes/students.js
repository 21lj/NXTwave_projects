const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const studentController = require('../controllers/studentController');

const router = express.Router();

// Protect all routes
router.use(authenticate);

// Get all students (Admin only)
router.get('/', authorize('admin'), studentController.getAllStudents);

// Get current student profile
router.get('/me', studentController.getMyProfile);

// Create a new student (Admin only)
router.post('/', authorize('admin'), studentController.createStudent);

// Update student profile
// Admin can update any student, Student can only update their own
router.put('/:id', studentController.updateStudent);

// Update own password
router.put('/me/password', studentController.updatePassword);

// Delete student (Admin only)
router.delete('/:id', authorize('admin'), studentController.deleteStudent);

module.exports = router;