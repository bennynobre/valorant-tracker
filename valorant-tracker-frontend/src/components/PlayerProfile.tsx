import React from 'react';

import {
  ProfileCard,
  PlayerCardImage,
  ProfileInfo,
} from '../styles/PlayerProfile.styles'

interface PlayerProfileProps {
  data: {
    name: string;
    tag: string;
    card: string;
    account_level: number;
  };
}

const PlayerProfile: React.FC<PlayerProfileProps> = ({ data }) => {
  const cardUrl = data.card ? `https://media.valorant-api.com/playercards/${data.card}/wideart.png` : '';
  return (
   <ProfileCard>
      <PlayerCardImage src={cardUrl} alt="Player Card" />
      <ProfileInfo>
        <h2>{data.name} <span>#{data.tag}</span></h2>
        <p>Nível da conta: {data.account_level}</p>
      </ProfileInfo>
    </ProfileCard>
  );
};

export default PlayerProfile;