import {
  Star, StarHalf, FavoriteBorder, Favorite, AddShoppingCart,
} from '@mui/icons-material';
import {
  Card, Box, CardContent, Typography, Checkbox, IconButton, Button, CardMedia,
} from '@mui/material';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductToCartRequest } from '../../redux/modules/Cart/actions';
import { IProduct } from '../../redux/modules/Cart/types';
import { formatNumberCurrency } from '../../utils/FormatNumberCurrency';
import { PriceSpan } from '../ProductCard/styles';

interface IFeaturedProductsCard {
  product: IProduct
}
const FeaturedProductsCard: React.FC<IFeaturedProductsCard> = (
  { product } : IFeaturedProductsCard,
) => {
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        bgcolor: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.8rem',
        marginBottom: '0.5rem',
        width: '100%',
        overflowX: 'auto',
      }}
    >
      <Box key={product.id} sx={{ flexGrow: 1 }}>
        <CardContent
          key={product.id}
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: '1 0 auto',
          }}
        >

          <div>
            <Typography component="div" variant="h5">
              <Star sx={{ color: '#ccac00' }} fontSize="small" />
              <Star sx={{ color: '#ccac00' }} fontSize="small" />
              <Star sx={{ color: '#ccac00' }} fontSize="small" />
              <Star sx={{ color: '#ccac00' }} fontSize="small" />
              <StarHalf sx={{ color: '#ccac00' }} fontSize="small" />
            </Typography>

            <Typography component="div" variant="h5">
              {product.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {product.brand}
            </Typography>
            <PriceSpan style={{ fontSize: '1.2rem' }}>{formatNumberCurrency(product.price)}</PriceSpan>
          </div>

          <div>
            <CardMedia>

              <LazyLoadImage
                style={{ width: 140 }}
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
            </CardMedia>
          </div>
        </CardContent>
        <Box sx={{
          display: 'flex', alignItems: 'center', pl: 1, pb: 1,
        }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              icon={<FavoriteBorder color="action" fontSize="medium" />}
              checkedIcon={<Favorite sx={{ color: '#FD1D1Dcc' }} />}
            />
            <IconButton sx={{ marginLeft: '1.5rem' }} aria-label="cart" onClick={() => dispatch(addProductToCartRequest(product))}>
              <AddShoppingCart color="primary" fontSize="medium" />
            </IconButton>

            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', marginLeft: '3rem' }}>
              <Button variant="text">Ver produto</Button>
            </Link>
          </div>
        </Box>

      </Box>
    </Card>
  );
};

export default FeaturedProductsCard;
