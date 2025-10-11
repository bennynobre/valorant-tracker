import {
  MatchesContainer,
  MatchCard,
  AgentIcon,
  MatchInfo,
  MatchKDA,
} from '../styles/PlayerMatches.styles';

interface CharacterData { iconUrl: string; }
interface MapData { imageUrl: string; }

interface PlayerStats {
  name: string;
  tag: string;
  team: 'Red' | 'Blue';
  character: string;
  stats: { kills: number; deaths: number; assists: number; };
}

interface Match {
  metadata: { matchid: string; map: string; mode: string; };
  players: { all_players: PlayerStats[]; };
  teams: {
    red: { has_won: boolean | null; rounds_won: number };
    blue: { has_won: boolean | null; rounds_won: number };
  };
}

interface PlayerMatchesProps {
  data: Match[];
  playerName: string;
  playerTag: string;
  characterMap: Map<string, CharacterData>;
  mapMap: Map<string, MapData>;
}

const PlayerMatches: React.FC<PlayerMatchesProps> = ({ data, playerName, playerTag, characterMap, mapMap }) => {
  return (
    <MatchesContainer className="card">
      <h2>Últimas Partidas</h2>
      <div>
        {data.slice(0, 5).map((match) => {
          const ourPlayer = match.players.all_players.find(
            (p) => p.name.toLowerCase() === playerName.toLowerCase() && p.tag.toLowerCase() === playerTag.toLowerCase()
          );
          if (!ourPlayer) return null;

          const playerTeam = ourPlayer.team.toLowerCase() as 'red' | 'blue';
          const hasWon = match.teams[playerTeam]?.has_won;
          let matchResultClass = 'draw';
          if (hasWon === true) matchResultClass = 'win';
          if (hasWon === false) matchResultClass = 'loss';

          const agentIconUrl = characterMap.get(ourPlayer.character)?.iconUrl;
          const mapImageUrl = mapMap.get(match.metadata.map)?.imageUrl;

          return (
            <MatchCard key={match.metadata.matchid} className={matchResultClass} mapImageUrl={mapImageUrl}>
              {agentIconUrl && <AgentIcon src={agentIconUrl} alt={ourPlayer.character} />}
              <MatchInfo>
                <h4>{match.metadata.map}</h4>
                <p>{match.metadata.mode}</p>
              </MatchInfo>
              <MatchKDA>
                <span>KDA</span>
                {ourPlayer.stats.kills} / {ourPlayer.stats.deaths} / {ourPlayer.stats.assists}
              </MatchKDA>
            </MatchCard>
          );
        })}
      </div>
    </MatchesContainer>
  );
};

export default PlayerMatches;