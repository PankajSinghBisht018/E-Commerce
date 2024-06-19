import React from 'react';
import CarouselComponent from './HomeSection/CarouselComponent';
import SnapMartWorks from './HomeSection/SnapMartWorks';
import CardGrid from './HomeSection/CardGrid';
import Faq from './HomeSection/Faq';
import OurServices from './HomeSection/OurServices';
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