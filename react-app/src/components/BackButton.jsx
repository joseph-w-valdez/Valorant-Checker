import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <button
      className="w-[40px] h-[40px] relative top-[6px] hover:scale-125 active:translate-y-[5px] transition-transform duration-100"
      onClick={handleClick}
    >
      <img src="../assets/images/back-arrow.webp" alt="back button" className="object-contain" />
    </button>
  );
};

export default BackButton;
