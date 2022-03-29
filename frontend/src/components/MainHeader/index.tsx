import { FavoriteBorderRounded, ShoppingCartOutlined } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import {
  Avatar,
  Grid, IconButton, Tooltip,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IState } from '../../redux/store';
import {
  CustomTab, StyledBadge,
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

  const goToNavTabIndicator = useCallback((path: string) => {
    localStorage.setItem('Selected::navbar', path);
  }, []);

  const wipeNavTabIndicator = () => {
    localStorage.setItem('Selected::navbar', '');
  };

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  return (
    <Grid
      container
      direction="row"
      spacing={3}
      alignItems="center"
    >
      <Grid item xs={12} md={3} sx={{ width: '100vw' }}>
        <img src="/assets/techecommerce.png" alt="logo" style={{ maxWidth: '287px' }} />
      </Grid>

      <Grid item xs={10} md={6}>
        <TabContext value={localStorage.getItem('Selected::navbar') || actualURLPath}>
          <TabList centered sx={{ color: '#6BD4E9' }} TabIndicatorProps={{ style: { color: '#181A18', background: '#003A4D' } }} onChange={handleChange}>
            <CustomTab label="HOME" value="home" onClick={() => handleNavigate('/home')} />
            <CustomTab label="PRODUTOS" value="products" onClick={() => handleNavigate('/products')} />
            <CustomTab label="CARRINHO" value="cart" onClick={() => handleNavigate('/cart')} />
            <CustomTab label="LOGIN" value="about" onClick={() => handleNavigate('/login')} />
          </TabList>
        </TabContext>
      </Grid>

      <Grid container item xs={2} md={3} spacing={2} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Grid item direction="row">
          <Link to="/favourites" onClick={wipeNavTabIndicator}>
            <Tooltip title="Produtos favoritos" arrow>
              <IconButton>
                <FavoriteBorderRounded sx={{ color: '#003A4D', fontSize: '1.8rem' }} />
              </IconButton>
            </Tooltip>

          </Link>

        </Grid>
        <Grid item>
          <Link to="/cart" onClick={() => goToNavTabIndicator('/cart')}>
            <StyledBadge badgeContent={storagedCounter || cartCounter} color="primary">
              <Tooltip
                title={cartCounter === 1 ? `${cartCounter} item no carrinho` : `${cartCounter} itens no carrinho`}
                arrow
              >
                <IconButton>
                  <ShoppingCartOutlined sx={{ color: '#003A4D', fontSize: '1.8rem' }} />
                </IconButton>

              </Tooltip>
            </StyledBadge>
          </Link>
        </Grid>

        <Grid item direction="row">
          <Link to="/login" onClick={() => goToNavTabIndicator('/login')}>
            <Tooltip title="Faça seu login ou cadastre-se" arrow>
              <Avatar src="/broken-image.jpg" />
            </Tooltip>
          </Link>
        </Grid>
      </Grid>
    </Grid>

  );
};

export default MainHeader;
