import React, { useState, useEffect } from 'react';
import { Avatar, Grid, TextField, Button, Tabs, Tab, Box, Typography, CircularProgress } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
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
  const [loading, setLoading] = useState(false); 
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      onClose(); 
      navigate('/home'); 
    }
  }, [loggedIn, navigate, onClose]);

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
    setLoading(true);
    axios.post('http://localhost:8000/login', values)
      .then(response => {
        const { token, isAdmin } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('isAdmin', isAdmin);
        if (isAdmin) {
          navigate('/dashboard');
        } else {
          setLoggedIn(true);
          onClose(); 
        }
      })
      .catch(error => {
        setErrorMessage('Invalid email or password');
      })
      .finally(() => {
        setLoading(false); 
        setSubmitting(false);
      });
  };

  const handleSignUpSubmit = (values, { setSubmitting }) => {
    setLoading(true); 
    axios.post('http://localhost:8000/signup', values)
      .then(response => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        setSubmitting(false);
        setErrorMessage('');
        setTabValue(0);
      })
      .catch(error => {
        setErrorMessage('User already exists');
        setSubmitting(false);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  const handleSendOtp = () => {
    setLoading(true); 
    axios.post('http://localhost:8000/auth/forgot-password', { email })
      .then(response => {
        setOtpSent(true);
        setErrorMessage('');
      })
      .catch(error => {
        setErrorMessage('Failed to send OTP');
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const handleVerifyOtp = () => {
    setLoading(true); 
    axios.post('http://localhost:8000/auth/verify-otp', { email, otp })
      .then(response => {
        setOtpVerified(true);
        setErrorMessage('');
      })
      .catch(error => {
        setErrorMessage('Invalid OTP');
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const handleResetPassword = () => {
    setLoading(true); 
    axios.post('http://localhost:8000/auth/reset-password', { email, otp, newPassword })
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
        setErrorMessage('Failed to reset password');
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
          <Grid container direction="column" alignItems="center" >
            <Grid item>
              <Avatar style={avatarStyle}><LockIcon /></Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h6">{forgotPassword ? 'Forgot Password' : 'Login'}</Typography>
            </Grid>
            {!forgotPassword && (
              <Grid item>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="login signup tabs"  >
                  <Tab label="Login" />
                  <Tab label="Sign Up" />
                </Tabs>
              </Grid>
            )}
            <Grid item style={{ width: '100%' }}>
              <TabPanel value={tabValue} index={0} >
                {!loggedIn && ( 
                  <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={handleLoginSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form style={{ width: '100%' }}>
                        <Field as={TextField} label="Email" name="email" fullWidth required helperText={<ErrorMessage name="email" />} />
                        <Field as={TextField} label="Password" name="password" type="password" fullWidth required helperText={<ErrorMessage name="password" />} />
                        <Button type="submit" color="primary" variant="contained" fullWidth disabled={isSubmitting}>
                          {loading ? <CircularProgress size={24} /> : 'Login'}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                )}
                {!forgotPassword && (
                  <Typography>
                    <Button onClick={handleForgotPassword}>Forgot password?</Button>
                  </Typography>
                )}
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Formik
                  initialValues={{ email: '', password: '', confirmPassword: '' }}
                  validationSchema={signUpSchema}
                  onSubmit={handleSignUpSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form style={{ width: '100%' }}>
                      <Field as={TextField} label="Email" name="email" fullWidth required helperText={<ErrorMessage name="email" />} />
                      <Field as={TextField} label="Password" name="password" type="password" fullWidth required helperText={<ErrorMessage name="password" />} />
                      <Field as={TextField} label="Confirm Password" name="confirmPassword" type="password" fullWidth required helperText={<ErrorMessage name="confirmPassword" />} />
                      <Button type="submit" color="primary" variant="contained" fullWidth disabled={isSubmitting}>
                        {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </TabPanel>
              {forgotPassword && (
                <TabPanel value={tabValue} index={0}>
                  <TextField label="Email" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
                  {otpSent ? (
                    <>
                      <TextField label="OTP" fullWidth required value={otp} onChange={(e) => setOtp(e.target.value)} />
                      <Button color="primary" variant="contained" fullWidth onClick={handleVerifyOtp}>
                        {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
                      </Button>
                      {otpVerified && (
                        <>
                          <TextField label="New Password" type="password" fullWidth required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                          <Button color="primary" variant="contained" fullWidth onClick={handleResetPassword}>
                            {loading ? <CircularProgress size={24} /> : 'Reset Password'}
                          </Button>
                        </>
                      )}
                    </>
                  ) : (
                    <Button color="primary" variant="contained" fullWidth onClick={handleSendOtp}>
                      {loading ? <CircularProgress size={24} /> : 'Send OTP'}
                    </Button>
                  )}
                </TabPanel>
              )}
            </Grid>
            {errorMessage && (
              <Grid item style={{ width: '100%' }}>
                <Typography color="error">{errorMessage}</Typography>
              </Grid>
            )}
          </Grid>
  );
}

export default LoginSignUp;
