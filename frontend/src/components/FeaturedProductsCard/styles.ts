import { Grid, GridProps, styled as materialStyled } from '@mui/material';

export const CustomGridScrollItem = materialStyled(Grid)<GridProps>(() => ({

  overflow: 'auto',
}));
