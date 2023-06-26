import React from 'react';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const BackTwiceButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-2); // Go back to the page before the error
  };

  return (
    <button
      className="fixed left-0 z-10 p-2 m-4 bg-[#ff5152] text-white rounded-full hover:scale-125 transition-transform duration-100"
      onClick={handleClick}
      aria-label="Back Button"
    >
      <FiArrowLeft className="text-white text-2xl" />
    </button>
  );
};

const NotFound = () => {
  return (
    <>
      <div className='flex items-center'>
        <BackTwiceButton />
        <Header text='404 - Page Not Found' />
      </div>
      <FlexBasisFull />
      <p className='text-sm sm:text-base'>The page or content you are looking for could not be found.</p>
      <FlexBasisFull />
      <p className='text-sm sm:text-base'>Please check the URL, try again, or go back to the <a href="/">homepage</a>.</p>
    </>
  );
};

export default NotFound;
