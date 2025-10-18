import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Container } from '../styles/common';
import { PageHeader, FilterSelect, ResultsList, BackLink } from '../styles/EsportsPage.styles';
import EsportsResultCard from '../components/EsportsResultCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const majorLeagues = [
  { name: 'VCT Americas', id: 'vct_americas' },
  { name: 'VCT EMEA', id: 'vct_emea' },
  { name: 'VCT Pacific', id: 'vct_pacific' },
  { name: 'Champions', id: 'champions' },
];

const enrichMatchesWithStage = (matches: any[]) => {
  const groupedByTournament = matches.reduce((acc, match) => {
    const tournamentName = match.tournament.name;
    if (!acc[tournamentName]) {
      acc[tournamentName] = [];
    }
    acc[tournamentName].push(match);
    return acc;
  }, {});

  const enrichedMatches = Object.values(groupedByTournament).flatMap((tournamentMatches: any) => {
    const sortedMatches = tournamentMatches.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return sortedMatches.map((match: any, index: number, array: any[]) => {
      let inferredStage: string | undefined = undefined;
      const totalMatches = array.length;

      if (index === totalMatches - 1) {
        inferredStage = 'Final';
      } else if (index >= totalMatches - 3) {
        inferredStage = 'Semi Final';
      } else if (index >= totalMatches - 7) {
        inferredStage = 'Quartas';
      } else if (match.tournament.name.toLowerCase().includes('playoffs')) {
        inferredStage = 'Playoffs';
      } else if (match.tournament.name.toLowerCase().includes('group')) {
        inferredStage = 'Grupos';
      } else {
        inferredStage = match.tournament.name; 
      }
      
      return { ...match, inferredStage }; 
    });
  });

  return enrichedMatches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};


function EsportsPage() {
  const [allMatches, setAllMatches] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<string[]>([]);
  
  const [selectedLeague, setSelectedLeague] = useState(majorLeagues[0].id); 
  const [selectedTournament, setSelectedTournament] = useState('all');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEsportsData = async () => {
      setLoading(true);
      setError(null);
      setAllMatches([]);
      setTournaments([]);
      setSelectedTournament('all'); 

      try {
        const response = await axios.get(`${API_BASE_URL}/esports/schedule?league=${selectedLeague}`);
        
        const completedMatches = response.data.data.filter((match: any) => 
          match.state === 'completed' &&
          match.match?.teams?.length >= 2 &&
          typeof match.match.teams[0]?.game_wins === 'number'
        );

        const uniqueTournaments = Array.from(new Set(completedMatches.map((match: any) => match.tournament.name)));
        setTournaments(uniqueTournaments as string[]);
        
        setAllMatches(completedMatches);
      } catch (err) {
        setError('Não foi possível carregar os resultados de esports.');
      } finally {
        setLoading(false);
      }
    };
    fetchEsportsData();
  }, [selectedLeague]); 

  const filteredMatches = useMemo(() => {
    const enriched = enrichMatchesWithStage(allMatches);

    if (selectedTournament === 'all') {
      return enriched;
    }
    return enriched.filter(match => match.tournament.name === selectedTournament);
  }, [allMatches, selectedTournament]);

  return (
    <Container style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
    <BackLink to="/">Voltar para Home</BackLink>
      <PageHeader>
        <h1>Resultados de Esports</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <FilterSelect value={selectedLeague} onChange={(e) => setSelectedLeague(e.target.value)}>
            {majorLeagues.map(league => (
              <option key={league.id} value={league.id}>{league.name}</option>
            ))}
          </FilterSelect>

          {tournaments.length > 1 && (
            <FilterSelect value={selectedTournament} onChange={(e) => setSelectedTournament(e.target.value)}>
              <option value="all">Todos os Torneios</option>
              {tournaments.map(tournament => (
                <option key={tournament} value={tournament}>{tournament}</option>
              ))}
            </FilterSelect>
          )}
        </div>
      </PageHeader>

      {loading && <p>Carregando resultados...</p>}
      {error && <p className="error">{error}</p>}
      
      {!loading && !error && filteredMatches.length > 0 ? (
       <ResultsList>
          {filteredMatches.map(match => (
            <EsportsResultCard 
              key={match.match.id} 
              match={match} 
              stage={match.inferredStage}
            />
          ))}
        </ResultsList>
      ) : (
        !loading && <p>Nenhum resultado encontrado para os filtros selecionados.</p>
      )}
    </Container>
  );
}

export default EsportsPage;