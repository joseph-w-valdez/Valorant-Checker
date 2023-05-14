import React, { useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AgentsList from './pages/AgentsList';
import WeaponsList from './pages/WeaponsList';
import IndividualAgent from './pages/IndividualAgent';
import IndividualWeapon from './pages/IndividualWeapon';

function App() {
  const [selectedOption, setSelectedOption] = useState('No Filter');

  return (
    <div className="App flex flex-wrap justify-center">
      <Navbar setSelectedOption={setSelectedOption}/>
      <div className="routes-container mt-12 w-full flex flex-wrap justify-center">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/agents-list"
            element={<AgentsList selectedOption={selectedOption} setSelectedOption={setSelectedOption} />}
          />
          <Route path="/weapons-list" element={<WeaponsList />} />
          <Route path="/individual-agent" element={<IndividualAgent setSelectedOption={setSelectedOption} />} />
          <Route path="/individual-weapon" element={<IndividualWeapon />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
