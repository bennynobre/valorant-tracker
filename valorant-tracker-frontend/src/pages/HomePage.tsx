import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EsportsMatchItem from '../components/EsportsMatchItem';
import { HomeHeader, HeaderContainer, NavLink, SearchForm, EsportsSection, MatchesGrid, DateGroup, DateHeader } from '../styles/HomePage.styles';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const isSameUTCDate = (d1: Date, d2: Date) => {
  return d1.getUTCFullYear() === d2.getUTCFullYear() &&
    d1.getUTCMonth() === d2.getUTCMonth() &&
    d1.getUTCDate() === d2.getUTCDate();
};

function HomePage() {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [playerRegion, setPlayerRegion] = useState('na');
  const navigate = useNavigate();

  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handlePlayerSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !tag) {
      alert('Por favor, preencha o nome e a tag do jogador.');
      return;
    }
    navigate(`/player?region=${playerRegion}&name=${name}&tag=${tag}`);
  };

  useEffect(() => {
    const fetchEsportsSchedule = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/esports/schedule`);
        setMatches(response.data.data || []);
      } catch (err) {
        setError('Não foi possível carregar a agenda de esports.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEsportsSchedule();
  }, []);

  const categorizedMatches = useMemo(() => {
    const liveMatches: any[] = [];
    const todayMatches: any[] = [];
    const tomorrowMatches: any[] = [];
    const upcomingMatches: any[] = [];

    const now = new Date();
    const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const tomorrowUTC = new Date(todayUTC);
    tomorrowUTC.setUTCDate(tomorrowUTC.getUTCDate() + 1);

    const futureMatches = matches.filter(match => match.state === 'unstarted' || match.state === 'in_progress');

    for (const match of futureMatches) {
      const matchDate = new Date(match.date);

      if (match.state === 'in_progress') {
        liveMatches.push(match);
      } else if (isSameUTCDate(matchDate, todayUTC)) {
        todayMatches.push(match);
      } else if (isSameUTCDate(matchDate, tomorrowUTC)) {
        tomorrowMatches.push(match);
      } else {
        upcomingMatches.push(match);
      }
    }
    return { liveMatches, todayMatches, tomorrowMatches, upcomingMatches };
  }, [matches]);
  
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
            <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="# Tag" className="tag-input" />
            <button type="submit">Buscar</button>
          </SearchForm>

          <NavLink to="/esports">Resultados Esports</NavLink>
        </HeaderContainer>
      </HomeHeader>

      <main className="container">
        <EsportsSection>
          {loading && <p>Carregando partidas...</p>}
          {error && <p className="error">{error}</p>}
          
          {!loading && !error && (
            <>
             <DateGroup>
                  <DateHeader isLive={categorizedMatches.liveMatches.length > 0}>AO VIVO AGORA</DateHeader>
                  {categorizedMatches.liveMatches.length > 0 ? (
                    <MatchesGrid>
                      {categorizedMatches.liveMatches
                        .filter(match => match.match?.id) 
                        .map(match => (
                          <EsportsMatchItem key={match.match.id} match={match} isLive={true} />
                        ))}
                    </MatchesGrid>
                  ) : (
                    <p style={{ opacity: 0.7, textAlign: 'center' }}>Sem partidas ao vivo no momento.</p>
                  )}
                </DateGroup>

              {categorizedMatches.todayMatches.length > 0 && (
                <DateGroup>
                  <DateHeader>HOJE, {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}</DateHeader>
                  <MatchesGrid>
                      {categorizedMatches.todayMatches
                        .filter(match => match.match?.id)
                        .map(match => (
                          <EsportsMatchItem key={match.match.id} match={match} />
                        ))}
                    </MatchesGrid>
                </DateGroup>
              )}

              {categorizedMatches.tomorrowMatches.length > 0 && (
                <DateGroup>
                  <DateHeader>AMANHÃ, {new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}</DateHeader>
                  <MatchesGrid>
                      {categorizedMatches.tomorrowMatches
                        .filter(match => match.match?.id)
                        .map(match => (
                          <EsportsMatchItem key={match.match.id} match={match} />
                        ))}
                    </MatchesGrid>
                </DateGroup>
              )}
            </>
          )}
        </EsportsSection>
      </main>
    </>
  );
}

export default HomePage;