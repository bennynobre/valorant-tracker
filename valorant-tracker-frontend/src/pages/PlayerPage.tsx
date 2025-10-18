import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container } from '../styles/common';
import { ResultsGrid, ChartSection, ChartHeader, FilterContainer, FilterButton } from '../styles/PlayerPage.styles';
import PlayerProfile from '../components/PlayerProfile';
import PlayerMMR from '../components/PlayerMMR';
import PlayerMatches from '../components/PlayerMatches';
import PerformanceChart from '../components/PerformanceChart';
import type { Match } from '../types/valorant';

interface CharacterV1 { id: string; name: string; }
interface MapInfoV1 { id: string; name: string; }
interface CharacterData { iconUrl: string; }
interface MapData { imageUrl: string; }

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function PlayerPage() {
  const [searchParams] = useSearchParams();
  const region = searchParams.get('region');
  const name = searchParams.get('name');
  const tag = searchParams.get('tag');

  const [playerData, setPlayerData] = useState<any>(null);
  const [mmrData, setMmrData] = useState<any>(null);
  const [matchesData, setMatchesData] = useState<Match[] | null>(null);
  const [characterMap, setCharacterMap] = useState<Map<string, CharacterData>>(new Map());
  const [mapMap, setMapMap] = useState<Map<string, MapData>>(new Map());
  
  const [matchHistory, setMatchHistory] = useState<any[]>([]);
  const [chartFilter, setChartFilter] = useState('Competitive');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!region || !name || !tag) return;
      setLoading(true);
      setError(null);
      setMatchHistory([]);
      
      try {
        const [accountRes, mmrRes, matchesRes, contentRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/player/${name}/${tag}`),
          axios.get(`${API_BASE_URL}/mmr/${region}/${name}/${tag}`),
          axios.get(`${API_BASE_URL}/matches/${region}/${name}/${tag}`),
          axios.get(`${API_BASE_URL}/content`),
        ]);

        let charactersList = contentRes.data.data?.characters || [];
        const mapsList = contentRes.data.data?.maps || [];

        const SOVA_BAD_ID = 'ded3520f-4264-bfed-162d-b080e2abccf9';
        const SOVA_CORRECT_ID = '320b2a48-4d9b-a075-30f1-1f93a9b638fa';

        // ATUALIZAÇÃO DO ID DO SOVA QUE ESTÁ VINDO QUEBRADO DA API
        charactersList = charactersList.map((char: CharacterV1) => {
          if (char.id === SOVA_BAD_ID) {
            return { ...char, id: SOVA_CORRECT_ID };
          }
          return char;
        });

        const characters = new Map<string, CharacterData>(
          charactersList.map((char: CharacterV1) => [ char.name.toLowerCase(), { iconUrl: `https://media.valorant-api.com/agents/${char.id}/displayicon.png` } ])
        );

        const maps = new Map<string, MapData>(
          mapsList.map((map: MapInfoV1) => [ map.name, { imageUrl: `https://media.valorant-api.com/maps/${map.id}/listviewicon.png` } ])
        );
        
        setCharacterMap(characters);
        setMapMap(maps);
        setPlayerData(accountRes.data.data);
        setMmrData(mmrRes.data.data);
        setMatchesData(matchesRes.data.data);

        const puuid = accountRes.data.data.puuid;
        if (puuid) {
          const platform = 'pc';
          const performanceRes = await axios.get(`${API_BASE_URL}/matches/by-puuid/${region}/${platform}/${puuid}`);
          setMatchHistory(performanceRes.data.data || []);
        }
      } catch (err: any) {
        console.error("ERRO CAPTURADO:", err);
        setError('Erro ao processar os dados. Verifique o console para detalhes.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [region, name, tag]);

  const performanceData = useMemo(() => {
    if (matchHistory.length === 0) return null;

    const filteredMatches = matchHistory.filter((match: any) => 
      match.metadata?.queue?.name?.toLowerCase() === chartFilter.toLowerCase()
    );

    if (filteredMatches.length === 0) return null;

    const labels: string[] = [];
    const dataPoints: number[] = [];
    
    filteredMatches.reverse().forEach((match, index) => {
      const playerList = match.players || [];
      const puuid = playerData?.puuid;
      const playerInMatch = playerList.find((p: any) => p.puuid === puuid);
      
      const teamData = match.teams?.[0];
      const roundsPlayed = teamData ? teamData.rounds.won + teamData.rounds.lost : 0;

      if (playerInMatch?.stats?.score && roundsPlayed > 0) {
        const actualAcs = Math.round(playerInMatch.stats.score / roundsPlayed);
        labels.push(`${match.metadata.map.name} #${index + 1}`);
        dataPoints.push(actualAcs);
      }
    });

    if (labels.length === 0) return null;

    const maxValue = Math.max(...dataPoints);
    const pointBackgroundColors = dataPoints.map(dp => dp === maxValue ? '#ffd700' : '#e94560');
    
    return {
      labels,
      datasets: [{
        label: 'ACS por Partida',
        data: dataPoints,
        borderColor: 'rgb(233, 69, 96)',
        backgroundColor: 'rgba(233, 69, 96, 0.5)',
        pointBackgroundColor: pointBackgroundColors,
        pointRadius: 5,
        pointHoverRadius: 8,
      }]
    };
  }, [matchHistory, chartFilter, playerData]);

  const filterModes = ['Competitive', 'Unrated', 'Deathmatch', 'Spike Rush'];

  return (
    <Container style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#e94560', display: 'block', marginBottom: '2rem' }}>
        &larr; Nova Busca
      </Link>
      
      {loading && <h2>Carregando...</h2>}
      {error && <h2 className="error">Erro: {error}</h2>}
      
      {!loading && !error && (
        <>
          <ResultsGrid>
            {playerData && <PlayerProfile data={playerData} />}
            {mmrData && <PlayerMMR data={mmrData} />}
            {matchesData && name && tag && (
              <PlayerMatches 
                data={matchesData} 
                playerName={name} 
                playerTag={tag}
                characterMap={characterMap}
                mapMap={mapMap}
              />
            )}
          </ResultsGrid>
          
          <ChartSection>
            <ChartHeader>
              <h3>Desempenho por Modo de Jogo</h3>
              <FilterContainer>
                {filterModes.map(mode => (
                  <FilterButton 
                    key={mode} 
                    isActive={chartFilter === mode} 
                    onClick={() => setChartFilter(mode)}
                  >
                    {mode}
                  </FilterButton>
                ))}
              </FilterContainer>
            </ChartHeader>
            
            {performanceData ? (
              <PerformanceChart chartData={performanceData} />
            ) : (
              <p style={{ textAlign: 'center', opacity: 0.7 }}>
                Não foram encontradas partidas no modo "{chartFilter}" para gerar o gráfico.
              </p>
            )}
          </ChartSection>
        </>
      )}
    </Container>
  );
}

export default PlayerPage;