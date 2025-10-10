import { useState, useEffect, useMemo } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import EsportsMatchItem from '../components/EsportsMatchItem';

import {
  HomeHeader,
  HeaderContainer,
  SearchForm,
  EsportsSection,
  Filters,
  MatchesGrid,
} from '../styles/HomePage.styles';
import { Container } from '../styles/common';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function HomePage() {

  // State to player search
  const [name, setName] = useState('curry');
  const [tag, setTag] = useState('0406');
  const [playerRegion, setPlayerRegion] = useState('na');
  const navigate = useNavigate();

  // State to esports matches
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Esports Filter
  const [selectedRegion, setSelectedRegion] = useState('international');
  const [selectedLeague, setSelectedLeague] = useState('all');

  const handlePlayerSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !tag) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    navigate(`/player?region=${playerRegion}&name=${name}&tag=${tag}`);
  };

  useEffect(() => {
    const fetchEsportsSchedule = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/esports/schedule`);
        const upcomingMatches = response.data.data.filter((match: any) => match.state === 'unstarted');
        setMatches(upcomingMatches);
      } catch (err) {
        setError('Não foi possível carregar os próximos jogos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEsportsSchedule();
  }, []);

  const filteredMatches = useMemo(() => {
    return matches.filter(match => {
      const regionMatch = selectedRegion === 'all' || match.league.region.toLowerCase() === selectedRegion;
      const leagueMatch = selectedLeague === 'all' || match.league.name.toLowerCase().includes(selectedLeague.toLowerCase());
      return regionMatch && leagueMatch;
    });
  }, [matches, selectedRegion, selectedLeague]);

  return (
     <>
      <HomeHeader>
        <HeaderContainer>
          <h1>Valorant Tracker</h1>
          <SearchForm onSubmit={handlePlayerSearch}>
            <select value={playerRegion} onChange={(e) => setPlayerRegion(e.target.value)}>
              <option value="br">BR</option>
              <option value="na">NA</option>
              <option value="eu">EU</option>
            </select>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome de usuário" />
            <span>#</span>
            <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Tag" className="tag-input" />
            <button type="submit">Buscar</button>
          </SearchForm>

        </HeaderContainer>
      </HomeHeader>

      <main>
        <Container>
          <EsportsSection>
            <h2>Próximas Partidas Tier 1</h2>
            <Filters>
              <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                <option value="all">Todas as Regiões</option>
                <option value="international">Internacional</option>
                <option value="north america">América do Norte</option>
                <option value="emea">EMEA</option>
                <option value="brazil">Brasil</option>
                <option value="korea">Coreia</option>
                <option value="japan">Japão</option>
              </select>
            </Filters>
                        {!loading && !error && (
              <MatchesGrid>
                {filteredMatches.length > 0 ? (
                  filteredMatches.map(match => (
                    <EsportsMatchItem key={match.match.id} match={match} />
                  ))
                ) : (
                  <p>Nenhuma partida encontrada com os filtros selecionados.</p>
                )}
              </MatchesGrid>
            )}

          </EsportsSection>
        </Container>
      </main>
    </>
  );
}

export default HomePage;