// 1. Interface atualizada para corresponder à resposta real da API
interface MMRData {
  currenttierpatched: string;
  ranking_in_tier: number;
  mmr_change_to_last_game: number;
  elo: number; // Adicionamos o ELO
  images: {
    large: string;
  };
}

// 2. Props do componente (não muda)
interface PlayerMMRProps {
  data: MMRData;
}

// 3. Componente atualizado com a nova lógica
const PlayerMMR: React.FC<PlayerMMRProps> = ({ data }) => {
  // Lógica para cor e sinal da última partida
  const isPositiveChange = data.mmr_change_to_last_game > 0;
  const isNegativeChange = data.mmr_change_to_last_game < 0;
  
  const rrChangeColor = isPositiveChange ? '#4CAF50' : isNegativeChange ? '#F44336' : '#9E9E9E';
  const rrChangeSign = isPositiveChange ? '+' : '';

  // Verifica se o ranque é Radiante para ajustar o texto
  const isRadiant = data.currenttierpatched === 'Radiant';
  const rankPointsLabel = isRadiant ? 'Posição no Ranque' : 'Pontos no Ranque (RR)';
  const rankPointsValue = isRadiant ? `#${data.ranking_in_tier}` : data.ranking_in_tier;

  // Se não houver dados de rank, não renderiza nada
  if (!data.currenttierpatched) {
    return (
      <div className="mmr-card card">
        <h2>MMR</h2>
        <p>Sem dados de ranque para a temporada atual.</p>
      </div>
    );
  }

  return (
    <div className="mmr-card card">
      <h2>Ranque Atual</h2>
      <img src={data.images.large} alt={data.currenttierpatched} className="rank-image" />
      <h3>{data.currenttierpatched}</h3>
      
      {/* Exibe o ELO total, que é uma informação legal */}
      <p>ELO Total: {data.elo}</p>
      
      {/* Exibe a Posição no Ranque (para Radiante) ou os Pontos (para outros) */}
      <p>{rankPointsLabel}: {rankPointsValue}</p>

      <p className="rr-change">
        {/* Para Radiante, a mudança é em ELO, não em RR, mas vamos manter o texto por simplicidade */}
        Última Partida: <span style={{ color: rrChangeColor }}>{rrChangeSign}{data.mmr_change_to_last_game}</span>
      </p>
    </div>
  );
};

export default PlayerMMR;