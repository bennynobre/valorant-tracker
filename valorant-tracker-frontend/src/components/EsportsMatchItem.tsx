import type React from "react";

import {
  MatchCard,
  MatchHeader,
  LeagueIcon,
  CardBody,
  Team,
  MatchDetails,
} from '../styles/EsportsMatchItem.styles';

interface EsportsMatch {
    date: string;
    state: 'unstarted' | 'in_progress' | 'completed';
    league: {
        name: string;
        icon: string;
    };
    match: {
        teams: Array<{
            name: string;
            code: string;
            icon: string;
            score?: number;
        }>;
    };
}

interface EsportsMatchItemProps {
    match: EsportsMatch;
    isLive?: boolean;
}

const EsportsMatchItem: React.FC<EsportsMatchItemProps> = ({ match }) => {
    const [ teamA, teamB ] = match.match.teams;

    const matchDate = new Date(match.date).toLocaleString('pt-BR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
       <MatchCard>
      <MatchHeader>
        <LeagueIcon src={match.league.icon} alt={match.league.name} />
        <span>{match.league.name}</span>
      </MatchHeader>
      <CardBody>
        <Team>
          <img src={teamA.icon} alt={teamA.name} />
          <span>{teamA.code}</span>
        </Team>
        <MatchDetails>
          <span>vs</span>
          <p>{matchDate}</p>
        </MatchDetails>
        <Team>
          <img src={teamB.icon} alt={teamB.name} />
          <span>{teamB.code}</span>
        </Team>
      </CardBody>
    </MatchCard>
    );
};

export default EsportsMatchItem;