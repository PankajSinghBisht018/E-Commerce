import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Typography, Grid, Button, Rating } from '@mui/material';
import { fetchProducts } from '../../features/ProductSlice';
import { addToCart } from '../../features/CartSlice';

function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const productsStatus = useSelector((state) => state.products.status);
  const products = useSelector((state) => state.products.items);
  const product = products.find((item) => item.id === Number(productId));

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

  useEffect(() => {
    console.log('Product ID:', productId);
    console.log('Products:', products);
    console.log('Product:', product);
  }, [productId, products, product]);

  if (productsStatus === 'loading') {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'contain',
                border: '1px solid #e0e0e0',
                padding: '10px',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">{product.name}</Typography>
            <Rating value={product.rating} readOnly />
            <Typography variant="body1" color="text.secondary">
              {product.reviews} reviews
            </Typography>
            <Typography variant="h5" color="text.primary">
              ₹{product.price}
            </Typography>
            <Typography variant="body1">
              Effective Price: ₹{product.effectivePrice}
            </Typography>
            <Typography variant="body1" color="error">
              Discount: ₹{product.discount} ({product.discountPercentage}%)
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ProductDetail;
