import styled from 'styled-components';
import backgroundImage from '../../assets/backgrounds/infographicsHome.jpg';

export const Background = styled('div')`
  background-image: linear-gradient(to left, rgba(255,255,255,0) 20%,
              rgba(255,255,255,1)), url(${backgroundImage});
  height: 100%;
  width: 100%;
  background-size: cover;

`;
