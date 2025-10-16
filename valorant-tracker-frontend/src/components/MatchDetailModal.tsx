import { useMemo } from 'react';
import {
  ModalBackdrop, ModalContent, ModalHeader, CloseButton, TeamsContainer, TeamTable,
  PlayerRow, TableHeader, StatBox, RankNumber, AgentIcon, PlayerNameContainer,
  PlayerName, PlayerKDA, Badge
} from '../styles/MatchDetailModal.styles';
import AgentTips from './AgentTips';
import type { Match, PlayerStats, CharacterData } from '../types/valorant';

interface MatchDetailModalProps {
  match: Match;
  characterMap: Map<string, CharacterData>;
  onClose: () => void;
  playerName: string;
  playerTag: string;
}

const MatchDetailModal: React.FC<MatchDetailModalProps> = ({ match, characterMap, onClose, playerName, playerTag }) => {

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
        <TableHeader>
          <span style={{ gridColumn: '2 / span 2' }}>JOGADOR</span>
          <span>ACS</span>
          <span>K/D</span>
          <span>ADR</span>
          <span>HS%</span>
          <span>DDΔ</span>
          <span style={{ textAlign: 'right' }}>KDA</span>
        </TableHeader>

        {players.map(player => {
          if (!player.stats) return null;

          const { kills, deaths, assists, score, headshots, bodyshots, legshots } = player.stats;
          const roundsPlayed = match.metadata.rounds_played;

          const actualAcs = roundsPlayed > 0 ? Math.round(score / roundsPlayed) : 0;
          const kd = deaths === 0 ? kills.toFixed(2) : (kills / deaths).toFixed(2);
          const adr = roundsPlayed > 0 ? Math.round(player.damage_made / roundsPlayed) : 0;
          const totalShots = headshots + bodyshots + legshots;
          const hsPercent = totalShots > 0 ? Math.round((headshots / totalShots) * 100) : 0;
          const damageDiff = roundsPlayed > 0 ? Math.round((player.damage_made - player.damage_received) / roundsPlayed) : 0;

          const agentIconUrl = characterMap.get(player.character.toLowerCase())?.iconUrl;
          const isMvp = player.name === mvp?.name && player.tag === mvp?.tag;
          const isTopLoser = player.name === topLoser?.name && player.tag === topLoser?.tag;
          const overallRank = rankedPlayers.findIndex(p => p.name === player.name && p.tag === player.tag) + 1;

          return (
            <PlayerRow key={`${player.name}-${player.tag}`} teamColor={player.team}>
              <RankNumber>{overallRank}º</RankNumber>
              <AgentIcon src={agentIconUrl} alt={player.character} />
              <PlayerNameContainer>
                <PlayerName>{player.name} #{player.tag}</PlayerName>
                {isMvp && <Badge className="mvp">MVP 👑</Badge>}
                {isTopLoser && !isMvp && <Badge className="top-loser">ACE 🏅</Badge>}
              </PlayerNameContainer>

              <StatBox><span>{actualAcs}</span><small>ACS</small></StatBox>
              <StatBox><span>{kd}</span><small>K/D</small></StatBox>
              <StatBox><span>{adr}</span><small>ADR</small></StatBox>
              <StatBox><span>{hsPercent}%</span><small>HS%</small></StatBox>
              <StatBox><span>{damageDiff > 0 ? `+${damageDiff}` : damageDiff}</span><small>DMG Diff</small></StatBox>

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
          <div style={{ padding: '1.5rem 2.5rem' }}>
            {renderPlayerList(rankedPlayers, 'Placar Geral')}
          </div>
        )}

        {ourPlayer?.character && <AgentTips agentName={ourPlayer.character} />}
      </ModalContent>
    </ModalBackdrop>
  );
};

export default MatchDetailModal;