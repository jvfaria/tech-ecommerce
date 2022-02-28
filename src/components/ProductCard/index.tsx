import React, { useCallback } from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Checkbox,
  Typography,
} from '@mui/material';
import { AddShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IProductCardProps } from './types';
import { ImageWrapper, PriceSpan } from './styles';
import { formatNumberCurrency } from '../../utils/FormatNumberCurrency';
import { addProductToCart } from '../../redux/modules/Cart/actions';
import { IProduct } from '../../redux/modules/Cart/types';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductCard: React.FC<IProductCardProps> = ({ product }: IProductCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = useCallback((newProduct: IProduct) => {
    dispatch(addProductToCart(newProduct));
  }, [dispatch]);

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
      </Card>

    </>
  );
};

export default ProductCard;
