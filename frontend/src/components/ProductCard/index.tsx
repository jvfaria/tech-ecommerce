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
import {
  AddShoppingCart, Block, Favorite, FavoriteBorder,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { IProductCardProps } from './types';
import { formatNumberCurrency } from '../../utils/FormatNumberCurrency';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ImageWrapper, PriceSpan } from './styles';
import { IState } from '../../redux/store';
import { Creators as CreateAction } from '../../redux/modules/Cart/ducks';

const ProductCard: React.FC<IProductCardProps> = ({ product }: IProductCardProps) => {
  const hasFailedAddToCart = useSelector<IState, boolean>(
    state => state.cart.productWithoutStock.includes(product.id as never),
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(() => {
    dispatch(CreateAction.addProductToCartRequest(product));
  }, [dispatch, product]);

  const handleOverviewProduct = useCallback(() => {
    navigate(`/product/${product.id}`);
  }, [navigate, product.id]);

  return (
    <>
      <Card
        key={product.id}
        sx={{
          maxHeight: 460,
        }}

      >

        <CardActionArea onClick={handleOverviewProduct}>
          <span style={{
            padding: '10px', color: '#7f858d', position: 'absolute', right: 10, zIndex: '1',
          }}
          >
            {`(${product.stock.quantity})`}
          </span>
          <ImageWrapper>
            <LazyLoadImage
              style={{
                width: '100%', height: '100%', marginTop: '5px',
              }}
              src={product.image ? product.image.filepath : `/assets/${product.image}`}
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
          {
          hasFailedAddToCart ? (

            <>
              <Button variant="outlined" disabled startIcon={<Block />}>SEM ESTOQUE</Button>
            </>
          )
            : (
              <>
                <Button variant="outlined" startIcon={<AddShoppingCart />} onClick={handleAddToCart}>Carrinho</Button>
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: '#FD1D1Dcc' }} />} />
              </>
            )
        }
        </CardActions>
      </Card>

    </>
  );
};

export default ProductCard;
