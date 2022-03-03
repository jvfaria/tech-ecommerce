import { TabContext, TabList } from '@mui/lab';
import {
  Avatar, Grid, Tooltip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IState } from '../../redux/store';
import {
  CustomTab, StyledBadge, WhiteShoppingCartOutlinedIcon,
} from './styles';

export interface ICounterProps {
  counter: number;
}
const MainHeader: React.FC = () => {
  const cartCounter = useSelector<IState, number>(state => state.cart.counter);
  const [storagedCounter, setStoragedCounter] = useState(0);
  const [actualURLPath] = useState(useLocation().pathname);
  const navigate = useNavigate();

  useEffect(() => {
    const counterStr = localStorage.getItem('Cart-redux::counter');
    if (counterStr) {
      const parsedCounterObj: ICounterProps = JSON.parse(counterStr);
      setStoragedCounter(parsedCounterObj.counter);
    }
  }, [actualURLPath, storagedCounter]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    localStorage.setItem('Selected::navbar', newValue);
    navigate(`/${newValue}`);
  };

  const wipeNavTabIndicator = () => {
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
        <TabContext value={localStorage.getItem('Selected::navbar') || actualURLPath}>
          <TabList centered sx={{ color: '#6BD4E9' }} TabIndicatorProps={{ style: { color: '#181A18', background: '#6BD4E9' } }} onChange={handleChange}>
            <CustomTab label="HOME" value="home" />
            <CustomTab label="PRODUTOS" value="products" />
            <CustomTab label="SOBRE" value="about" />
            <CustomTab label="CARRINHO" value="cart" />
          </TabList>
        </TabContext>
      </Grid>

      <Grid item xs={2} md={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/cart" onClick={wipeNavTabIndicator}>
          <StyledBadge badgeContent={storagedCounter || cartCounter} color="primary">
            <Tooltip
              title={storagedCounter === 1 ? `${storagedCounter} item no carrinho` : `${storagedCounter} itens no carrinho`}
              arrow
            >
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
