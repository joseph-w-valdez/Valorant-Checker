import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { debounce } from 'lodash';
import Subheader from './Subheader';
import FlexBasisFull from './FlexBasisFull';
import { fetchAllSkins } from '../utilities/fetchWeapons';
import { useFetchArray } from '../hooks/useFetchRequest';
import { useLoadingContext } from '../contexts/LoadingContext';
import { getRandomSkins } from '../utilities/getRandomSkins';
import weapons from '../data/weapons';
import { findMatchingString } from '../utilities/weaponUtils';
import { useNavigate } from 'react-router-dom';
import { onlyLettersAndNumbers } from '../utilities/stringConversions';

const MyCarousel: React.FC = () => {
  const { isLoading, setIsLoading } = useLoadingContext();
  const skins = useFetchArray(fetchAllSkins, '');
  const [randomKey, setRandomKey] = useState<number>(0);
  const navigate = useNavigate()

  const regenerateRandomSkins = debounce(() => {
    setRandomKey((prevKey) => prevKey + 1); // Increment the randomKey to trigger re-render
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 150);
  }, 200);

  const slides = getRandomSkins(skins, 8).map((skin: any, index: number) => {
    // Cross-check the name of the skin with the array of weapon names; if there's a match return that match, otherwise, return 'Melee'
    const matchingWeapon = findMatchingString(skin.displayName, weapons);

  return {
    title: skin.displayName,
    img: skin.levels[0].displayIcon,
    link: `/weapon/${matchingWeapon}/skins/${onlyLettersAndNumbers(skin.displayName)}`,
  };
});

  // Check if the skins data is available before rendering the Carousel component
  if (!skins && isLoading) {
    return null
  }

  useEffect(()=>{
    regenerateRandomSkins()
  }, [])

  return (
    <>
      <Subheader text='Featured Random Skins:' />
      <FlexBasisFull />
      <Carousel
        key={randomKey} // Re-render the Carousel with a new randomKey to populate it with new random items
        showArrows={true}
        showIndicators={true}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={2000}
        className='mx-10 w-1/2 flex flex-wrap items-center w-96 h-96 border border-4 border-white rounded box-content overflow-hidden hover:bg-white hover:bg-opacity-25'
        aria-label="Featured Random Skins Carousel"
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          const defStyle = {
              marginLeft: 20,
              backgroundColor: "white",
              cursor: "pointer",
              height: "9px",
              width: "9px",
              borderRadius: '50%',
              display: 'inline-block',
              opacity: '75%',
              border: 'none',
              transition: 'opacity 0.1s ease-in-out',
          };
          const style = isSelected
              ? { ...defStyle, backgroundColor: "#FE5152", opacity: 1 }
              : { ...defStyle };
          return (
              <span
                  style={style}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.75'}
                  onClick={onClickHandler}
                  onKeyDown={onClickHandler}
                  key={index}
                  role="button"
                  tabIndex={0}
                  aria-label={`${label} ${index + 1}`}
              >
              </span>
          );
        }}
      >
        {slides.map((slide, index) => (
          <button
            key={index}
            className={`w-full h-96 flex flex-wrap items-center justify-center text-2xl`}
            onClick={() => {
              navigate(slide.link)
              console.log('Slide clicked:', slide);
            }}
          >
            <h3 className="text-black absolute top-0 mt-4 w-full bg-white bg-opacity-[85%] p-2 ">{slide.title}</h3>
            <img src={slide.img} alt={`${slide.title} image`} className='p-8' />
          </button>
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
