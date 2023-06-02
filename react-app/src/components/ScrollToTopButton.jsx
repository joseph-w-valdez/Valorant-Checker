import React from 'react';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="p-2 m-4 bg-[#ff5152] text-white rounded-full fixed bottom-0 right-0"
    >
      <FiArrowUp className="text-white text-2xl" />
    </button>
  );
};

export default ScrollToTopButton;