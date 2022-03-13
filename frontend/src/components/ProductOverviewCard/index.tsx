import {
  ArrowBackIosNewRounded,
  ArrowBackIosNewSharp,
  ArrowForwardIosOutlined,
  ArrowForwardIosRounded,
  ArrowForwardIosSharp,
} from '@mui/icons-material';
import {
  Box, Grid, CardActionArea, Typography, Paper, TextField, Button,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Slider from 'react-slick';
import { IProduct } from '../../redux/modules/Cart/types';
import { calculatePriceRoudingDown } from '../../utils/CalculatePriceRoundingDown';
import { calculateInstallments } from '../../utils/CalculateInstallments';
import { formatNumberCurrency } from '../../utils/FormatNumberCurrency';
import { ProductOverviewContainer, ProductOverviewPriceSpan } from './styles';

interface IProductOverviewProps {
  product : IProduct;
}

const images = [
  {
    id: 1,
    src:
      'https://images.unsplash.com/photo-1627745193246-1fa1c9404b21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    alt: 'The world',
  },
  {
    id: 2,
    src:
      'https://images.unsplash.com/photo-1631116617822-e100bd7e6e06?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    alt: 'Train',
  },
  {
    id: 3,
    src:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    alt: 'Laptop',
  },
  {
    id: 4,
    src:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    alt: 'Laptop',
  },
  {
    id: 5,
    src:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    alt: 'Laptop',
  },
  {
    id: 6,
    src:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    alt: 'Laptop',
  },
  {
    id: 7,
    src:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    alt: 'Laptop',
  },
  {
    id: 8,
    src:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    alt: 'Laptop',
  },
];

const settings = {
  className: 'center',
  infinite: true,
  slidesToShow: 5,
  centerPadding: '60px',
  nextArrow: <ArrowForwardIosSharp sx={{ bgcolor: '#000', borderRadius: '50%', color: 'white' }} />,
};
const ProductOverviewCard: React.FC<IProductOverviewProps> = (
  { product }: IProductOverviewProps,
) => {
  const [defaultCardImage, setDefaultCardImage] = useState(product.img);

  useEffect(() => {
    setDefaultCardImage(product.img);
  }, [product.img]);

  const handleChangeImage = useCallback((imgSrc: string) => {
    // eslint-disable-next-line no-param-reassign
    setDefaultCardImage(imgSrc);
    console.log(defaultCardImage);
  }, [defaultCardImage]);

  return (
    <ProductOverviewContainer>
      <Paper sx={{
        marginTop: '4rem',
        padding: '3rem',
      }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
          }}
        >
          <Grid
            item
            lg={1}
            md={1}
            sx={{
              padding: '0 5px',
            }}
          >
            <div style={{
              position: 'relative',
              top: '50%',
              left: '50%',
              width: '330px',
              height: 'auto',
              transform: 'translateX(-50%) translateY(-50%) rotate(-90deg)',
            }}
            >

              <Slider {...settings}>
                {images.map((item) => (
                  <CardActionArea
                    onClick={() => handleChangeImage(item.src)}
                    key={item.id}
                    sx={{
                      bgcolor: 'transparent', width: '5px', height: '100%', padding: '5px',
                    }}
                  >
                    <img style={{ padding: 0 }} src={item.src} alt={item.alt} width="56" height="56" />
                  </CardActionArea>
                ))}
              </Slider>

            </div>
          </Grid>

          <Grid item>
            <Typography gutterBottom variant="h4" component="div">{`${product.name} ${product.description}`}</Typography>
            <Typography variant="subtitle1" sx={{ position: 'relative', bottom: 0, right: 0 }}>
              Fabricante:
              { ' ' }
              <strong>
                {product.brand}
              </strong>
            </Typography>
            <Grid
              container
            >

              <Grid container item md={4} lg={4}>
                <LazyLoadImage
                  style={{
                    minWidth: '350px',
                    width: '100%',
                    height: 'auto',
                  }}
                  src={`/assets/${defaultCardImage}`}
                  alt="product"
                  effect="blur"
                  onError={({ currentTarget }) => {
                  // eslint-disable-next-line no-param-reassign
                    currentTarget.onerror = null;
                    // eslint-disable-next-line no-param-reassign
                    currentTarget.src = '/assets/noimage.jfif';
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, fontSize: '1rem' }}
                >
                  Consultar frete e prazo de entrega

                </Typography>

                <Grid
                  container
                  item
                  xs={12}
                  lg={12}
                  md={12}
                  sm={12}
                >
                  <Grid item xs={9} sm={9}>
                    <TextField
                      placeholder="Insira aqui seu cep"
                      sx={{
                        background: '#fff',
                        width: '95%',
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    <Button variant="contained" sx={{ height: '100%', width: '20px' }}>OK</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                item
                md={8}
                lg={8}
                direction="column"
                justifyContent="flex-end"
                alignItems="flex-start"
              >

                <Grid item>
                  <p style={{ color: 'rgb(127, 133, 141)', fontWeight: 'bold' }}><del>{formatNumberCurrency(product.price)}</del></p>
                  <ProductOverviewPriceSpan>
                    {calculatePriceRoudingDown(product.price)}
                  </ProductOverviewPriceSpan>

                </Grid>
                <Typography variant="caption" fontSize={16}>À vista no PIX com até 10% OFF</Typography>
                <Typography variant="caption" fontSize={14}>{`Em até 12x de ${calculateInstallments(product.price)} sem juros no cartão`}</Typography>
                <Grid item sx={{ marginTop: 6 }}>
                  <Button variant="contained" color="success" sx={{ width: '20rem', height: '56px' }}>COMPRAR</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </ProductOverviewContainer>
  );
};

export default ProductOverviewCard;
