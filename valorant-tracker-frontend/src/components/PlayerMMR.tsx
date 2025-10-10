interface MMRData {
  currenttierpatched: string;
  ranking_in_tier: number;
  mmr_change_to_last_game: number;
  elo: number; 
  images: {
    large: string;
  };
}

interface PlayerMMRProps {
  data: MMRData;
}

const PlayerMMR: React.FC<PlayerMMRProps> = ({ data }) => {
  const isPositiveChange = data.mmr_change_to_last_game > 0;
  const isNegativeChange = data.mmr_change_to_last_game < 0;
  
  const rrChangeColor = isPositiveChange ? '#4CAF50' : isNegativeChange ? '#F44336' : '#9E9E9E';
  const rrChangeSign = isPositiveChange ? '+' : '';

  const isRadiant = data.currenttierpatched === 'Radiant';
  const rankPointsLabel = isRadiant ? 'Posição no Ranque' : 'Pontos no Ranque (RR)';
  const rankPointsValue = isRadiant ? `#${data.ranking_in_tier}` : data.ranking_in_tier;

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
      
      <p>ELO Total: {data.elo}</p>
      
      <p>{rankPointsLabel}: {rankPointsValue}</p>

      <p className="rr-change">
        Última Partida: <span style={{ color: rrChangeColor }}>{rrChangeSign}{data.mmr_change_to_last_game}</span>
      </p>
    </div>
  );
};

export default PlayerMMR;