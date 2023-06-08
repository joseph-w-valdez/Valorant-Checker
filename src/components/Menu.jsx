import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = ({ navLinks, handleNavLinkClick, handleResetFilters }) => {
  return (
    <div className="absolute right-0 bg-[#832222] py-2 px-4 mt-1 mr-2 rounded shadow-lg">
      {navLinks.map((navLink, index) => (
        <NavLink key={index} to={navLink.to}>
          <h4
            className="select-none p-1 cursor-pointer text-white font-bold"
            onClick={() => {
              handleNavLinkClick();
              if (index === 0) {
                handleResetFilters();
              }
            }}
          >
            {navLink.text}
          </h4>
        </NavLink>
      ))}
    </div>
  );
};

export default Menu;
