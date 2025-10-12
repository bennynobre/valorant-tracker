import { useMemo } from 'react';
import {
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  CloseButton,
  TeamsContainer,
  TeamTable,
  PlayerRow,
  RankNumber,
  AgentIcon,
  PlayerNameContainer,
  PlayerName,
  PlayerKDA,
  Badge,
} from '../styles/MatchDetailModal.styles';
import AgentTips from './AgentTips';

interface PlayerStats {
  name: string;
  tag: string;
  team: 'Red' | 'Blue';
  character: string;
  stats?: { 
    kills: number;
    deaths: number;
    assists: number;
  };
}

interface Match {
  metadata: { map: string; mode: string; }; 
  players: { all_players: PlayerStats[]; };
  teams: { red: { has_won: boolean | null; }; blue: { has_won: boolean | null; }; };
}

interface CharacterData { iconUrl: string; }

interface MatchDetailModalProps {
  match: Match;
  agentMap: Map<string, CharacterData>;
  onClose: () => void;
  playerName: string;
  playerTag: string;
}

const MatchDetailModal: React.FC<MatchDetailModalProps> = ({ match, agentMap, onClose, playerName, playerTag }) => {

  const { rankedPlayers, mvp, topLoser, ourPlayer } = useMemo(() => {
    if (!match?.players?.all_players || match.players.all_players.length === 0) {
      return { rankedPlayers: [], mvp: null, topLoser: null, ourPlayer: null };
    }

    const ranked = [...match.players.all_players].sort((a, b) => {
      const killsA = a.stats?.kills ?? 0;
      const killsB = b.stats?.kills ?? 0;
      const deathsA = a.stats?.deaths ?? 0;
      const deathsB = b.stats?.deaths ?? 0;
      const assistsA = a.stats?.assists ?? 0;
      const assistsB = b.stats?.assists ?? 0;

      if (killsA !== killsB) return killsB - killsA;
      if (deathsA !== deathsB) return deathsA - deathsB;
      return assistsB - assistsA;
    });

    const mvp = ranked[0];
    const losingTeamName = match.teams.red?.has_won === false ? 'Red' : match.teams.blue?.has_won === false ? 'Blue' : null;
    const topLoser = losingTeamName ? ranked.find(player => player.team === losingTeamName) : null;
    const ourPlayer = match.players.all_players.find(p => p.name.toLowerCase() === playerName.toLowerCase() && p.tag.toLowerCase() === playerTag.toLowerCase());

    return { rankedPlayers: ranked, mvp, topLoser, ourPlayer };
  }, [match, playerName, playerTag]);

  const renderPlayerList = (players: PlayerStats[], title: string) => {
    if (players.length === 0) return null;

    return (
      <TeamTable>
        <h4>{title}</h4>
        {players.map(player => {
          const agentIconUrl = agentMap.get(player.character)?.iconUrl;
          const isMvp = player.name === mvp?.name && player.tag === mvp?.tag;
          const isTopLoser = player.name === topLoser?.name && player.tag === topLoser?.tag;
          const overallRank = rankedPlayers.findIndex(p => p.name === player.name && p.tag === player.tag) + 1;
          
          const kills = player.stats?.kills ?? 0;
          const deaths = player.stats?.deaths ?? 0;
          const assists = player.stats?.assists ?? 0;

          return (
            <PlayerRow key={`${player.name}-${player.tag}`}>
              <RankNumber>{overallRank}º</RankNumber>
              <AgentIcon src={agentIconUrl} alt={player.character} />
              <PlayerNameContainer>
                <PlayerName>{player.name} #{player.tag}</PlayerName>
                {isMvp && <Badge className="mvp">MVP 👑</Badge>}
                {isTopLoser && !isMvp && <Badge className="top-loser">ACE 🏅</Badge>}
              </PlayerNameContainer>
              <PlayerKDA>{kills}/{deaths}/{assists}</PlayerKDA>
            </PlayerRow>
          );
        })}
      </TeamTable>
    );
  };

  const isTeamMode = match.metadata.mode.toLowerCase() !== 'deathmatch';

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>Placar da Partida - {match.metadata.map} ({match.metadata.mode})</h3>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        {isTeamMode ? (
          <TeamsContainer>
            {renderPlayerList(rankedPlayers.filter(p => p.team === 'Blue'), 'Time Azul')}
            {renderPlayerList(rankedPlayers.filter(p => p.team === 'Red'), 'Time Vermelho')}
          </TeamsContainer>
        ) : (
          <div style={{ padding: '2rem 2.5rem' }}>
            {renderPlayerList(rankedPlayers, 'Placar Geral')}
          </div>
        )}

        {ourPlayer?.character && <AgentTips agentName={ourPlayer.character} />}
      </ModalContent>
    </ModalBackdrop>
  );
};

export default MatchDetailModal;