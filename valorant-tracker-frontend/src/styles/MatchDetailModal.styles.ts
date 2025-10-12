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
  width: 90%;
  max-width: 1100px;
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
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding: 2rem 2.5rem;
`;

export const TeamTable = styled.div`
  h4 {
    margin-top: 0;
    color: #e94560;
  }
`;

export const RankNumber = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  color: #e94560;
  width: 30px;
  text-align: center;
`;

export const PlayerRow = styled.div`
  display: grid;
  grid-template-columns: 30px auto 1fr auto;
  gap: 1.5rem;
  align-items: center;
  padding: 0.5rem 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid #2a2a48;
  }
`;

export const AgentIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const PlayerName = styled.span`
  font-weight: bold;
`;

export const PlayerKDA = styled.span`
  font-family: monospace;
  font-size: 0.9rem;
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