import styled from 'styled-components';

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  & > :first-child {
    grid-column: 1 / -1;
  }
`;

export const ChartSection = styled.div`
  background-color: #16213e;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #4a4a68;
  margin-top: 2rem;
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h3 {
    margin: 0;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const FilterButton = styled.button<{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #4a4a68;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  background-color: ${props => props.isActive ? '#e94560' : 'transparent'};
  color: ${props => props.isActive ? '#fff' : '#e0e0e0'};

  &:hover {
    background-color: ${props => props.isActive ? '#f76a82' : 'rgba(255, 255, 255, 0.1)'};
  }
`;