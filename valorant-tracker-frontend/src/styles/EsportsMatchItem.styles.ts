import styled from 'styled-components';

export const MatchCard = styled.div`
  background-color: #16213e;
  border: 1px solid #4a4a68;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, border-color 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    border-color: #e94560;
  }
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

export const MatchBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

export const Team = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 80px;
  
  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
  
  span {
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

export const MatchDetails = styled.div`
  text-align: center;
  
  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #e94560;
  }
  
  p {
    margin: 0.25rem 0 0 0;
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;