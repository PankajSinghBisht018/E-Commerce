import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';

const CardGrid = () => {
  const [cardImages, setCardImages] = useState([]);

  useEffect(() => {
    const fetchCardImages = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: 'Samsung S24',
            per_page: 6,
            client_id: 'Rxp2BCKd-vTWqqUGG5oKD4_20iHiiTS1qTbKcW85bGg',
          }
        });
        const fetchedImages = response.data.results.map(image => ({
          src: image.urls.regular,
        }));
        setCardImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching card images:', error);
      }
    };

    fetchCardImages();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box mt={8}>
        <Grid container spacing={4}>
          {cardImages.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardMedia
                    component={motion.img}
                    image={image.src}
                    alt={`Card image ${index + 1}`}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  />
                  <CardContent>
                    <Typography variant="h6">Card</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Description
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CardGrid;
