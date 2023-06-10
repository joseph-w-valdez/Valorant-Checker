import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <button
      className="fixed left-0 z-10 p-2 m-4 bg-[#ff5152] text-white rounded-full hover:scale-125 transition-transform duration-100"
      onClick={handleClick}
    >
      <FiArrowLeft className="text-white text-2xl" />
    </button>
  );
};

export default BackButton;
