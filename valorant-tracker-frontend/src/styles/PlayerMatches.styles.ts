import styled from 'styled-components';

interface MatchCardProps {
  mapImageUrl?: string;
}

export const MatchCard = styled.div<MatchCardProps>`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  background-color: #16213e;
  background-image: linear-gradient(rgba(22, 33, 62, 0.85), rgba(22, 33, 62, 0.85)), url(${props => props.mapImageUrl});
  background-size: cover;
  background-position: center;
  border-left: 5px solid;
  margin-bottom: 1rem;

  &.win { border-left-color: #4CAF50; }
  &.loss { border-left-color: #F44336; }
  &.draw { border-left-color: #9E9E9E; }
`;

export const AgentIcon = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 1.5rem;
  border: 2px solid #fff;
`;

export const MatchInfo = styled.div`
  flex-grow: 1;
  
  h4 {
    margin: 0 0 0.25rem 0;
    font-size: 1.2rem;
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

export const MatchKDA = styled.div`
  text-align: right;
  font-size: 1.1rem;
  font-weight: bold;
  
  span {
    font-size: 0.8rem;
    opacity: 0.7;
    display: block;
  }
`;

export const MatchesContainer = styled.div`
  background-color: transparent; // Remove o fundo do card antigo
`;