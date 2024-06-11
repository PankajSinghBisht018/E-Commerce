import React from 'react';
import { Avatar, Grid, Paper, TextField, FormHelperText, Button, IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp({ onClose }) {
    const navigate = useNavigate();
    const paperStyle = { padding: 20, height: '70vh', width: 350, margin: '20px auto', position: 'relative' };
    const avatarStyle = { backgroundColor: '#1bbd7e', color: 'white' };
    const stylefield = { marginBottom: 20, marginTop: 20 };
    const initialValuesSignup = { email: '', password: '', confirmPassword: '' };

    const validationSchemaSignup = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required').matches(/@gmail.com$/, 'Must be a gmail.com email'),
        password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
    });
    const onSubmitSignup = async (values, { setSubmitting, setFieldError }) => {
        try {
            const response = await axios.post('http://localhost:8000/signup', values);
            if (response.data.status === 'success') {
                navigate('/login');
            } else {
                setFieldError('email', response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setFieldError('email', error.response.data.message);
            } else {
                setFieldError('email', 'Internal server error');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Paper style={paperStyle}>
                <IconButton onClick={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
                    <CloseIcon />
                </IconButton>
                <Grid container justifyContent="center" alignItems="center" direction="column">
                    <Avatar style={avatarStyle}><LockIcon /></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <Formik initialValues={initialValuesSignup} onSubmit={onSubmitSignup} validationSchema={validationSchemaSignup}>
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
                            <Field as={TextField} type="password" label='Confirm Password' name='confirmPassword' placeholder='Confirm Password' fullWidth style={stylefield} required />
                            <FormHelperText style={{ color: 'red' }}>
                                <ErrorMessage name='confirmPassword' />
                            </FormHelperText>
                            <Button type='submit' color='primary' variant="contained" fullWidth>Sign Up</Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    );
}

export default SignUp;