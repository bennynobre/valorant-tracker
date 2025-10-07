import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import PlayerProfile from '../components/PlayerProfile';
import PlayerMMR from '../components/PlayerMMR';
import PlayerMatches from '../components/PlayerMatches';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function PlayerPage() {
  const [searchParams] = useSearchParams();
  const region = searchParams.get('region');
  const name = searchParams.get('name');
  const tag = searchParams.get('tag');

  const [playerData, setPlayerData] = useState<any>(null);
  const [mmrData, setMmrData] = useState<any>(null); // Corrigido
  const [matchesData, setMatchesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (!region || !name || !tag) {
        setError("Parâmetros inválidos na URL.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      setPlayerData(null);
      setMmrData(null);
      setMatchesData(null);
      
      try {
        const [accountRes, mmrRes, matchesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/player/${name}/${tag}`),
          axios.get(`${API_BASE_URL}/mmr/${region}/${name}/${tag}`),
          axios.get(`${API_BASE_URL}/matches/${region}/${name}/${tag}`),
        ]);

        console.log('DADOS BRUTOS DA API:', { 
            account: accountRes.data, 
            mmr: mmrRes.data, 
            matches: matchesRes.data 
        });

        setPlayerData(accountRes.data.data);
        setMmrData(mmrRes.data.data); // Corrigido
        setMatchesData(matchesRes.data.data);
      } catch (err: any) {
        console.error("ERRO NA BUSCA:", err);
        setError(err.response?.data?.error || 'Não foi possível encontrar o jogador.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlayerData();
  }, [region, name, tag]);

  // Log crucial que mostra o estado no momento da renderização
  console.log('RENDERIZANDO COM ESTES ESTADOS:', { loading, error, playerData, mmrData, matchesData });

  return (
    <div className="container">
      <Link to="/" style={{ textDecoration: 'none', color: '#e94560', display: 'block', marginBottom: '2rem' }}>&larr; Nova Busca</Link>
      
      {loading && <h2>Carregando...</h2>}
      
      {error && <h2 className="error">Erro: {error}</h2>}
      
      {!loading && !error && (
        <div className="results">
          {playerData && <PlayerProfile data={playerData} />}
          {/* AQUI ESTAVA O SEGUNDO ERRO */}
          {mmrData && <PlayerMMR data={mmrData} />}
          {matchesData && name && tag && (
            <PlayerMatches 
              data={matchesData} 
              playerName={name} 
              playerTag={tag} 
            />
          )}
        </div>
      )}
    </div>
  );
}

export default PlayerPage;