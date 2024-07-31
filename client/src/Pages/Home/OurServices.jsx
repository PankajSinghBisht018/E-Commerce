import React from 'react';
import { Box, Grid, Typography, Link, Container } from '@mui/material';

const services = [
  {
    href: '/',
    imgSrc: 'https://www.freeiconspng.com/thumbs/iphone-x-pictures/apple-iphone-x-pictures-5.png',
    alt: 'Buy Phone',
    text: 'Buy Phone'
  },
  {
    href: '/',
    imgSrc: 'https://www.transparentpng.com/download/laptop/9oRuDc-refreshed-pavilion-gaming-series-launching-next-month.png',
    alt: 'Buy Laptops',
    text: 'Buy Laptops'
  },
  {
    href: '/',
    imgSrc: 'https://www.pngall.com/wp-content/uploads/5/Full-HD-LED-TV-PNG-Picture.png',
    alt: 'Buy TV',
    text: 'Buy TV'
  },
  {
    href: '/',
    imgSrc: 'https://static.vecteezy.com/system/resources/previews/036/731/839/non_2x/ai-generated-earphone-isolated-on-transparent-background-free-png.png',
    alt: 'Ear Buds',
    text: 'Ear Buds'
  },
  {
    href: '/',
    imgSrc: 'https://www.pngall.com/wp-content/uploads/15/Apple-Watch-No-Background.png',
    alt: 'Buy Smartwatches',
    text: 'Buy Smartwatches'
  },
  {
    href: '/',
    imgSrc: 'https://purepng.com/public/uploads/thumbnail/purepng.com-audio-speakeraudio-speakersaudiospeakerssound-speaker-1701528343466syl6f.png',
    alt: 'Buy Mobile',
    text: 'Buy Mobile accessories'
  },
];

function OurServices() {
  return (
    <Container maxWidth="lg">
      <Box py={4} px={2}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'left' }}>Our Services</Typography>
        <Grid container spacing={2} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={6} sm={3} md={2} key={index}>
              <Link href={service.href} underline="none">
                <Box display="flex" flexDirection="column" alignItems="center" sx={{ textAlign: 'center' }}>
                  <Box
                    component="img"
                    src={service.imgSrc}
                    alt={service.alt}
                    sx={{
                      width: '150px', 
                      height: '150px', 
                      borderRadius: '15px',
                      objectFit: 'contain'
                    }}
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {service.text}
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default OurServices;
