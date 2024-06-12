import React, { useState } from 'react';
import { Avatar, Grid, Paper, TextField, Button, IconButton, Tabs, Tab, Box, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div style={{ display: value !== index ? 'none' : 'block' }}>
            <Box p={3}>
                {children}
            </Box>
        </div>
    );
}

function LoginSignUp({ onClose}) {
    const [tabValue, setTabValue] = useState(0);
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
                if (response.data.status === 'success') {
                    setTimeout(() => {
                        onClose();
                        navigate('/home');
                    }, 3000);
                } else {
                    throw new Error('Unexpected response status');
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
                if (response.status === 201) {
                    setSubmitting(false);
                    setErrorMessage('');
                } else {
                    throw new Error('Unexpected response status');
                }
            })
            .catch(error => {
                console.error('Signup error:', error.response || error.message);
                setErrorMessage('User already exists');
                setTabValue(0);
                setSubmitting(false);
            });
    };

    return (
        <Paper style={paperStyle}>
            <IconButton
                style={{ position: 'absolute', top: 10, right: 10 }}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
            <Grid align="center">
                <Avatar style={avatarStyle}><LockIcon /></Avatar>
                <Typography variant="h6">{tabValue === 0 ? 'Sign In' : 'Sign Up'}</Typography>
            </Grid>
            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
                <Tab label="Sign In" />
                <Tab label="Sign Up" />
            </Tabs>
            {errorMessage && (
                <Typography color="error" align="center" style={{ marginTop: 10 }}>
                    {errorMessage}
                </Typography>
            )}
            <TabPanel value={tabValue} index={0}>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={handleLoginSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field as={TextField} label="Email" name="email" fullWidth required helperText={<ErrorMessage name="email" />} style={{ marginBottom: 16 }} />
                            <Field as={TextField} label="Password" name="password" type="password" fullWidth required helperText={<ErrorMessage name="password" />} style={{ marginBottom: 16 }} />
                            <Button type="submit" color="primary" variant="contained" fullWidth disabled={isSubmitting}>
                                {isSubmitting ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <Formik
                    initialValues={{ email: '', password: '', confirmPassword: '' }}
                    validationSchema={signUpSchema}
                    onSubmit={handleSignUpSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field as={TextField} label="Email" name="email" fullWidth required helperText={<ErrorMessage name="email" />} style={{ marginBottom: 16 }} />
                            <Field as={TextField} label="Password" name="password" type="password" fullWidth required helperText={<ErrorMessage name="password" />} style={{ marginBottom: 16 }} />
                            <Field as={TextField} label="Confirm Password" name="confirmPassword" type="password" fullWidth required helperText={<ErrorMessage name="confirmPassword" />} style={{ marginBottom: 16 }} />
                            <Button type="submit" color="primary" variant="contained" fullWidth disabled={isSubmitting}>
                                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </TabPanel>
        </Paper>
    );
}

export default LoginSignUp;
