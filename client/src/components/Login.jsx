import React from 'react';
import { Avatar, Grid, Paper, TextField, FormHelperText, Button, IconButton, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onClose }) {
    const navigate = useNavigate();

    const paperStyle = { padding: 20, height: '70vh', width: 350, margin: '20px auto', position: 'relative' };
    const avatarStyle = { backgroundColor: '#1bbd7e', color: 'white' };
    const stylefield = { marginBottom: 20, marginTop: 20 };
    const initialValues = { email: '', password: '' };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required').matches(/@gmail.com$/, 'Must be a gmail.com email'),
        password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
    });

    const onSubmit = async (values, { setSubmitting, setFieldError }) => {
        axios.post('http://localhost:8000/login', values)
            .then(response => {
                if (response.data.status === 'success') {
                    onClose(); 
                    navigate('/home');
                } else {
                    setFieldError('email', response.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.data.message) {
                    setFieldError('email', error.response.data.message);
                } else {
                    setFieldError('email', 'Internal server error');
                }
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Paper style={paperStyle}>
                <IconButton onClick={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
                    <CloseIcon />
                </IconButton>
                <Grid container justifyContent="center" alignItems="center" direction="column">
                    <Avatar style={avatarStyle}><LockIcon /></Avatar>
                    <h2>Login</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Field as={TextField} label='Email' name='email' placeholder='Enter Email' fullWidth style={stylefield} required />
                            <FormHelperText style={{ color: 'red' }}>
                                <ErrorMessage name='email' />
                            </FormHelperText>
                            <Field as={TextField} type="password" label='Password' name='password' placeholder='Enter Password' fullWidth style={stylefield} required />
                            <FormHelperText style={{ color: 'red' }}>
                                <ErrorMessage name='password' />
                            </FormHelperText>
                            <Button type='submit' color='primary' variant="contained" fullWidth disabled={props.isSubmitting}>Login</Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    );
}

export default Login;
