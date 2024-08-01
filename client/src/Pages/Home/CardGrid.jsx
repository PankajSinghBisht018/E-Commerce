import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, Rating } from '@mui/material';
import productData from '../productsData.json'; 

const CardGrid = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCardData = () => {
      const limitedData = productData.slice(0, 4).map(item => ({
        name: item.name,
        brand: item.brand,
        rating: item.rating,
        image: item.image,
      }));
      setCards(limitedData);
    };

    fetchCardData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box mt={8}>
        <Grid container spacing={4}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border rounded-lg shadow-lg">
                  <CardMedia
                    component="img"
                    image={card.image}
                    style={{ objectFit: 'contain', height: '200px' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  />
                  <CardContent>
                    <Typography variant="h6" className="font-bold">
                      {card.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Brand: {card.brand}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                      <Rating value={card.rating} precision={0.5} readOnly />
                      <Typography variant="body2" color="textSecondary" ml={1}>
                        ({card.rating})
                      </Typography>
                    </Box>
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
