import React, {
  useCallback, useEffect, useState,
} from 'react';
import {
  Grid,
  Typography,
  Box,
  Card,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import {
  Recommend,
  StarBorderPurple500,
} from '@mui/icons-material';
import { connect, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Scrollbars } from 'react-custom-scrollbars';
import { MediaCaption, PriceSpan } from './styles';
import { IState } from '../../redux/store';
import { getProductsCatalogRequest } from '../../redux/modules/Catalog/actions';
import { IProduct } from '../../redux/modules/Cart/types';
import { formatNumberCurrency } from '../../utils/FormatNumberCurrency';
import FeaturedProductsCard from '../../components/FeaturedProductsCard';

interface IHomeProps {
  products: IProduct[];
}
const carouselItems = [
  {
    id: 1, img: '/assets/nvideaProduct.jpg', title: 'Placa de vídeo NVidea Geforce GTX 780', price: 2889.90,
  },
  {
    id: 2, img: '/assets/geforcegtx680.jpg', title: 'Placa de vídeo NVidea Geforce GTX 680', price: 1699.99,
  },

  {
    id: 4, img: '/assets/acerNotebook.png', title: 'Kit Gamer Acer Nitro 5 AN517-52-50RS', price: 5242.99,
  },
];
const Home: React.FC<IHomeProps> = ({ products }: IHomeProps) => {
  const dispatch = useDispatch();
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const fetchProductsCatalog = useCallback(async () => {
    await dispatch(getProductsCatalogRequest());
  }, [dispatch]);

  useEffect(() => {
    fetchProductsCatalog();

    Promise.resolve(fetchProductsCatalog()).then(
      () => setFeaturedProducts(products.filter(product => product.featured === true)),
    ).catch(() => enqueueSnackbar('Erro ao carregar produtos em destaque', { variant: 'error' }));
  }, [enqueueSnackbar, fetchProductsCatalog, products]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        columnSpacing={{ xs: 0, md: 2, sm: 0 }}
        columns={{ xs: 12, sm: 0, md: 12 }}
        sx={{ marginTop: '4rem', marginRight: 0 }}
      >
        <Grid
          item
          lg={8}
          md={8}
          sx={{
            direction: 'column', alignItems: 'center', justifyContent: 'center', padding: 0, margin: 0,
          }}
        >
          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              borderRadius: '5px',
              background: '#003A4D',
              padding: '10px',
            }}
          >
            <Recommend
              fontSize="large"
              sx={{
                color: '#fff;', backgroundColor: 'transparent', padding: 0, margin: 0, borderRadius: '8px',
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: '1.75rem',
                fontWeight: '500',
                color: '#fff',
                paddingLeft: '2rem',
              }}
            >
              Mais procurados
            </Typography>

          </Grid>
          <Grid item lg={12} xs={12} md={12} sm={12}>

            <Card sx={{
              padding: 0,
              marginBottom: '2.5rem',
              marginTop: '2.5rem',
              width: '100%',
              borderRadius: '5px',
              height: '100%',
              boxShadow: 'none',
              bgcolor: 'transparent',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >

              <Carousel animation="slide" swipe fullHeightHover changeOnFirstRender>

                {
              carouselItems.map(item => (
                <>
                  <LazyLoadImage
                    style={{
                      width: '100%', height: 'auto', borderRadius: '5px', maxHeight: '621.25px',
                    }}
                    src={item.img}
                    alt="product"
                    effect="blur"
                    onError={({ currentTarget }) => {
                      // eslint-disable-next-line no-param-reassign
                      currentTarget.onerror = null;
                      // eslint-disable-next-line no-param-reassign
                      currentTarget.src = '/assets/noimage.jfif';
                    }}
                  />
                  <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <MediaCaption>
                      {item.title}
                      <br />
                      <PriceSpan>{formatNumberCurrency(item.price)}</PriceSpan>
                    </MediaCaption>
                  </Link>
                </>
              ))

            }

              </Carousel>
            </Card>

          </Grid>

        </Grid>

        <Grid item lg={4} xs={12} md={4} sm={12}>
          <Grid item lg={12} xs={12} md={12} sm={12} sx={{ direction: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Grid
              item
              lg={12}
              xs={12}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderRadius: '5px',
                background: '#003A4D',
                padding: '10px',
              }}
            >
              <StarBorderPurple500
                fontSize="large"
                sx={{
                  color: '#fff;', backgroundColor: 'transparent', padding: 0, margin: 0, borderRadius: '8px',
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  width: '100%',
                  fontSize: '1.75rem',
                  textAlign: 'left',
                  color: '#fff',
                  fontWeight: '500',
                  paddingLeft: '2rem',
                }}
              >
                Destaques
              </Typography>
            </Grid>
            <Grid
              item
              lg={12}
              xs={12}
              md={12}
              sm={12}
              sx={{ marginTop: '2.5rem', height: '1200px', overflow: 'hidden' }}
            >
              <Scrollbars style={{
                position: 'relative', right: '-2px', height: '1600px', maxHeight: '100%',
              }}
              >
                {

                featuredProducts.map(product => (
                  <Grid container item xs={12}>
                    <FeaturedProductsCard product={product} />
                  </Grid>
                ))

              }
              </Scrollbars>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

function mapStateToProps(state: IState) {
  return {
    getProductsCatalogRequest,
    products: state.catalog.products,
  };
}

export default connect(mapStateToProps)(Home);
