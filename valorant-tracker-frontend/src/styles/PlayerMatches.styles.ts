import styled, { css, keyframes } from 'styled-components';

const sheenEffect = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 10px rgba(255, 215, 0, 0.3); }
  50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.7); }
  100% { box-shadow: 0 0 10px rgba(255, 215, 0, 0.3); }
`;


interface AcsScoreProps {
  colorScheme: 'mvp' | 'win' | 'loss' | 'draw' | 'hardcarry';
}

interface MatchCardProps {
  mapImageUrl?: string;
  isMvp?: boolean;
  isHardCarry?: boolean;
}

export const AcsScore = styled.div<AcsScoreProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 8px;
  width: 90px;
  
  background-color: ${props => {
    if (props.colorScheme === 'mvp') return '#ffd700';
    if (props.colorScheme === 'win') return 'rgba(76, 175, 80, 0.4)';
    if (props.colorScheme === 'loss') return 'rgba(244, 67, 54, 0.4)';
    return 'rgba(110, 110, 110, 0.3)';
  }};
  div {
    font-size: 0.9rem;
    font-weight: bold;
    color: ${props => props.colorScheme === 'mvp' ? '#333' : '#fff'};
  }
  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${props => props.colorScheme === 'mvp' ? '#333' : '#fff'};
  }
`;

export const MatchCard = styled.div<MatchCardProps>`
  display: grid;
  grid-template-columns: 80px 1fr 90px 100px;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #2a2a48;
  margin-bottom: 1rem;
  transition: all 0.2s ease-in-out;
  position: relative; 
  overflow: hidden; 
  z-index: 1;

  background-color: #1a1a2e;
  background-image: linear-gradient(rgba(26, 26, 46, 0.85), rgba(26, 26, 46, 0.85)), url(${props => props.mapImageUrl});
  background-size: cover;
  background-position: center;

  &:hover {
    transform: translateY(-3px);
    border-color: #e94560;
  }

  &.win { border-left: 5px solid #4CAF50; }
  &.loss { border-left: 5px solid #F44336; }
  &.draw { border-left: 5px solid #9E9E9E; }

  ${props => props.isMvp && !props.isHardCarry && css`
    border-color: #ffd700;
    background-image:
      linear-gradient(
        110deg,
        transparent 40%,
        rgba(255, 255, 255, 0.15) 50%,
        transparent 60%
      ),
      linear-gradient(rgba(26, 26, 46, 0.85), rgba(26, 26, 46, 0.85)),
      url(${props.mapImageUrl});

    background-size: 300% 100%, cover, cover;
    animation: ${sheenEffect} 5s infinite linear, ${pulseGlow} 3s infinite ease-in-out;
  `}
  ${props => props.isHardCarry && css`
    border-color: #da3dff; 
    background-image: linear-gradient(90deg, rgb(23, 37, 74) 0%, rgb(34, 67, 102) 23%, rgb(64, 44, 141) 42%, rgb(127, 59, 151) 55%, rgb(175, 99, 70) 81%, rgb(137, 26, 57) 100%);
    animation: none; 
  `}
`;

export const AgentIcon = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: rgba(0,0,0,0.3);
`;

export const MatchInfo = styled.div`
  h4 {
    margin: 0 0 0.25rem 0;
    font-size: 1.2rem;
    color: #fff;
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
    font-weight: normal;
  }
`;

export const MatchesContainer = styled.div`
  background-color: transparent;
  border: none;
  padding: 0;
  & > h2 {
    margin-top: 0;
  }
`;