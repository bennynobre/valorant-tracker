import styled from 'styled-components';

export const TipsWrapper = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #4a4a68;
  margin-top: 1rem;

  h5 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: #fff;
  }
`;

export const TipsList = styled.ul`
  list-style: none;
  padding-left: 1rem;
  margin: 0 0 1.5rem 0;

  li {
    padding-left: 1rem;
    position: relative;
    margin-bottom: 0.5rem;
    opacity: 0.8;
    line-height: 1.4;

    &::before {
      content: '•';
      color: #e94560;
      position: absolute;
      left: 0;
    }
  }
`;

export const CompsList = styled.div``;

export const CompItem = styled.div`
  background-color: #16213e;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  strong {
    color: #e94560;
  }
`;