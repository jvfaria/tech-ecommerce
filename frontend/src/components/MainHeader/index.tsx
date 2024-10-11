import {
  Clear, FavoriteBorderRounded, Search, ShoppingCartOutlined,
} from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import {
  Avatar,
  Grid, IconButton, InputAdornment, Menu, MenuItem, TextField, Tooltip,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { IAuthProps } from '../../redux/modules/Auth/types';
import { Creators as CreateLoadingAction } from '../../redux/modules/Loading/ducks';
import { Creators as CreateCatalogAction } from '../../redux/modules/Catalog/ducks';
import { IState } from '../../redux/store';
import {
  CustomTab, StyledBadge,
} from './styles';

interface IValuesProps {
  filters: {
    productName: string;
  }
}

export interface ICounterProps {
  counter: number;
}
const MainHeader: React.FC = () => {
  const cartCounter = useSelector<IState, number>(state => state.cart.counter);
  const dispatch = useDispatch();
  const [storagedCounter, setStoragedCounter] = useState(0);
  const [selectedNavTab, setSelectedNavTab] = useState('/home');
  const [avatar, setAvatar] = useState(null);
  const [actualURLPath] = useState(useLocation().pathname);
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
    setSelectedNavTab(newValue);
    // localStorage.setItem('Selected::navbar', newValue);
    navigate(`/${newValue}`);
  };

  const goToNavTabIndicator = useCallback((path: string) => {
    setSelectedNavTab(path);
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

  const formik = useFormik({
    initialValues: {
      productName: '',
    },

    onSubmit: (values) => {
      dispatch(CreateLoadingAction.loadingRequest());
      handleSubmit({
        filters: {
          productName: values.productName,
        },
      });
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  const handleSubmit = useCallback((values: IValuesProps) => {
    setTimeout(() => {
      navigate('/products');
      setSelectedNavTab('products');
      dispatch(CreateCatalogAction.getProductsByFiltersRequest(values.filters));
    }, 1000);

    formik.resetForm();
  }, [dispatch, formik, navigate]);

  return (
    <Grid
      container
      direction="row"
      alignItems="flex-start"
      sx={{
        width: '100%', padding: '3rem', borderRadius: '1px', boxShadow: '0 4px 2px -2px #969696',
      }}
    >
      <Grid item xs={12} md={3}>
        <img src="/assets/techecommercecopy.png" alt="logo" style={{ maxWidth: '287px' }} />
      </Grid>

      <Grid item xs={10} md={6}>
        <TabContext value={selectedNavTab}>

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
                  <Avatar src={avatar || '/broken-image.png'} sx={{ bgcolor: '#2e7d32', outline: '2px solid #2e7d32' }} />
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
                    <Link
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      to="/account-dashboard"
                      onClick={() => goToNavTabIndicator('/account-dashboard')}
                    >
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
      <Grid
        container
        item
        alignItems="center"
        justifyContent="center"
        xs={12}
        md={12}
        lg={12}
      >
        <form onSubmit={formik.handleSubmit} style={{ width: '50%' }}>
          <TextField
            sx={{
              width: '100%',
              background: '#fff',
              marginTop: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            fullWidth
            id="productName"
            name="productName"
            label="Pesquise aqui"
            value={formik.values.productName}
            onChange={formik.handleChange}
            error={formik.touched.productName && Boolean(formik.errors.productName)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton type="submit">
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Grid>
    </Grid>

  );
};

export default MainHeader;
