import React from 'react';
import { NavLink } from 'react-router-dom';

type NavLinkItemProps = {
  to: string;
  text: string;
  handleNavLinkClick: () => void;
  handleResetFilters?: () => void;
};

const NavLinkItem: React.FC<NavLinkItemProps> = ({ to, text, handleNavLinkClick, handleResetFilters }) => {
  return (
    <NavLink to={to}>
      <h4
        className="p-1 cursor-pointer active:font-bold"
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
