import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const SnapMartWorks = () => {
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h4" gutterBottom>
          SnapMart Works? <br />
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box mb={2}>
                <img
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/512/69/69792.png"
                  width={96}
                  height={96}
                />
              </Box>
              <Typography variant="h6">1. Check Phone</Typography>
              <Typography color="textSecondary" align="center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ducimus quis labore expedita mollitia.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box mb={2}>
                <img
                  alt=""
                  src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/order-placed-purchased-icon.png"
                  width={96}
                  height={96}
                />
              </Box>
              <Typography variant="h6">2. Place Order</Typography>
              <Typography color="textSecondary" align="center">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit beatae culpa nisi. Quae, vitae.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box mb={2}>
                <img
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
                  width={96}
                  height={96}
                />
              </Box>
              <Typography variant="h6">3. Get Delivered</Typography>
              <Typography color="textSecondary" align="center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit molestias commodi vel voluptate laboriosam?
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SnapMartWorks;