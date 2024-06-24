import React from 'react';
import CarouselComponent from './CarouselComponent';
import SnapMartWorks from './SnapMartWorks';
import CardGrid from './CardGrid';
import Faq from './Faq';
import OurServices from './OurServices';
const Home = () => {
  return (
    <>
      <CarouselComponent />
      <OurServices />
      <SnapMartWorks />
      <CardGrid />
      <Faq />
    </>
  );
};
export default Home;