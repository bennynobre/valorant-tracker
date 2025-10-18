import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PageHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
  }
`;

export const FilterSelect = styled.select`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #4a4a68;
  background-color: #16213e;
  color: #e0e0e0;
  font-size: 1rem;
`;

export const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  color: #e0e0e0;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.2s ease;

  &:hover {
    color: #e94560;
  }

  &::before {
    content: '←';
    margin-right: 0.75rem;
    font-size: 1.2rem;
    vertical-align: middle;
  }
`;