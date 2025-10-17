import { useState } from 'react';
import {
  MatchesContainer,
  MatchCard,
  AgentIcon,
  MatchInfo,
  AcsScore,
  MatchKDA,
} from '../styles/PlayerMatches.styles';
import MatchDetailModal from './MatchDetailModal';
import type { Match, CharacterData, MapData } from '../types/valorant';

interface PlayerMatchesProps {
  data: Match[];
  playerName: string;
  playerTag: string;
  characterMap: Map<string, CharacterData>;
  mapMap: Map<string, MapData>;
}

const PlayerMatches: React.FC<PlayerMatchesProps> = ({ data, playerName, playerTag, characterMap, mapMap }) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  return (
    <>
      <MatchesContainer className="card">
        <h2>Últimas Partidas</h2>
        <div>
          {data.slice(0, 5).map((match) => {
            const ourPlayer = match.players.all_players.find(
              (p) => p.name.toLowerCase() === playerName.toLowerCase() && p.tag.toLowerCase() === playerTag.toLowerCase()
            );

            if (!ourPlayer || !ourPlayer.stats) return null;

            //CÁLCULO DE RANKING E MVP
            const rankedPlayers = [...match.players.all_players].sort((a, b) => {
              const scoreA = a.stats?.score ?? 0;
              const scoreB = b.stats?.score ?? 0;
              return scoreB - scoreA;
            });

            const mvpOfThisMatch = rankedPlayers[0];
            const isMvpMatch = mvpOfThisMatch?.name === ourPlayer.name && mvpOfThisMatch?.tag === ourPlayer.tag;
            
            const overallRank = rankedPlayers.findIndex(
              p => p.name === ourPlayer.name && p.tag === ourPlayer.tag
            ) + 1;

            let actualAcs = 0;
            const roundsPlayed = match.metadata.rounds_played;
            if (roundsPlayed > 0) {
              actualAcs = Math.round(ourPlayer.stats.score / roundsPlayed);
            }

            const playerTeam = ourPlayer.team.toLowerCase() as 'red' | 'blue';
            const hasWon = match.teams[playerTeam]?.has_won;
            let matchResultClass = 'draw';
            let colorScheme: 'mvp' | 'win' | 'loss' | 'draw' = 'draw';

            if (isMvpMatch) {
              colorScheme = 'mvp';
            } else if (hasWon === true) {
              colorScheme = 'win';
            } else if (hasWon === false) {
              colorScheme = 'loss';
            }

            if (hasWon === true) matchResultClass = 'win';
            if (hasWon === false) matchResultClass = 'loss';

            const agentIconUrl = characterMap.get(ourPlayer.character.toLowerCase())?.iconUrl;
            const mapImageUrl = mapMap.get(match.metadata.map)?.imageUrl;

            return (
              <MatchCard 
                key={match.metadata.matchid} 
                className={matchResultClass} 
                mapImageUrl={mapImageUrl}
                onClick={() => setSelectedMatch(match)}
                style={{ cursor: 'pointer' }}
                isMvp={isMvpMatch}
              >
                <AgentIcon src={agentIconUrl} alt={ourPlayer.character} />
                <MatchInfo>
                  <h4>{match.metadata.map}</h4>
                  <p>{match.metadata.mode}</p>
                </MatchInfo>
                
                <AcsScore colorScheme={colorScheme}>
                  <div>{isMvpMatch ? '👑 MVP' : `${overallRank}º`}</div>
                  <span>{actualAcs}</span>
                </AcsScore>

                <MatchKDA>
                  <span>KDA</span>
                  {ourPlayer.stats.kills}/{ourPlayer.stats.deaths}/{ourPlayer.stats.assists}
                </MatchKDA>
              </MatchCard>
            );
          })}
        </div>
      </MatchesContainer>

      {selectedMatch && (
        <MatchDetailModal 
          match={selectedMatch}
          characterMap={characterMap}
          onClose={() => setSelectedMatch(null)}
          playerName={playerName}
          playerTag={playerTag}
        />
      )}
    </>
  );
};

export default PlayerMatches;