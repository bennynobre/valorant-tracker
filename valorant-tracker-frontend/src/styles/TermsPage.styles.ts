import styled from 'styled-components';
import { Container } from '../styles/common';

export const TermsWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
`;

export const TermsBox = styled.div`
  background-color: #16213e;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #4a4a68;
  max-width: 700px;

  h1 {
    margin-top: 0;
  }

  p {
    line-height: 1.6;
    opacity: 0.8;
  }
`;

export const AcceptButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  border: none;
  background-color: #e94560;
  color: #e0e0e0;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f76a82;
  }
`;