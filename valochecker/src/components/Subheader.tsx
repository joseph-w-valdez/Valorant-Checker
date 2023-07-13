import React from 'react';

type SubheaderProps = {
  text: string;
};

const Subheader: React.FC<SubheaderProps> = ({ text }) => {
  return <h1 className='my-4 text-xl 375:text-2xl'>{text}</h1>;
};

export default Subheader;
