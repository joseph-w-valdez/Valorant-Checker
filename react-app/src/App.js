import './App.css';
import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage';
import AgentsList from './pages/AgentsList';
import WeaponsList from './pages/WeaponsList';

function App() {
  return (
    <div className="App flex flex-wrap justify-center">
      <Navbar />
      <div class="routes-container w-full flex flex-wrap justify-center">
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/agents-list' element={<AgentsList />}/>
          <Route path='/weapons-list' element={<WeaponsList />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
