import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Container } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Faq() {
  return (
    <Container maxWidth="lg"> 
      <Box display="flex" flexDirection="column" sx={{ paddingBottom: '20px',marginTop: '20px'}} >
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px', }}>
          FAQs
        </Typography>
        <Box width="100%">
          <Accordion sx={{ width: '100%' }} >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Where can I turn in old phones for cash?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                In India, there are many websites to sell your old mobile phone for cash, but if you are looking for reliability, then Cashify is the most trusted platform to sell your mobile for instant cash.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ marginTop: '10px', width: '100%' }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography variant='body1' sx={{ fontWeight: 'bold' }}>How can I sell my old cell phone?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Once a phone is sold to us, we refurbish it and rectify whatever issues it might have. Following which, we sell these devices to retailers so that they can be further sold to customers looking to buy second-hand devices.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ marginTop: '10px', width: '100%' }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography variant='body1' sx={{ fontWeight: 'bold' }}>What do you do with my old phone?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                After visiting the Cashify website or app, select the product category you want to sell. Suppose you want to sell your mobile phone - click on the mobile section, select the brand, select the variant and answer a few questions about the state of the device. That's it. After that, Cashify will generate its quote and if you like the price, we will deliver the money to your home and collect your old device.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Container>
  );
}

export default Faq;
