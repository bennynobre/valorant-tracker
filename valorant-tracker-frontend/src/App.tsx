import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlayerPage from './pages/PlayerPage';
import TermsPage from './pages/TermsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { GlobalStyle } from './styles/globalStyles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/terms" element={<TermsPage />} />

        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />      
        <Route 
          path="/player" 
          element={
              <ProtectedRoute>
                <PlayerPage />
              </ProtectedRoute>
          } />
      </Routes>
    </>
  );
}

export default App;