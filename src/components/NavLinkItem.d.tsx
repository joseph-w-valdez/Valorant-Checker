declare module '.components/NavLinkItem' {
  import { FC } from 'react';

  export interface NavLinkItemProps {
    to: string;
    text: string;
    handleNavLinkClick: () => void;
    handleResetFilters?: () => void;
  }

  const NavLinkItem: FC<NavLinkItemProps>;

  export default NavLinkItem;
}
