import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlayerPage from './pages/PlayerPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      {/* Mude esta linha */}
      <Route path="/player" element={<PlayerPage />} />
    </Routes>
  );
}

export default App;