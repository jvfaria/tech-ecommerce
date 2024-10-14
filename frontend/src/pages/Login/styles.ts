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

export const FormWrapper = styled('form')`
  width: 70%;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const ErrorInputMessage = styled.span`
  font-size: '1rem';
  color: '#b00020';
  font-weight: 300;
`;

export const ErrorContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.8rem;
  color: #b00020;
  font-weight: 400;
  margin-top: 3px;
`;
