import styled from 'styled-components';
import {
  Grid, GridProps, styled as materialStyled, Typography,
} from '@mui/material';

export const LandingImageWrapper = styled.div`
  max-width: 100% !important;
  height: 100%;
  display: block;
`;

export const MediaCaption = materialStyled(Typography)(() => ({
  textOverflow: 'ellipsis',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  position: 'absolute',
  bottom: 34,
  padding: '15px',
  color: '#fff',
  width: '100%',
  height: '6.5rem',
  fontSize: '21px',
  fontWeight: 400,
  transition: '.3s',
  cursor: 'pointer',

}));

export const MediaGrid = materialStyled(Grid)<GridProps>(() => ({
  paddingRight: '2rem',
  height: '520px',
  bgcolor: 'transparent',

  '@media (min-width: 780px)': {
    height: '60%',
  },
}));

export const PriceSpan = styled('span')`
  font-weight: 600;
  color: #FF8E3D;
  font-size: 1.5rem;
`;
