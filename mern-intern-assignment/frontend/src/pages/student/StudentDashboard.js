import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentAPI } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@mui/material';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: ''
  });
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  const fetchStudentProfile = async () => {
    try {
      const response = await studentAPI.getMyProfile();
      setStudent(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        course: response.data.course || ''
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    try {
      await studentAPI.update(student.id, formData);
      toast.success('Profile updated successfully');
      setStudent({
        ...student,
        ...formData
      });
      setEditMode(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      name: student.name,
      email: student.email,
      course: student.course || ''
    });
    setEditMode(false);
  };

  const handleOpenPasswordModal = () => {
    setOpenPasswordModal(true);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
  };

  const handleClosePasswordModal = () => {
    setOpenPasswordModal(false);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await studentAPI.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      toast.success('Password updated successfully');
      handleClosePasswordModal();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to update password');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <ToastContainer />
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Student Dashboard
        </Typography>
        
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">My Profile</Typography>
            <Box>
              <Button
                variant="outlined"
                onClick={handleOpenPasswordModal}
                sx={{ mr: 1 }}
              >
                Change Password
              </Button>
              {editMode ? (
                <Box>
                  <Button
                    variant="outlined"
                    onClick={handleCancelEdit}
                    sx={{ mr: 1 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!editMode}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!editMode}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                disabled={!editMode}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enrollment Date"
                value={new Date(student.enrollmentDate).toLocaleDateString()}
                disabled
                margin="normal"
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Change Password Modal */}
      <Dialog open={openPasswordModal} onClose={handleClosePasswordModal}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleUpdatePassword} sx={{ mt: 2 }}>
            <TextField
              margin="dense"
              name="currentPassword"
              label="Current Password"
              type="password"
              fullWidth
              required
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
            <TextField
              margin="dense"
              name="newPassword"
              label="New Password"
              type="password"
              fullWidth
              required
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
            <TextField
              margin="dense"
              name="confirmNewPassword"
              label="Confirm New Password"
              type="password"
              fullWidth
              required
              value={passwordData.confirmNewPassword}
              onChange={handlePasswordChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordModal}>Cancel</Button>
          <Button onClick={handleUpdatePassword} variant="contained">
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentDashboard;