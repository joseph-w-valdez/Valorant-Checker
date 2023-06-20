import React from 'react';

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <h1 className='select-none text-3xl sm:text-5xl my-6 mx-0 sm:mx-6 max-w-[60%] md:max-w-none'>{text}</h1>
  );
};

export default Header;
