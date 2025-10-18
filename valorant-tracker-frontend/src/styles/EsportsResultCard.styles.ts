import styled from 'styled-components';

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #16213e;
  border-radius: 8px;
  border: 1px solid #2a2a48;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #e94560;
  }
`;

export const StageTag = styled.span<{ stageType: string }>`
  font-size: 0.75rem;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 5px;
  text-transform: uppercase;
  color: #fff;
  background-color: #4a4a68;

  ${props => props.stageType === 'Final' && `background-color: #ffd700; color: #333;`}
  ${props => props.stageType === 'Semi Final' && `background-color: #c0c0c0; color: #333;`}
  ${props => props.stageType === 'Playoffs' && `background-color: #e94560;`}
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  font-size: 0.8rem;
  
  .header-left {
    opacity: 0.7;
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const CardBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
`;

export const Team = styled.div<{ isWinner: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: ${props => props.isWinner ? 1 : 0.5};

  img {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }

  span {
    font-size: 1.2rem;
    font-weight: bold;
    color: ${props => props.isWinner ? '#fff' : '#aaa'};
  }
`;

export const Score = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;

  span:first-child {
    color: #4CAF50; 
  }

  span:last-child {
    color: #F44336; 
  }
`;

export const VODLink = styled.a`
  background-color: #e94560;
  color: #fff;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f76a82;
  }
`;