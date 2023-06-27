import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Subheader from './Subheader';
import FlexBasisFull from './FlexBasisFull';

const MyCarousel: React.FC = () => {
  const slides = [
    { title: 'Slide 1', color: 'bg-orange-300' },
    { title: 'Slide 2', color: 'bg-blue-400' },
    { title: 'Slide 3', color: 'bg-green-400' },
  ];

  return (
    <>
      <Subheader text='Random Skins'/>
      <FlexBasisFull />
      <Carousel
        showArrows={true}
        showIndicators={true}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={2000}
        className='mb-4 w-1/2 flex flex-wrap items-center w-96 h-96 border border-[17px] border-[#FE5152] rounded-lg box-content'
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-full h-96 ${slide.color} flex flex-wrap items-center justify-center font-bold text-2xl`}
          >
            <h3 className="text-white">{slide.title}</h3>
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default MyCarousel;
