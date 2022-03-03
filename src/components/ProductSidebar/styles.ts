import { Typography, TypographyProps } from '@mui/material';
import styled from 'styled-components';
import { styled as materialStyled } from '@mui/material/styles';

export const NavBarContainer = styled('div')`
  background-color: #fff;
`;

export const Subtitle = materialStyled(Typography)<TypographyProps>(() => ({
  fontSize: '1.25rem',
  borderBottom: '1px solid',
  borderColor: '#e6e6e6',
}));
