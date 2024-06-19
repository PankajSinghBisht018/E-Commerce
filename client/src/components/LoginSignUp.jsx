import React, { useState } from 'react';
import { Avatar, Grid, Paper, TextField, Button, IconButton, Tabs, Tab, Box, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div style={{ display: value !== index ? 'none' : 'block' }}>
      <Box p={3}>
        {children}
      </Box>
    </div>
  );
}

function LoginSignUp({ onClose }) {
  const [tabValue, setTabValue] = useState(0);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const paperStyle = { padding: 20, width: 350, margin: '0 auto', position: 'relative' };
  const avatarStyle = { backgroundColor: '#1bbd7e' };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const signUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setErrorMessage('');
  };

  const handleLoginSubmit = (values, { setSubmitting }) => {
    axios.post('http://localhost:8000/login', values)
    .then(response => {
        const { token, isAdmin } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('isAdmin', isAdmin);
        if (isAdmin) {
          navigate('/dashboard');
        } else {
          navigate('/home');
        }
      })
    .catch(error => {
        console.error('Login error:', error.response || error.message);
        setErrorMessage('Invalid email or password');
        setSubmitting(false);
      });
  };
  
  

  const handleSignUpSubmit = (values, { setSubmitting }) => {
    axios.post('http://localhost:8000/signup', values)
      .then(response => {
        const { token , role} = response.data;
        localStorage.setItem('token', token);
        setSubmitting(false);
        setErrorMessage('');
        setTabValue(0);
      })
      .catch(error => {
        console.error('Signup error:', error.response || error.message);
        setErrorMessage('User already exists');
        setSubmitting(false);
      });
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  const handleSendOtp = () => {
    axios.post('http://localhost:8000/forgot-password', { email })
      .then(response => {
        setOtpSent(true);
        setErrorMessage('');
      })
      .catch(error => {
        console.error('Send OTP error:', error.response || error.message);
        setErrorMessage('Failed to send OTP');
      });
  };

  const handleVerifyOtp = () => {
    axios.post('http://localhost:8000/verify-otp', { email, otp })
      .then(response => {
        setOtpVerified(true);
        setErrorMessage('');
      })
      .catch(error => {
        console.error('Verify OTP error:', error.response || error.message);
        setErrorMessage('Invalid OTP');
      });
  };

  const handleResetPassword = () => {
    axios.post('http://localhost:8000/reset-password', { email, otp, newPassword })
      .then(response => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        setForgotPassword(false);
        setOtpSent(false);
        setOtpVerified(false);
        setNewPassword('');
        setErrorMessage('');
        setTabValue(0);
      })
      .catch(error => {
        console.error('Reset Password error:', error.response || error.message);
        setErrorMessage('Failed to reset password');
      });
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}><LockIcon /></Avatar>
          <h2>{forgotPassword ? 'Forgot Password' : 'Sign In / Sign Up'}</h2>
        </Grid>
        {!forgotPassword ? (
          <>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="login signup tabs" variant="fullWidth">
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={handleLoginSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Field as={TextField} label="Email" name="email" fullWidth required helperText={<ErrorMessage name="email" />} />
                    <Field as={TextField} label="Password" name="password" type="password" fullWidth required helperText={<ErrorMessage name="password" />} />
                    <Button type="submit" color="primary" variant="contained" fullWidth disabled={isSubmitting}>Login</Button>
                  </Form>
                )}
              </Formik>
              <Typography>
                <Button onClick={handleForgotPassword}>Forgot password?</Button>
              </Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                validationSchema={signUpSchema}
                onSubmit={handleSignUpSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Field as={TextField} label="Email" name="email" fullWidth required helperText={<ErrorMessage name="email" />} />
                    <Field as={TextField} label="Password" name="password" type="password" fullWidth required helperText={<ErrorMessage name="password" />} />
                    <Field as={TextField} label="Confirm Password" name="confirmPassword" type="password" fullWidth required helperText={<ErrorMessage name="confirmPassword" />} />
                    <Button type="submit" color="primary" variant="contained" fullWidth disabled={isSubmitting}>Sign Up</Button>
                  </Form>
                )}
              </Formik>
            </TabPanel>
          </>
        ) : (
          <>
            <TextField label="Email" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
            {otpSent ? (
              <>
                <TextField label="OTP" fullWidth required value={otp} onChange={(e) => setOtp(e.target.value)} />
                <Button color="primary" variant="contained" fullWidth onClick={handleVerifyOtp}>Verify OTP</Button>
                {otpVerified && (
                  <>
                    <TextField label="New Password" type="password" fullWidth required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <Button color="primary" variant="contained" fullWidth onClick={handleResetPassword}>Reset Password</Button>
                  </>
                )}
              </>
            ) : (
              <Button color="primary" variant="contained" fullWidth onClick={handleSendOtp}>Send OTP</Button>
            )}
          </>
        )}
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <IconButton style={{ position: 'absolute', top: 0, right: 0 }} onClick={onClose}><CloseIcon /></IconButton>
      </Paper>
    </Grid>
  );
}

export default LoginSignUp;