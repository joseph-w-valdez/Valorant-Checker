import './App.css';
import Homepage from './pages/Homepage';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App flex flex-wrap justify-center">
      <Navbar />
      <Homepage />
    </div>
  );
}

export default App;
