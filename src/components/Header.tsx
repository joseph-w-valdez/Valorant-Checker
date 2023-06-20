import React from 'react';

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <h1 className='select-none text-3xl md:text-5xl my-6 mx-12 375:mx-16 sm:mx-8'>{text}</h1>
  )
};

export default Header;
