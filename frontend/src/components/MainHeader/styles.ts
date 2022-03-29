import {
  Badge, BadgeProps, Tab, TabProps,
} from '@mui/material';
import styled from 'styled-components';
import { styled as materialStyled } from '@mui/material/styles';

export const CustomTab = styled(Tab)`
  && {
    color: #181A18;
  }

  &.css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: #142A2E;
  }
`;

export const CustomTabCart = materialStyled(Tab)<TabProps>(() => ({
  color: '#fff',
  minWidth: '3%',
  borderRadius: '50%',
  backgroundColor: '#121744',

}));

export const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: 7,
    top: 13,
    border: '2px solid white',
    padding: '0 4px',
    backgroundColor: '#FF8E3D',
  },
}));
