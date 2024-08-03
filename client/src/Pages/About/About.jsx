import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SnapMart - About</title>
        <meta name='description' content='About SnapMart' />
        <link rel="icon" type="image/png" href="/logo.png" />
      </Helmet>

      <div className="min-h-screen py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-6 md:px-12 lg:px-24"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About SnapMart</h1>
            <p className="text-lg">Your one-stop solution for all your mailing needs.</p>
          </div>

          <section className="mb-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-6">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg">
                  At SnapMart, our mission is to revolutionize the way you manage and send emails. We provide
                  a comprehensive platform that allows you to create, schedule, and track your email campaigns
                  effortlessly.
                </p>
              </div>
              <div className="md:w-1/2 p-6">
                <img 
                  src="https://www.blogtyrant.com/wp-content/uploads/2011/02/best-about-us-pages.png" 
                  alt="Our Office" 
                  className="rounded-lg shadow-lg w-full h-64 object-cover" 
                />
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-6">
                <img 
                  src="https://kinsta.com/wp-content/uploads/2021/11/about-us-page-1024x512.png" 
                  alt="Our Team" 
                  className="rounded-lg shadow-lg w-full h-64 object-cover" 
                />
              </div>
              <div className="md:w-1/2 p-6">
                <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
                <p className="text-lg">
                  Our dedicated team of professionals is committed to providing you with the best email marketing
                  experience. From developers to customer support, every member of our team plays a crucial role
                  in ensuring your success.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4 text-center">Our Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white  text-black p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">10,000+ Campaigns Sent</h3>
                <p>Helping businesses reach their audience effectively.</p>
              </div>
              <div className="bg-white text-black p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">5,000+ Satisfied Clients</h3>
                <p>Providing top-notch email marketing solutions.</p>
              </div>
              <div className="bg-white text-black p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">99.9% Uptime</h3>
                <p>Ensuring your campaigns are sent without any interruptions.</p>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-lg mb-4">Have any questions? We'd love to hear from you!</p>
              <a
                href="/contact"
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
              >
                Get in Touch
              </a>
            </div>
          </section>
        </motion.div>
      </div>
    </>
  );
};

export default About;
