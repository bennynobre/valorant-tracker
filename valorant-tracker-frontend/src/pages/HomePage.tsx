// src/pages/HomePage.tsx

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // Verifique o import

function HomePage() {
  const [name, setName] = useState('curry');
  const [tag, setTag] = useState('0406');
  const [region, setRegion] = useState('na');
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !tag || !region) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    // Esta linha muda a URL no navegador
    navigate(`/player?region=${region}&name=${name}&tag=${tag}`);
  };

  return (
    <div className="container">
      <h1>Valorant Player Tracker</h1>
      <form onSubmit={handleSearch} className="search-form">
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="br">BR</option>
          <option value="na">NA</option>
          <option value="eu">EU</option>
          <option value="latam">LATAM</option>
          <option value="kr">KR</option>
          <option value="ap">AP</option>
        </select>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome de usuário"
        />
        <span>#</span>
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Tag"
          className="tag-input"
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default HomePage;