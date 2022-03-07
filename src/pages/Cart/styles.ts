import styled from 'styled-components';

export const CartContainer = styled('div')`
  max-width: 80%;
  height: 100vh;
  margin: 0 auto;

  @media screen and (max-width: 600px) {
    max-width: 100%;

  }
`;

export const ButtonFinishContainer = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 1.75rem;
`;
