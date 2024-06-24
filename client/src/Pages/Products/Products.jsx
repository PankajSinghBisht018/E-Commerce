import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Button, Grid, Typography } from '@mui/material';
import { Card, CardContent, CardMedia, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import { motion } from 'framer-motion';
import { addToCart } from '../../features/CartSlice';
import productsData from '../productsData.json';

function Products() {
  const [products, setProducts] = useState(productsData);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexLastProduct = currentPage * itemsPerPage;
  const indexFirstProduct = indexLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexFirstProduct, indexLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SnapMart - Products</title>
        <meta name="description" content="Products" />
        <link rel="icon" type="image/png" href="/logo.png" />
      </Helmet>
      <div className="container mx-auto py-8">
        <Typography variant="h3" align="center" gutterBottom>
          Products
        </Typography>
        <Grid container spacing={3}>
          {currentProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', my: 1.5, cursor: 'pointer' }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, bgcolor: 'yellow', zIndex: 10, borderRadius: '0 0 4px 0', px: 1.5, py: 0.5 }}>
                    <Typography variant="caption" fontWeight="bold">
                      ₹{product.discount} OFF
                    </Typography>
                  </Box>
                  <CardMedia
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{ objectFit: 'contain', height: { xs: '112px', sm: '160px' }, my: 3, mx: 'auto' }}
                  />
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="h6" className="line-clamp-2" title={product.name} sx={{ height: '36px', mx: 1 }}>
                      {product.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1, mx: 1 }}>
                      <Rating name="read-only" value={product.rating} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary">
                        ({product.reviews})
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 1, mx: 2.5, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="caption" color="text.secondary">
                        Effective Price
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
                  </CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                    sx={{ m: 1 }}
                  >
                    Add to Cart
                  </Button>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        <br />
        <div className="flex justify-between bottom-0 mx-4">
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
        </div>
      </div>
    </>
  );
}

export default Products;
