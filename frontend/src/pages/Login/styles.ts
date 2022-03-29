import styled from 'styled-components';

export const LoginContainer = styled('div')`
  max-width: 80%;
  height: 100vh;
  margin: 0 auto;
  margin-top: 4rem;
  background-color: rgba(255, 255, 255, .15);
  backdrop-filter: blur(5px);
  @media screen and (max-width: 600px) {
    max-width: 100%;

  }
`;
