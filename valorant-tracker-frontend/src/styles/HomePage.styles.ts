import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeHeader = styled.header`
  background-color: #1a1a2e;
  padding: 1.5rem 0;
  width: 100%;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1600px; 
  margin: 0 auto;
  padding: 0 2rem;

  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2rem;

  h1 {
    margin: 0;
    font-size: 1.8rem;
    white-space: nowrap;
  }
`;

export const SearchForm = styled.form`
  margin: 0;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  input, select, button {
    padding: 0.8rem;
    border-radius: 8px;
    border: 1px solid #4a4a68;
    background-color: #16213e;
    color: #e0e0e0;
    font-size: 1rem;
  }

  input {
    min-width: 200px;
  }

  .tag-input {
    width: 80px;
  }

  button {
    background-color: #e94560;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover { background-color: #f76a82; }
  }

  span {
    color: #e0e0e0;
    font-weight: bold;
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
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 1.5rem;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem; 
`;

export const NavLink = styled(Link)`
  color: #e0e0e0;
  text-decoration: none;
  font-weight: bold;
  white-space: nowrap;
  transition: color 0.2s ease;

 background-color: #ff4656;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  display: inline-flex; 
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #fff;
    background-color: #f76a82; 
  }
`;

export const DateGroup = styled.div`
  margin-bottom: 3rem;
  background-color: rgba(16, 24, 46, 0.5);
  padding: 1rem 1.5rem;
  border-radius: 12px;
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const DateHeader = styled.h2<{ isLive?: boolean }>`
  font-size: 1.2rem;
  text-transform: uppercase;
  border-bottom: 2px solid #4a4a68;
  padding-bottom: 0.75rem;
  margin-bottom: 1.5rem;
  
  ${props => props.isLive && css` 
    color: #ff4656;
    border-bottom-color: #ff4656;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '●';
      font-size: 1rem;
      animation: ${pulse} 1.5s infinite;
    }
  `}
`;

export const NavAndSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;