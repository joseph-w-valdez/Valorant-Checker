import React from 'react';

type SubheaderProps = {
  text: string;
};

const Subheader: React.FC<SubheaderProps> = ({ text }) => {
  return <h1 className='select-none mb-4 text-lg sm:5xl'>{text}</h1>;
};

export default Subheader;
