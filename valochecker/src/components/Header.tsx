import React from 'react';

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <h1 className='text-3xl md:text-5xl mx-12 mb-4 375:mx-16 sm:mx-8'>{text}</h1>
  )
};

export default Header;
