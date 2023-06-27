import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { debounce } from 'lodash';
import Subheader from './Subheader';
import FlexBasisFull from './FlexBasisFull';
import { fetchAllSkins } from '../utilities/fetchWeapons';
import { useFetchArray } from '../hooks/useFetchRequest';
import { useLoadingContext } from '../contexts/LoadingContext';
import { getRandomSkins } from '../utilities/getRandomSkins';

const MyCarousel: React.FC = () => {
  const { setIsLoading } = useLoadingContext();
  const skins = useFetchArray(fetchAllSkins, '');
  const [randomKey, setRandomKey] = useState<number>(0);

  const regenerateRandomSkins = debounce(() => {
    setRandomKey((prevKey) => prevKey + 1); // Increment the randomKey to trigger re-render
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 150);
  }, 200);

  const slides = getRandomSkins(skins, 8).map((skin: any, index: number) => ({
    title: skin.displayName,
    img: skin.levels[0].displayIcon
  }));

  return (
    <>
      <Subheader text='Featured Random Skins' />
      <FlexBasisFull />
      <Carousel
        key={randomKey} // Re-render the Carousel with a new randomKey to populate it with new random items
        showArrows={true}
        showIndicators={true}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={2000}
        swipeable={true}
        emulateTouch={true}
        stopOnHover={true}
        className='mx-10 w-1/2 flex flex-wrap items-center w-96 h-96 border border-4 border-white rounded box-content overflow-hidden'
        aria-label="Featured Random Skins Carousel"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-full h-96 flex flex-wrap items-center justify-center text-2xl`}
          >
            <h3 className="text-black absolute top-0 mt-4 w-full bg-white bg-opacity-[95%] p-2 ">{slide.title}</h3>
            <img src={slide.img} alt={`${slide.title} image`} className='p-8' />
          </div>
        ))}
      </Carousel>
      <FlexBasisFull />
      <button
        onClick={regenerateRandomSkins}
        className="bg-[#FE5152] text-white font-bold py-2 px-4 mt-4 mb-4 rounded"
        aria-label='Load New Random Skins'
      >
        Load New Random Skins
      </button>
    </>
  );
};

export default MyCarousel;
