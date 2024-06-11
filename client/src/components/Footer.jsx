import React from 'react';
import { Box, Container, Typography, Grid, Paper, Stack } from '@mui/material';
import logo from './secure.png';

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto', 
        backgroundColor: theme => theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="space-between" alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary" paragraph>
              Registered Office: Xyz Waste Management Pvt Ltd. | B-00, 1st Floor, Middle Circle, Connaught Place, New Delhi-110001, India, Support-00000000000 | CIN: 000000000000000000000
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Xyz Waste Management Pvt Ltd. is ISO 27001 & 27701 Compliance Certified. Person who may be contacted in case of any compliance related queries or grievances : Pankaj (Pankaj.@snapMart)
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              All product names, logos, and brands are property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Stack direction="column">
                <Typography variant='h5' align="center" sx={{fontWeight:'bold'}}>Safe Guards</Typography>
                <Stack direction='row' spacing={2} alignItems='center'>
                  <img src={logo} alt="Logo" className="" />
                  <Typography variant='body2'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae facere, inventore enim repellat maiores, officiis hic cum eos nemo sunt expedita.
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Typography variant='caption'>Copyright @ 2024 SnapMart All rights reserved</Typography>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
