import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import { motion } from 'framer-motion';
import { Container, Box } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselComponent = () => {
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: 'Samsung S24',
            per_page: 3,
            client_id: 'Rxp2BCKd-vTWqqUGG5oKD4_20iHiiTS1qTbKcW85bGg',
          }
        });
        const fetchedImages = response.data.results.map(image => ({
          src: image.urls.regular,
          alt: image.alt_description || `Carousel image ${index + 1}`,
        }));
        setCarouselImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching carousel images:', error);
      }
    };

    fetchCarouselImages();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box py={4}>
        <Carousel
          showArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          dynamicHeight={true}
        >
          {carouselImages.map((image, index) => (
            <div key={index}>
              <motion.img
                src={image.src}
                alt={image.alt}
                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
            </div>
          ))}
        </Carousel>
      </Box>
    </Container>
  );
};

export default CarouselComponent;
