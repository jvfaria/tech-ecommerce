import {
  ArrowForwardIosSharp,
} from '@mui/icons-material';
import {
  Box, Grid, Typography, Paper, TextField, Button,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IProduct } from '../../redux/modules/Cart/types';
import { calculatePriceRoudingDown } from '../../utils/CalculatePriceRoundingDown';
import { calculateInstallments } from '../../utils/CalculateInstallments';
import { formatNumberCurrency } from '../../utils/FormatNumberCurrency';
import { ProductOverviewContainer, ProductOverviewPriceSpan } from './styles';

interface IProductOverviewProps {
  product : IProduct;
}

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
  console.log(product);
  const [defaultCardImage, setDefaultCardImage] = useState(product.image.filepath);

  useEffect(() => {
    setDefaultCardImage(product.image.filepath);
  }, [product.image.filepath]);

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

          <Grid item>
            <Typography gutterBottom variant="h4" component="div">{`${product.name} ${product.description}`}</Typography>
            <Typography variant="subtitle1" sx={{ position: 'relative', bottom: 0, right: 0 }}>
              Fabricante:
              { ' ' }
              <strong>
                {product.brand.name}
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
                  src={product.image.filepath}
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

// <Grid
//             item
//             lg={1}
//             md={1}
//             sx={{
//               padding: '0 5px',
//             }}
//           >
//             <div style={{
//               position: 'relative',
//               top: '50%',
//               left: '50%',
//               width: '330px',
//               height: 'auto',
//               transform: 'translateX(-50%) translateY(-50%) rotate(-90deg)',
//             }}
//             >

//               <Slider {...settings}>
//                 {images.map((item) => (
//                   <CardActionArea
//                     onClick={() => handleChangeImage(item.src)}
//                     key={item.id}
//                     sx={{
//                       bgcolor: 'transparent', width: '5px', height: '100%', padding: '5px',
//                     }}
//                   >
//              <img style={{ padding: 0 }} src={item.src} alt={item.alt} width="56" height="56" />
//                   </CardActionArea>
//                 ))}
//               </Slider>

//             </div>
//           </Grid>
