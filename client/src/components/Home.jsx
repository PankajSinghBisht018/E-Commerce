import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { motion } from 'framer-motion';
import Faq from './Faq';

function Home() {
  const [carouselImages, setCarouselImages] = useState([]);
  const [cardImages, setCardImages] = useState([]);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: 'Samsung S24',
          per_page: 3,
          client_id: 'Rxp2BCKd-vTWqqUGG5oKD4_20iHiiTS1qTbKcW85bGg',
        }
      });
      const fetchedImages = response.data.results.map(image => ({
        src: image.urls.regular
    
      }));
      setCarouselImages(fetchedImages);
    };

    const fetchCardImages = async () => {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: 'Samsung S24',
          per_page: 12,
          client_id: 'Rxp2BCKd-vTWqqUGG5oKD4_20iHiiTS1qTbKcW85bGg',
        }
      });
      const fetchedImages = response.data.results.map(image => ({
        src: image.urls.regular
      }));
      setCardImages(fetchedImages);
    };

    fetchCarouselImages();
    fetchCardImages();
  }, []);

  return (
  <>

   <div className="container mx-auto p-4">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
      >
        {carouselImages.map((image, index) => (
          <div key={index}>
            <motion.img src={image.src} alt={image.alt} style={{ height: '300px', width: '100%', objectFit: 'cover' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
        ))}
      </Carousel>
     
      <br />
    </div> <div className="grid sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8 space-x-6 mx-10 ">
        {cardImages.map((image, index) => (
          <motion.div key={index} className="border rounded-lg  shadow-lg "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img src={image.src} alt={image.alt} className="w-full h-48 object-cover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">Card</h3>
              <p>Description</p>
            </div>
          </motion.div>
        ))}
      </div>
      <Faq/>
        </> 
  );
}

export default Home;
