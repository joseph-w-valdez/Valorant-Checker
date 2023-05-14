import './App.css';
import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage';
import AgentsList from './pages/AgentsList';
import WeaponsList from './pages/WeaponsList';
import IndividualAgent from './pages/IndividualAgent';
import IndividualWeapon from './pages/IndividualWeapon';

function App() {
  return (
    <div className="App flex flex-wrap justify-center">
      <Navbar />
      <div class="routes-container mt-12 w-full flex flex-wrap justify-center">
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/agents-list' element={<AgentsList />}/>
          <Route path='/weapons-list' element={<WeaponsList />}/>
          <Route path='/individual-agent' element={<IndividualAgent />} />
          <Route path='/individual-weapon' element={<IndividualWeapon />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;