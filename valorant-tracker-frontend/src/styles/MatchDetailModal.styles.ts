import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContent = styled.div`
  background-color: #1a1a2e;
  border: 1px solid #4a4a68;
  border-radius: 12px;
  width: 95%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideIn} 0.4s ease-out;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #4a4a68;
  position: sticky;
  top: 0;
  background-color: #1a1a2e;
  
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #e0e0e0;
  font-size: 2rem;
  cursor: pointer;
`;

export const TeamsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  padding: 1.5rem 2.5rem;
`;

export const TeamTable = styled.div`
  h4 {
    margin-top: 0;
    color: #e94560;
    font-size: 1.2rem;
  }
`;

export const RankNumber = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  color: #e94560;
  width: 30px;
  text-align: center;
`;

interface PlayerRowProps {
  teamColor? : 'Red' | 'Blue';
}

export const PlayerRow = styled.div<PlayerRowProps>`
  display: grid;
  grid-template-columns: 30px 40px 1fr repeat(5, 65px) 90px;
  gap: 1.5rem;
  align-items: center;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid #2a2a48;
  transition: background-color 0.3s ease;

  background: ${props =>
    props.teamColor === 'Blue'
      ? 'linear-gradient(to right, rgba(88, 145, 255, 0.15), transparent 70%)'
      : props.teamColor === 'Red'
      ? 'linear-gradient(to right, rgba(255, 70, 86, 0.15), transparent 70%)'
      : 'transparent'
  };
`;

export const TableHeader = styled(PlayerRow)`
  font-size: 0.7rem;
  font-weight: bold;
  opacity: 0.6;
  border-bottom: 2px solid #4a4a68;
  padding-bottom: 0.75rem;

  & > span {
    text-align: center;
  }
`;

export const MainRow = styled.div`
  display: grid;
  grid-template-columns: 30px auto 1fr auto;
  gap: 1.5rem;
  align-items: center;
  width: 100%;
`;

export const AdvancedStats = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 0.75rem 0 0.25rem 45px;
  font-size: 0.8rem;
  text-align: center;
`;

export const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;

  small {
    font-size: 0.7rem;
    font-weight: normal;
    opacity: 0.7;
    margin-top: 2px;
  }
`;

export const AgentIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const PlayerName = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

export const PlayerKDA = styled.span`
  font-family: monospace;
  font-size: 1rem;
  text-align: right;
`;

export const Badge = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 0.5rem;
  color: #fff;

  &.mvp {
    background-color: #ffd700;
    color: #333;
  }

  &.top-loser {
    background-color: #c0c0c0;
    color: #333;
  }
`;

export const PlayerNameContainer = styled.div`
  display: flex;
  align-items: center;
`;