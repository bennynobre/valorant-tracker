import {
  CardWrapper,
  CardHeader,
  CardBody,
  Team,
  Score,
  VODLink,
  StageTag,
} from '../styles/EsportsResultCard.styles';

interface MatchResult {
  date: string;
  league: { name: string; };
  vod: string | null;
  match: {
    teams: Array<{
      name: string;
      icon: string;
      has_won: boolean;
      game_wins: number;
    }>;
  };
}

interface EsportsResultCardProps {
  match: MatchResult;
  stage?: string | null;
}

const EsportsResultCard: React.FC<EsportsResultCardProps> = ({ match, stage }) => {
  if (match.match.teams.length < 2) return null;

  const winner = match.match.teams.find(team => team.has_won === true) || match.match.teams[0];
  const loser = match.match.teams.find(team => team.has_won === false) || match.match.teams[1];

  const matchDate = new Date(match.date).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long',
  });

  return (
    <CardWrapper>
      <CardHeader>
        <div className="header-left">
          <span>{match.league.name}</span>
        </div>
        <div className="header-right">
          {stage && <StageTag stageType={stage}>{stage}</StageTag>}
          <span>{matchDate}</span>
        </div>
      </CardHeader>
      <CardBody>
        <Team isWinner={true}>
          <img src={winner.icon} alt={winner.name} />
          <span>{winner.name}</span>
        </Team>

        <Score>
          <span>{winner.game_wins}</span>
          <span>-</span>
          <span>{loser.game_wins}</span>
        </Score>

        <Team isWinner={false} style={{ flexDirection: 'row-reverse' }}>
          <img src={loser.icon} alt={loser.name} />
          <span>{loser.name}</span>
        </Team>
      </CardBody>
      {match.vod && (
        <div style={{ padding: '0 1.5rem 1.5rem', textAlign: 'center' }}>
          <VODLink href={match.vod} target="_blank" rel="noopener noreferrer">
            Assistir Partida
          </VODLink>
        </div>
      )}
    </CardWrapper>
  );
};

export default EsportsResultCard;