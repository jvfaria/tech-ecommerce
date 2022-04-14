import { FavoriteBorderRounded, ShoppingCartOutlined } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import {
  Avatar,
  Grid, IconButton, Menu, MenuItem, Tooltip,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { IAuthProps } from '../../redux/modules/Auth/types';
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
  const [avatar, setAvatar] = useState(null);
  const [actualURLPath] = useState(useLocation().pathname);
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  console.log(auth);

  useEffect(() => {
    const counterStr = localStorage.getItem('Cart-redux::counter');
    if (counterStr) {
      const parsedCounterObj: ICounterProps = JSON.parse(counterStr);
      setStoragedCounter(parsedCounterObj.counter);
    }

    const uploadedAvatar = localStorage.getItem('@TechEcommerce:avatar');

    if (uploadedAvatar) {
      const parsedAvatar = JSON.parse(uploadedAvatar);

      setAvatar(parsedAvatar.fileDownloadUri);
    }
  }, [actualURLPath, storagedCounter]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    localStorage.setItem('Selected::navbar', newValue);
    navigate(`/${newValue}`);
  };

  const goToNavTabIndicator = useCallback((path: string) => {
    localStorage.setItem('Selected::navbar', path);
  }, []);

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (user: IAuthProps) => {
    logout(user);

    navigate('/');

    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

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
        <TabContext value={localStorage.getItem('Selected::navbar') || '/home'}>

          <TabList
            centered
            sx={{ color: '#6BD4E9' }}
            TabIndicatorProps={{ style: { color: '#181A18', background: '#003A4D' } }}
            onChange={handleChange}
          >
            <CustomTab label="HOME" value="home" onClick={() => handleNavigate('/home')} />
            <CustomTab label="PRODUTOS" value="products" onClick={() => handleNavigate('/products')} />
            <CustomTab label="CARRINHO" value="cart" onClick={() => handleNavigate('/cart')} />
            <CustomTab label="CONTA" value="about" onClick={() => handleNavigate('/account-dashboard')} />
          </TabList>

        </TabContext>
      </Grid>

      <Grid container item xs={2} md={3} spacing={2} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Grid item direction="row">
          <Link to="/favourites" onClick={() => goToNavTabIndicator('/')}>
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
          {
            Object.keys(auth).length > 0 ? (
              <>
                <span style={{
                  fontWeight: 600, fontSize: '0.9rem', color: '#181A18', fontStyle: 'italic', padding: '10px',
                }}
                >
                  Olá,
                  {' '}
                  <strong style={{ color: '#003A4D' }}>{auth.user.username.toLocaleLowerCase()}</strong>
                </span>
                <IconButton
                  id="dropdown-button"
                  aria-controls={open ? 'login-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <Avatar src={avatar || '/broken-image.png'} />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/account-dashboard" onClick={() => goToNavTabIndicator('/account-dashboard')}>
                      Minha conta
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={() => handleLogout(auth)}>Sair</MenuItem>
                </Menu>
              </>

            )
              : (
                <Link to="/login" onClick={() => goToNavTabIndicator('/login')}>
                  <Tooltip title="Faça seu login ou cadastre-se" arrow>
                    <Avatar src="/broken-image.jpg" />
                  </Tooltip>
                </Link>
              )
          }
        </Grid>
      </Grid>
    </Grid>

  );
};

export default MainHeader;
