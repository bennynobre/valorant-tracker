import styled, { css } from 'styled-components';

export const LiveBadge = styled.span`
  background-color: #ff4656;
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
`;

export const MatchCard = styled.div<{ isLive?: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: #16213e;
  border-radius: 8px;
  border: 1px solid #2a2a48;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    border-color: #e94560;
  }

  ${props => props.isLive && css`
    border-color: #ff4656;
    box-shadow: 0 0 15px rgba(255, 70, 86, 0.5);
  `}
`;

export const MatchHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  font-size: 0.9rem;
  font-weight: bold;
`;

export const LeagueIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const CardBody = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
`;

export const Team = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }

  span {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

export const MatchDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    font-size: 1.2rem;
    font-weight: bold;
    color: #e94560;
    text-transform: uppercase;
  }

  p {
    margin: 0.25rem 0 0 0;
    font-size: 1rem;
    opacity: 0.8;
  }
`;