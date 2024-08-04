import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import OurValues from './Ourvalues';
import OurTeam from './OurTeam';

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
            <img 
              src="https://www.blogtyrant.com/wp-content/uploads/2011/02/best-about-us-pages.png" 
              alt="About Us" 
              className="w-full h-60 object-cover rounded-lg shadow-lg"
            />
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4 text-center">Our Mission</h2>
            <p className="text-lg text-center">
              At SnapMart, our mission is to provide a seamless and exceptional shopping experience for our customers, with a focus on quality, innovation, and customer satisfaction.
            </p>
          </section>

          <OurValues />

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4 text-center">Our Journey</h2>
            <div className="space-y-4">
              <p className="text-lg text-center">
                Founded in 2020, SnapMart has quickly grown to become a leading mobile retailer.
              </p>
              <p className="text-lg text-center">
                Our founders, with a passion for technology and customer service, have created a platform that
                revolutionizes the mobile shopping experience.
              </p>
            </div>
          </section>

          <OurTeam />
        </motion.div>
      </div>
    </>
  );
};

export default About;
