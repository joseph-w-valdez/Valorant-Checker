import React from 'react';
import Link from 'next/link';

type NavLinkItemProps = {
  href: string;
  text: string;
  handleNavLinkClick: () => void;
  handleResetFilters?: () => void;
};

const NavLinkItem: React.FC<NavLinkItemProps> = ({ href, text, handleNavLinkClick, handleResetFilters }) => {
  return (
    <Link href={href}>
      <h4
        className="p-1 cursor-pointer active:font-bold"
        onClick={() => {
          handleNavLinkClick();
          if (handleResetFilters && href === '/agents') {
            handleResetFilters();
          }
        }}
      >
        {text}
      </h4>
    </Link>
  );
};

export default NavLinkItem;
