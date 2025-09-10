import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button
} from '@mui/material';

const VerifyEmailPage = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      
      if (!token) {
        setError('Invalid verification link');
        setLoading(false);
        return;
      }

      try {
        await authAPI.verifyEmail(token);
        setSuccess(true);
        toast.success('Email verified successfully! You can now log in.');
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || 'Email verification failed. Please try again.');
        toast.error('Email verification failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [location]);

  if (loading) {
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper elevation={3} sx={{ p: 4, width: '100%', textAlign: 'center' }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Verifying your email...
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          {success ? (
            <>
              <Typography component="h1" variant="h5" align="center" gutterBottom>
                Email Verified!
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                Your email has been successfully verified.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/login')}
                sx={{ mt: 3 }}
              >
                Go to Login
              </Button>
            </>
          ) : (
            <>
              <Typography component="h1" variant="h5" align="center" gutterBottom>
                Email Verification Failed
              </Typography>
              <Typography variant="body1" align="center" color="error" gutterBottom>
                {error}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/register')}
                sx={{ mt: 3 }}
              >
                Register Again
              </Button>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default VerifyEmailPage;
