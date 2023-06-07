import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi'; // Import the menu icon from Feather Icons

export const Navbar = ({ setSelectedOption }) => {
  const handleResetFilters = () => {
    setSelectedOption('No Filter');
  };

  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768); // Adjust the breakpoint value as needed
    };

    handleResize(); // Check the initial screen size

    window.addEventListener('resize', handleResize); // Add event listener for window resize
    document.addEventListener('mousedown', handleClickOutsideMenu); // Add event listener for clicks outside menu

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up event listener on unmount
      document.removeEventListener('mousedown', handleClickOutsideMenu); // Clean up event listener on unmount
    };
  }, []);

  const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { to: '/agents-list', text: 'Agents' },
    { to: '/weapons-list', text: 'Weapons' },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-[#ff5152] via-red-950 via-black to-black p-2 w-full flex items-baseline fixed z-10">
      <NavLink to="/">
        <h3 className="select-none p-1 font-bold cursor-pointer sm:ml-24">ValoChecker</h3>
      </NavLink>
      {!isMediumScreen && (
        <div className="ml-auto" ref={menuRef}>
          <button
            className="p-2 text-white hover:text-blue-700 focus:outline-none"
            onClick={handleMenuToggle}
          >
            <FiMenu size={20} /> {/* Replace the "Menu" text with the menu icon */}
          </button>
          {isMenuOpen && (
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
          )}
        </div>
      )}
      {isMediumScreen && (
        <>
          {navLinks.map((navLink, index) => (
            <NavLink key={index} to={navLink.to}>
              <h4
                className="select-none p-1 cursor-pointer active:font-bold"
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
        </>
      )}
    </nav>
  );
};
