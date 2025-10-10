import styled from 'styled-components';

export const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: #16213e;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #4a4a68;
`;

export const PlayerCardImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 8px;
`;

export const ProfileInfo = styled.div`
  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 2.5rem;
    span {
      font-size: 2rem;
      opacity: 0.6;
    }
  }
  p {
    margin: 0;
    font-size: 1.2rem;
  }
`;