import React from 'react';

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <h1 className='select-none text-xl sm:text-5xl my-6 mx-0 sm:mx-6'>{text}</h1>
  );
};

export default Header;
