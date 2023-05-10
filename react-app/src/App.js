import './App.css';
import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage';
import AgentsList from './pages/AgentsList';

function App() {
  return (
    <div className="App flex flex-wrap justify-center">
      <Navbar />
      <div class="routes-container">
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/agents-list' element={<AgentsList />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
