import styled from 'styled-components';
import { Container } from '../styles/common';

export const HomeHeader = styled.header`
  background-color: #1a1a2e;
  padding: 1.5rem 0;
  border-bottom: 1px solid #4a4a68;
`;

export const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
`;

export const SearchForm = styled.form`
  margin: 0;
  display: flex;
  gap: 0.5rem;
  align-items: center;

  input, select, button {
    padding: 0.8rem;
    border-radius: 8px;
    border: 1px solid #4a4a68;
    background-color: #16213e;
    color: #e0e0e0;
    font-size: 1rem;
  }

  button {
    background-color: #e94560;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover { background-color: #f76a82; }
  }
`;

export const EsportsSection = styled.section`
  padding: 3rem 0;

  h2 {
    text-align: left;
    margin-bottom: 1.5rem;
  }
`;

export const Filters = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
`;

export const MatchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
`;