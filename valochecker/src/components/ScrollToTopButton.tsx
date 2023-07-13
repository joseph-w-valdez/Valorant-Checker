import React from 'react';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="p-2 m-4 bg-[#ff5152] text-white rounded-full fixed bottom-0 right-0 active:translate-y-1 hover:scale-125 transition-transform duration-100"
      aria-label='Scroll To Top'
    >
      <FiArrowUp className="text-white text-2xl" />
    </button>
  );
};

export default ScrollToTopButton;
