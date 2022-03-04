import React, {
  useCallback, useEffect, useState,
} from 'react';
import {
  Grid,
  Typography,
  CardContent,
  Box,
  Card,
  CardMedia,
  IconButton,
  Checkbox,
  Button,
  CardActionArea,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import {
  AddShoppingCart,
  Clear,
  Favorite,
  FavoriteBorder,
  Recommend,
  Star,
  StarBorderPurple500,
  StarHalf,
} from '@mui/icons-material';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { MediaCaption, PriceSpan } from './styles';
import { IState } from '../../redux/store';
import { getProductsCatalogRequest } from '../../redux/modules/Catalog/actions';
import { IProduct } from '../../redux/modules/Cart/types';
import { formatNumberCurrency } from '../../utils/FormatNumberCurrency';
import { addProductToCartRequest } from '../../redux/modules/Cart/actions';

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
    <Grid
      container
      columnSpacing={{
        xs: 0, md: 6, lg: 6, sm: 0,
      }}
      xs={12}
      md={12}
      lg={12}
      sx={{ marginTop: '4rem' }}
    >
      <Grid
        item
        lg={8}
        xs={12}
        md={8}
        sm={12}
        sx={{
          direction: 'column', alignItems: 'center', justifyContent: 'center',
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
          }}
          >

            <Carousel animation="slide" swipe fullHeightHover changeOnFirstRender>

              {
              carouselItems.map(item => (
                <>
                  <div style={{
                    minWidth: '1104px', height: 'auto', maxHeight: '621.25px',
                  }}
                  >
                    <LazyLoadImage
                      style={{
                        width: '100%', height: 'auto', borderRadius: '5px', maxHeight: '621.25px',
                      }}
                      src={item.img}
                      delayTime={15000}
                      alt="product"
                      effect="blur"
                      onError={({ currentTarget }) => {
                      // eslint-disable-next-line no-param-reassign
                        currentTarget.onerror = null;
                        // eslint-disable-next-line no-param-reassign
                        currentTarget.src = '/assets/noimage.jfif';
                      }}
                    />
                  </div>
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
          <div style={{ paddingTop: '2.5rem' }}>
            {
            featuredProducts.map(product => (

              <Card
                sx={{
                  bgcolor: '#fff', display: 'flex', justifyContent: 'space-between', padding: '2rem', marginBottom: '1rem',
                }}
              >
                <Box key={product.id} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent key={product.id} sx={{ flex: '1 0 auto' }}>

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
                  </CardContent>
                  <Box sx={{
                    display: 'flex', alignItems: 'center', pl: 1, pb: 1,
                  }}
                  >
                    <div style={{ paddingTop: '1rem', display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        icon={<FavoriteBorder color="action" fontSize="medium" />}
                        checkedIcon={<Favorite sx={{ color: '#FD1D1Dcc' }} />}
                      />
                      <IconButton sx={{ marginLeft: '1.5rem' }} aria-label="cart" onClick={() => dispatch(addProductToCartRequest(product))}>
                        <AddShoppingCart color="primary" fontSize="medium" />
                      </IconButton>

                      <Link to="/cart" style={{ textDecoration: 'none', marginLeft: '3rem' }}>
                        <Button variant="text">Ver produto</Button>
                      </Link>
                    </div>
                  </Box>
                </Box>
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
              </Card>
            ))

        }
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

function mapStateToProps(state: IState) {
  return {
    getProductsCatalogRequest,
    products: state.catalog.products,
  };
}

export default connect(mapStateToProps)(Home);

// function enqueueSnackbar(arg0: string, arg1: { variant: string; }) {
//   throw new Error('Function not implemented.');
// }
// <Grid container sx={{ marginTop: '4rem', bgcolor: 'black', height: '100vh' }}>
//     <Grid item lg={8} xs={8} md={12} sm={12} direction="column"
// alignItems="center" justifyContent="center">
//       <Grid item lg={8} xs={8}>
//         <Typography variant="h2" sx={{ fontSize: '2.75rem' }}>Mais procurados</Typography>
//       </Grid>
//       <Grid item lg={6} xs={6} md={12} sm={12} sx={{ paddingTop: '2rem', flex: 1 }}>
//         <Carousel navButtonsAlwaysVisible>
//           <Paper>
//             <LazyLoadImage
//               style={{ width: '100%', height: '100%', borderRadius: '5px' }}
//               src="/assets/geforcegtx680.jpg"
//               alt="product"
//               effect="blur"
//               onError={({ currentTarget }) => {
//                 // eslint-disable-next-line no-param-reassign
//                 currentTarget.onerror = null;
//                 // eslint-disable-next-line no-param-reassign
//                 currentTarget.src = '/assets/noimage.jfif';
//               }}
//             />
//             <Button variant="contained">
//               Check it out!
//             </Button>
//           </Paper>
//         </Carousel>

//         <Carousel>
//           <Paper elevation={3} sx={{ bgcolor: 'transparent' }}>
//             <LandingImageWrapper>
//               <LazyLoadImage
//                 style={{ width: '100%', borderRadius: '5px' }}
//                 src="/assets/geforcegtx680.jpg"
//                 alt="product"
//                 effect="blur"
//                 onError={({ currentTarget }) => {
//                   // eslint-disable-next-line no-param-reassign
//                   currentTarget.onerror = null;
//                   // eslint-disable-next-line no-param-reassign
//                   currentTarget.src = '/assets/noimage.jfif';
//                 }}
//               />
//             </LandingImageWrapper>
//           </Paper>
//         </Carousel>
//        <div style={{ height: '800px', position: 'relative' }}>
//           <div style={{
//             position: 'absolute', width: '100%', height: '800px', maxHeight: '800px',
//           }}
//           >
//             <Carousel
//               sx={{
//                 height: '100%',
//               }}
//               fullHeightHover
//               navButtonsAlwaysVisible
//             >
//               <Paper elevation={3} sx={{ bgcolor: 'transparent', height: '650px' }}>
//                 <LandingImageWrapper>
//                   <LazyLoadImage
//                     style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
//                     src="/assets/geforcegtx680.jpg"
//                     alt="product"
//                     effect="blur"
//                     onError={({ currentTarget }) => {
//                       // eslint-disable-next-line no-param-reassign
//                       currentTarget.onerror = null;
//                       // eslint-disable-next-line no-param-reassign
//                       currentTarget.src = '/assets/noimage.jfif';
//                     }}
//                   />
//                 </LandingImageWrapper>
//               </Paper>
//             </Carousel>
//           </div>
//         </div>
//          <CardContent sx={{ bgcolor: 'transparent' }}>
//                   <Grid container direction="row" justifyContent="space-between">
//                     <Box flexDirection="column">
//                       <Typography variant="h5" component="div">
//                         Placa de vídeo NVidea Geforce GTX 780
//                       </Typography>
//                       <Typography
//                         sx={{
//                           mb: 1.5, marginTop: '0.5rem', fontWeight: '500', fontSize: '1.35rem',
//                         }}
//                         color="text.secondary"
//                       >
//                         R$ 2.908,99
//                       </Typography>
//                     </Box>
//                     <Button variant="contained" sx={{ width: '10rem', height: '3.75rem' }}>
//                       Ver mais
//                     </Button>
//                   </Grid>
//                 </CardContent>

//       </Grid>
//     </Grid>
//     <Grid item lg={4} xs={4} md={12} sm={12}>
//       Item 2
//     </Grid>
//   </Grid>
