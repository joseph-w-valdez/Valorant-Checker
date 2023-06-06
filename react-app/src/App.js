import React, { useState, useEffect } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AgentsList from './pages/AgentsList';
import WeaponsList from './pages/WeaponsList';
import IndividualAgent from './pages/IndividualAgent';
import IndividualAbility from './pages/IndividualAbility';
import IndividualWeapon from './pages/IndividualWeapon';
import WeaponSkins from './pages/WeaponSkins';
import IndividualSkin from './pages/IndividualSkin';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import Footer from './components/Footer';

function App() {
  const [selectedOption, setSelectedOption] = useState('No Filter');
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledAtTop = window.scrollY === 0;
      setShowButton(!isScrolledAtTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App flex flex-col min-h-screen">
      <Navbar setSelectedOption={setSelectedOption} />
      <main className="flex-grow">
        <div className="content-container mt-12 flex flex-wrap justify-center">
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route
                path="/agents-list"
                element={<AgentsList selectedOption={selectedOption} setSelectedOption={setSelectedOption} />}
              />
              <Route path="/weapons-list" element={<WeaponsList />} />
              <Route path="/agent/:agentName" element={<IndividualAgent setSelectedOption={setSelectedOption} />} />
              <Route path="/weapon/:weaponName" element={<IndividualWeapon />} />
              <Route path='/agent/:agentName/:abilityName' element={<IndividualAbility />} />
              <Route path='/weapon-skins' element={<WeaponSkins />} />
              <Route path='/individual-skin' element={<IndividualSkin />} />
            </Routes>
          </ScrollToTop>
        </div>
      </main>
      <Footer />
      {showButton && <ScrollToTopButton />}
    </div>
  );
}

export default App;
