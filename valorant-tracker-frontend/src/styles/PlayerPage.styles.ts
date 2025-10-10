import styled from 'styled-components';

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  & > :first-child {
    grid-column: 1 / -1;
  }
`;