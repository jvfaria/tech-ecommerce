import { TabContext, TabList } from '@mui/lab';
import {
  Avatar, Grid, Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IState } from '../../redux/store';
import {
  CustomTab, StyledBadge, WhiteShoppingCartOutlinedIcon,
} from './styles';

const MainHeader: React.FC = () => {
  const cartCounter = useSelector<IState, number>(state => state.cart.counter);
  const navigate = useNavigate();
  const [value, setValue] = useState(localStorage.getItem('Selected::navbar') || '');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    localStorage.setItem('Selected::navbar', newValue);
    navigate(`/${newValue}`);
  };

  const wipeNavTabIndicator = () => {
    setValue('cart');
    localStorage.setItem('Selected::navbar', 'cart');
  };

  return (
    <Grid
      container
      direction="row"
      spacing={3}
      alignItems="center"
    >
      <Grid item xs={12} md={3}>
        <img src="/assets/backgrounds/TechLogoBackground.png" alt="logo" style={{ maxWidth: '287px' }} />
      </Grid>

      <Grid item xs={10} md={6}>
        <TabContext value={localStorage.getItem('Selected::navbar') || ''}>
          <TabList centered sx={{ color: '#6BD4E9' }} TabIndicatorProps={{ style: { color: '#181A18', background: '#6BD4E9' } }} onChange={handleChange}>
            <CustomTab label="HOME" value="home" />
            <CustomTab label="PRODUTOS" value="products" />
            <CustomTab label="SOBRE" value="about" />
          </TabList>
        </TabContext>
      </Grid>

      <Grid item xs={2} md={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/cart" onClick={wipeNavTabIndicator}>
          <StyledBadge badgeContent={cartCounter} color="primary">
            <Tooltip title={cartCounter === 1 ? `${cartCounter} item no carrinho` : `${cartCounter} itens no carrinho`} arrow>
              <Avatar sx={{ bgcolor: '#4fa8ba' }}>
                <WhiteShoppingCartOutlinedIcon />
              </Avatar>
            </Tooltip>
          </StyledBadge>
        </Link>

      </Grid>

    </Grid>

  );
};

export default MainHeader;
