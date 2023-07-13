import React from 'react';
import Link from 'next/link';

type NavLinkItem = {
  href: string;
  text: string;
};

type MenuProps = {
  navLinks: NavLinkItem[];
  handleNavLinkClick: () => void;
  handleResetFilters: () => void;
};

const Menu: React.FC<MenuProps> = ({ navLinks, handleNavLinkClick, handleResetFilters }) => {
  return (
    <div className="absolute right-0 bg-[#832222] py-2 px-4 mt-1 mr-2 rounded shadow-lg">
      {navLinks.map((navLink, index) => (
        <Link key={index} href={navLink.href}>
          <h4
            className="p-1 cursor-pointer text-white font-bold"
            onClick={() => {
              handleNavLinkClick();
              if (index === 0) {
                handleResetFilters();
              }
            }}
          >
            {navLink.text}
          </h4>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
