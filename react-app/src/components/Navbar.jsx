import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = ({ setSelectedOption }) => {
  const handleResetFilters = () => {
    setSelectedOption('No Filter');
  };

  return (
    <nav className="bg-gradient-to-r from-[#ff5152] via-red-950 via-black to-black p-2 w-full flex items-baseline fixed z-10">
      <Link to="/">
        <h3 className="select-none p-1 font-bold cursor-pointer sm:ml-24">Valochecker</h3>
      </Link>
      <Link to="/agents-list">
        <h4 className="select-none p-1 cursor-pointer hover:text-blue-700 hover:font-bold" onClick={handleResetFilters}>
          Agents
        </h4>
      </Link>
      <Link to="/weapons-list">
        <h4 className="select-none p-1 cursor-pointer hover:text-blue-700 hover:font-bold">Weapons</h4>
      </Link>
    </nav>
  );
};
