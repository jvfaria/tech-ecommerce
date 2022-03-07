import { ShoppingCartOutlined } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import {
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

  const wipeNavTabIndicator = () => {
    localStorage.setItem('Selected::navbar', 'cart');
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
      <Grid item xs={12} md={3}>
        <img src="/assets/techecommerce.png" alt="logo" style={{ maxWidth: '287px' }} />
      </Grid>

      <Grid item xs={10} md={6}>
        <TabContext value={localStorage.getItem('Selected::navbar') || actualURLPath}>
          <TabList centered sx={{ color: '#6BD4E9' }} TabIndicatorProps={{ style: { color: '#181A18', background: '#003A4D' } }} onChange={handleChange}>
            <CustomTab label="HOME" value="home" onClick={() => handleNavigate('/home')} />
            <CustomTab label="PRODUTOS" value="products" onClick={() => handleNavigate('/products')} />
            <CustomTab label="SOBRE" value="about" onClick={() => handleNavigate('/about')} />
            <CustomTab label="CARRINHO" value="cart" onClick={() => handleNavigate('/cart')} />
          </TabList>
        </TabContext>
      </Grid>

      <Grid item xs={2} md={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/cart" onClick={wipeNavTabIndicator}>
          <StyledBadge badgeContent={storagedCounter || cartCounter} color="primary">
            <Tooltip
              title={cartCounter === 1 ? `${cartCounter} item no carrinho` : `${cartCounter} itens no carrinho`}
              arrow
            >
              <IconButton>
                <ShoppingCartOutlined fontSize="large" sx={{ color: '#003A4D' }} />
              </IconButton>

            </Tooltip>
          </StyledBadge>
        </Link>

      </Grid>

    </Grid>

  );
};

export default MainHeader;
