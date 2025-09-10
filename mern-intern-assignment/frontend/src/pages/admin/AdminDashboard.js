import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentAPI } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: 'MERN Bootcamp'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await studentAPI.getAll();
      setStudents(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (student = null) => {
    if (student) {
      setEditingStudent(student);
      setFormData({
        name: student.name,
        email: student.email,
        course: student.course || 'MERN Bootcamp'
      });
    } else {
      setEditingStudent(null);
      setFormData({
        name: '',
        email: '',
        course: 'MERN Bootcamp'
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingStudent(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingStudent) {
        // Update existing student
        await studentAPI.update(editingStudent.id, formData);
        toast.success('Student updated successfully');
      } else {
        // Create new student
        await studentAPI.create(formData);
        toast.success('Student created successfully');
      }
      
      fetchStudents();
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentAPI.delete(id);
        toast.success('Student deleted successfully');
        fetchStudents();
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete student');
      }
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <ToastContainer />
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleOpen()}
          sx={{ mb: 3 }}
        >
          Add New Student
        </Button>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Enrollment Date</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.course || 'Not assigned'}</TableCell>
                  <TableCell>
                    {new Date(student.enrollmentDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{student.role}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => handleOpen(student)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Add/Edit Student Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingStudent ? 'Edit Student' : 'Add New Student'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Course</InputLabel>
              <Select
                name="course"
                value={formData.course}
                label="Course"
                onChange={handleChange}
              >
                <MenuItem value="MERN Bootcamp">MERN Bootcamp</MenuItem>
                <MenuItem value="Full Stack Development">Full Stack Development</MenuItem>
                <MenuItem value="Frontend Development">Frontend Development</MenuItem>
                <MenuItem value="Backend Development">Backend Development</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingStudent ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
