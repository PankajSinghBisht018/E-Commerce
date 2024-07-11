import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Button, Grid, Typography, Box, Card, CardContent, CardMedia, Slider } from '@mui/material';
import Rating from '@mui/material/Rating';
import { motion } from 'framer-motion';
import { addToCart } from '../../features/CartSlice';
import { useNavigate, useLocation } from 'react-router-dom';

function Products() {
  const products = useSelector(state => state.products.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    product.price >= priceRange[0] &&
    product.price <= priceRange[1]
  );

  const indexLastProduct = currentPage * itemsPerPage;
  const indexFirstProduct = indexLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexFirstProduct, indexLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Box display="flex">
        <Box p={2} width="250px">
          <Typography variant="h6">Filters</Typography>
          <Box my={2}>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
            />
            <Typography>₹{priceRange[0]} - ₹{priceRange[1]}</Typography>
          </Box>
        </Box>
        <Box flex="1" p={2}>
          <Grid container spacing={2}>
            {currentProducts.map(product => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{ height: 140, objectFit: 'contain', cursor: 'pointer' }}
                      onClick={() => navigate(`/products/${product.id}`)}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h6">{product.name}</Typography>
                        <Rating value={product.rating} readOnly />
                        <Typography variant="body2" color="text.secondary">
                          {product.reviews} reviews
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                          <Typography variant="body1" color="error">
                            -{product.discountPercentage}%
                          </Typography>
                          <Typography variant="h5" color="text.primary">
                            ₹{product.price}
                          </Typography>
                        </Box>
                        <Typography variant="caption">₹{product.effectivePrice}/month No Cost EMI</Typography>
                      </Box>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        sx={{ mt: 2 }}
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          <br />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            <Typography>
              Page {currentPage} of {totalPages}
            </Typography>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Products;
