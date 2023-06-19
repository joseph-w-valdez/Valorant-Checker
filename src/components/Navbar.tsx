import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Menu from './Menu';
import NavLinkItem from './NavLinkItem';

type NavbarProps = {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar: React.FC<NavbarProps> = ({ setSelectedOption }) => {
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // check screen width to either show the nav links individually or the menu icon
  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutsideMenu);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    };
  }, []);

  const handleClickOutsideMenu = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  // nav link data
  const navLinks = [
    { to: '/agents-list', text: 'Agents' },
    { to: '/weapons-list', text: 'Weapons' },
    { to: '/buddies', text: 'Buddies'},
    { to: '/sprays', text: 'Sprays'},
  ];

  // toggle menu visibility when the menu icon is pressed
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // hide the menu when a nav link item is pressed
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // reset the filter options when switching pages to ensure all items are shown
  const handleResetFilters = () => {
    setSelectedOption('No Filter');
  };

  return (
    <nav className="bg-gradient-to-r from-[#ff5152] via-red-950 via-black to-black p-2 w-full flex items-center fixed z-10">
      <NavLink to="/">
        <h3 className="select-none p-1 font-bold cursor-pointer sm:ml-24">ValoChecker</h3>
      </NavLink>
      {/* if the screen is small, show the menu icon */}
      {!isMediumScreen && (
        <div className="ml-auto" ref={menuRef}>
          <div className="relative">
            <button
              className="text-gray-500 w-10 h-10 relative focus:outline-none"
              onClick={handleMenuToggle}
            >
              <span className="sr-only">Open main menu</span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${isMenuOpen ? 'rotate-45' : 'translate-y-1.5'}`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${isMenuOpen ? '-rotate-45' : '-translate-y-1.5'}`}
              ></span>
            </button>
            {isMenuOpen && (
              <Menu
                navLinks={navLinks}
                handleNavLinkClick={handleNavLinkClick}
                handleResetFilters={handleResetFilters}
              />
            )}
          </div>
        </div>
      )}
      {/* if the screen isn't small, show the nav link items individually */}
      {isMediumScreen && (
        <>
          {navLinks.map((navLink, index) => (
            <NavLinkItem
              key={index}
              to={navLink.to}
              text={navLink.text}
              handleNavLinkClick={handleNavLinkClick}
              handleResetFilters={handleResetFilters}
            />
          ))}
        </>
      )}
    </nav>
  );
};

export default Navbar;
