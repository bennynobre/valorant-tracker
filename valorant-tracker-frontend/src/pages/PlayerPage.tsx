import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container } from '../styles/common';
import { ResultsGrid } from '../styles/PlayerPage.styles';
import PlayerProfile from '../components/PlayerProfile';
import PlayerMMR from '../components/PlayerMMR';
import PlayerMatches from '../components/PlayerMatches';

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
  const [matchesData, setMatchesData] = useState<any>(null);
  const [characterMap, setCharacterMap] = useState<Map<string, CharacterData>>(new Map());
  const [mapMap, setMapMap] = useState<Map<string, MapData>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!region || !name || !tag) return;
      setLoading(true);
      setError(null);
      
      try {
        const [accountRes, mmrRes, matchesRes, contentRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/player/${name}/${tag}`),
          axios.get(`${API_BASE_URL}/mmr/${region}/${name}/${tag}`),
          axios.get(`${API_BASE_URL}/matches/${region}/${name}/${tag}`),
          axios.get(`${API_BASE_URL}/content`),
        ]);

        // --- CORREÇÃO FINAL AQUI: Adicionando o .data que faltava ---
        const characters = new Map<string, CharacterData>(
          contentRes.data.data.characters.map((char: CharacterV1) => [
            char.name,
            { iconUrl: `https://media.valorant-api.com/agents/${char.id}/displayicon.png` }
          ])
        );
        const maps = new Map<string, MapData>(
          contentRes.data.data.maps.map((map: MapInfoV1) => [
            map.name,
            { imageUrl: `https://media.valorant-api.com/maps/${map.id}/listviewicon.png` }
          ])
        );
        
        setCharacterMap(characters);
        setMapMap(maps);

        setPlayerData(accountRes.data.data);
        setMmrData(mmrRes.data.data);
        setMatchesData(matchesRes.data.data);
      } catch (err: any) {
        console.error("ERRO CAPTURADO:", err);
        setError('Erro ao processar os dados. Verifique o console para detalhes.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [region, name, tag]);

  return (
    <Container style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#e94560', display: 'block', marginBottom: '2rem' }}>
        &larr; Nova Busca
      </Link>
      
      {loading && <h2>Carregando...</h2>}
      {error && <h2 className="error">Erro: {error}</h2>}
      
      {!loading && !error && (
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
      )}
    </Container>
  );
}

export default PlayerPage;