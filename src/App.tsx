import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ReactLoading from 'react-loading';
import './App.css';

import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import Footer from './components/Footer';

import Homepage from './pages/Homepage';
import AgentsList from './pages/AgentsList';
import WeaponsList from './pages/WeaponsList';
import IndividualAgent from './pages/IndividualAgent';
import IndividualAbility from './pages/IndividualAbility';
import IndividualWeapon from './pages/IndividualWeapon';
import WeaponSkins from './pages/WeaponSkins';
import IndividualSkin from './pages/IndividualSkin';
import BuddiesList from './pages/BuddiesList';
import IndividualBuddy from './pages/IndividualBuddy';
import SpraysList from './pages/SpraysList';
import IndividualSpray from './pages/IndividualSpray';
import NotFound from './pages/NotFound';


import { useLoadingContext } from './contexts/LoadingContext';

function App(): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<string>('No Filter');
  const [showButton, setShowButton] = useState<boolean>(false);
  const { isLoading } = useLoadingContext();

  useEffect(() => {
    const handleScroll = (): void => {
      const isScrolledAtTop: boolean = window.scrollY === 0;
      setShowButton(!isScrolledAtTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App flex flex-col min-h-screen">
      {isLoading && (
        <div className="fixed flex flex-wrap justify-center items-center z-[100] w-full h-full">
          <ReactLoading type="spin" color="#fff" />
        </div>
      )}
      <Navbar setSelectedOption={setSelectedOption} />
      <main className="flex-grow">
        <div className="content-container mt-12 flex flex-wrap justify-center">
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/agents" element={<AgentsList selectedOption={selectedOption} setSelectedOption={setSelectedOption} />} />
              <Route path="/weapons" element={<WeaponsList selectedOption={selectedOption} setSelectedOption={setSelectedOption} />} />
              <Route path="/agent/:agentName"element={<IndividualAgent setSelectedOption={setSelectedOption} />} />
              <Route path="/weapon/:weaponName" element={<IndividualWeapon />} />
              <Route path="/agent/:agentName/:abilityName" element={<IndividualAbility />} />
              <Route path="/weapon/:weaponName/skins" element={<WeaponSkins />} />
              <Route path="/weapon/:weaponName/skins/:skinName" element={<IndividualSkin />} />
              <Route path="/buddies" element={<BuddiesList />} />
              <Route path="/buddy/:buddyName" element={<IndividualBuddy />} />
              <Route path="/sprays" element={<SpraysList />} />
              <Route path="/spray/:sprayName" element={<IndividualSpray />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ScrollToTop> {/* Ensure that the window scrolls to the top whenever the location changes */}
        </div>
      </main>
      <Footer />
      {showButton && <ScrollToTopButton />} {/* Conditionally render a clickable scroll to top button for the user */}
    </div>
  );
}

export default App;
