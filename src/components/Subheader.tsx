import React from 'react';

type SubheaderProps = {
  text: string;
};

const Subheader: React.FC<SubheaderProps> = ({ text }) => {
  return <h1 className='mb-4 text-md 375:text-lg'>{text}</h1>;
};

export default Subheader;
