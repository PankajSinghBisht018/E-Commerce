import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import { TextField } from '@mui/material';
import Faq from '../Home/Faq';

const Contact = () => {
  const initialValues = {
    name: '',
    email: '',
    message: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    message: Yup.string()
      .min(10, 'Message is too short')
      .required('Message is required')
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form data', values);
    toast.success('Form submitted successfully!', {
      position: toast.POSITION.TOP_CENTER
    });
    setSubmitting(false);
    resetForm();
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SnapMart - Contact</title>
        <meta name='description' content='Contact' />
        <link rel="icon" type="image/png" href="/logo.png" />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl"
        >
          <div className="mb-8">
            <img
              src="https://naexamendagen.nl/wp-content/uploads/2023/02/contact-us-2.png"
              alt="Contact Us"
              className="shadow-lg rounded-lg w-full max-h-80 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-lg shadow-lg border-white border-4">
              <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                  <Form className='space-y-6'>
                    <div className="flex items-center border-b border-gray-300 py-2">
                      <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
                      <Field
                        as={TextField}
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        className="flex-1 py-2 px-2 focus:outline-none"
                      />
                    </div>
                    <ErrorMessage name="name" component="div" className='text-red-500 text-sm' />

                    <div className="flex items-center border-b border-gray-300 py-2">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-500" />
                      <Field
                        as={TextField}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="flex-1 py-2 px-2 focus:outline-none"
                      />
                    </div>
                    <ErrorMessage name="email" component="div" className='text-red-500 text-sm' />

                    <div className="flex items-start border-b border-gray-300 py-2">
                      <FontAwesomeIcon icon={faCommentDots} className="mr-2 text-gray-500 mt-2" />
                      <Field
                        as={TextField}
                        type="text"
                        id="message"
                        name="message"
                        placeholder="Message"
                        multiline
                        rows={4}
                        className="flex-1 py-2 px-2 focus:outline-none resize-none"
                      />
                    </div>
                    <ErrorMessage name="message" component="div" className='text-red-500 text-sm' />

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={isSubmitting}
                      className='w-full py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200'
                    >
                      Submit
                    </motion.button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="p-8 rounded-lg shadow-lg border-white border-4">
              <h2 className="text-2xl font-bold mb-4">Our Address</h2>
              <p>New Delhi, India</p>
              <iframe
                title="Delhi Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8391812715!2d77.06889993032272!3d28.527280311510835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0246c7a63c3f%3A0x6fb5d6c4a8853d48!2sDelhi%2C%20India!5e0!3m2!1sen!2sus!4v1629394380123!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="mt-8">
            <Faq />
          </div>
        </motion.div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Contact;
