import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinkItem = ({ to, text, handleNavLinkClick, handleResetFilters }) => {
  return (
    <NavLink to={to}>
      <h4
        className="select-none p-1 cursor-pointer active:font-bold"
        onClick={() => {
          handleNavLinkClick();
          if (handleResetFilters && to === '/agents-list') {
            handleResetFilters();
          }
        }}
      >
        {text}
      </h4>
    </NavLink>
  );
};

export default NavLinkItem;
