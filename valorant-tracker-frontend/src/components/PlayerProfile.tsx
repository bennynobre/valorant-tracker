import React from 'react';

// Define a estrutura de dados que o componente espera receber (props)
interface PlayerProfileProps {
  data: {
    name: string;
    tag: string;
    card: {
      wide: string;
    };
    account_level: number;
  };
}

// O 'FC' vem de 'FunctionComponent' do React
const PlayerProfile: React.FC<PlayerProfileProps> = ({ data }) => {
  return (
    <div className="profile-card card">
      <h2>Perfil do Jogador</h2>
      <img src={data.card.wide} alt="Player Card" className="player-card-image" />
      <h3>{data.name} #{data.tag}</h3>
      <p>Nível da conta: {data.account_level}</p>
    </div>
  );
};

export default PlayerProfile;