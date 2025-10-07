// 1. Interfaces atualizadas para a estrutura 100% correta da API
interface PlayerStats {
  character: string;
  stats: { kills: number; deaths: number; assists: number };
  team: 'Red' | 'Blue';
  name: string;
  tag: string;
}

interface Match {
  metadata: {
    matchid: string;
    map: string;
    mode: string;
  };
  players: {
    all_players: PlayerStats[];
  };
  teams: {
    red: { has_won: boolean | null; rounds_won: number; };
    blue: { has_won: boolean | null; rounds_won: number; };
  };
}

// 2. Props atualizadas para receber playerName e playerTag
interface PlayerMatchesProps {
  data: Match[];
  playerName: string;
  playerTag: string;
}

const PlayerMatches: React.FC<PlayerMatchesProps> = ({ data, playerName, playerTag }) => {

  return (
    <div className="matches-card card">
      <h2>Últimas Partidas</h2>
      <ul className="match-list">
        {data.slice(0, 5).map((match) => {
          // 3. Encontra o nosso jogador na lista de todos os jogadores da partida
          const ourPlayer = match.players.all_players.find(
            (p) => p.name.toLowerCase() === playerName.toLowerCase() && p.tag.toLowerCase() === playerTag.toLowerCase()
          );

          // Se o jogador não for encontrado por algum motivo, pula esta partida
          if (!ourPlayer) {
            return null;
          }

          // 4. Lógica inteligente para Vitória/Derrota ou modo de jogo
          const playerTeam = ourPlayer.team.toLowerCase() as 'red' | 'blue';
          const hasWon = match.teams[playerTeam]?.has_won;

          let resultText = match.metadata.mode;
          let matchResultClass = 'draw'; // Classe padrão para modos como Deathmatch

          if (hasWon === true) {
            resultText = 'Vitória';
            matchResultClass = 'win';
          } else if (hasWon === false) {
            resultText = 'Derrota';
            matchResultClass = 'loss';
          }

          return (
            <li key={match.metadata.matchid} className={`match-item ${matchResultClass}`}>
              <div className="match-info">
                <h4>{match.metadata.map}</h4>
                <p>
                  {resultText} | {match.teams.blue.rounds_won} - {match.teams.red.rounds_won}
                </p>
              </div>
              <div className="match-agent">
                {/*  */}
                <span>{ourPlayer.character}</span>
              </div>
              <div className="match-kda">
                <span>KDA</span>
                <p>{ourPlayer.stats.kills} / {ourPlayer.stats.deaths} / {ourPlayer.stats.assists}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlayerMatches;