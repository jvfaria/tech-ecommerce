import React, { useCallback, useState } from 'react';
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Checkbox,
  Snackbar,
  Typography,
} from '@mui/material';
import { AddShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { IProductCardProps } from './types';
import { ImageWrapper, PriceSpan } from './styles';
import { formatNumberCurrency } from '../../utils/FormatNumberCurrency';
import { addProductToCart } from '../../redux/modules/Cart/actions';
import { IProduct } from '../../redux/modules/Cart/types';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductCard: React.FC<IProductCardProps> = ({ product }: IProductCardProps) => {
  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToCart = useCallback((newProduct: IProduct) => {
    dispatch(addProductToCart(newProduct));

    setOpenSnackbar(true);
  }, [dispatch]);

  const handleNavbarIndicator = useCallback(() => {
    localStorage.setItem('Selected::navbar', '');

    setOpenSnackbar(true);
  }, []);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  // const wipeNavTabIndicator = () => {
  //   setValue('');
  //   localStorage.setItem('Selected::navbar', '');
  // };

  return (
    <>
      <Card sx={{
        minWidth: 168, maxWidth: 300, maxHeight: 460,
      }}
      >

        <CardActionArea>
          <ImageWrapper>
            <LazyLoadImage
              src={`/assets/${product.img}`}
              alt="product"
              effect="blur"
              onError={({ currentTarget }) => {
                // eslint-disable-next-line no-param-reassign
                currentTarget.onerror = null;
                // eslint-disable-next-line no-param-reassign
                currentTarget.src = '/assets/noimage.jfif';
              }}

            />
          </ImageWrapper>
          <CardContent>
            <Typography sx={{ fontSize: '1.2rem' }} noWrap gutterBottom variant="subtitle1" component="div">{product.name}</Typography>
            <Typography sx={{ fontSize: '0.8rem' }} noWrap variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <br />
            <PriceSpan>
              {formatNumberCurrency(product.price)}
            </PriceSpan>
          </CardContent>
        </CardActionArea>

        <CardActions style={{
          padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        }}
        >
          <Button variant="outlined" startIcon={<AddShoppingCart />} onClick={() => handleAddToCart(product)}>Carrinho</Button>
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: '#FD1D1Dcc' }} />} />
        </CardActions>

        <Snackbar open={openSnackbar} onClose={handleClose} autoHideDuration={2000}>
          <Alert severity="success" onClose={handleClose}>
            <AlertTitle>Successo</AlertTitle>
            Item adicionado no carrinho —
            {' '}
            <Link onClick={handleNavbarIndicator} style={{ textDecoration: 'none', color: '#2e7d32' }} to="/cart"><strong>Ver carrinho</strong></Link>
          </Alert>
        </Snackbar>
      </Card>

    </>
  );
};

export default ProductCard;
