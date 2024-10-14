/* eslint-disable no-restricted-globals */
import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowBack, ArrowForward, Cached, Clear, Search,
} from '@mui/icons-material';
import {
  Grid,
  Typography,
  IconButton,
  Box,
  Pagination,
  PaginationItem,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProductSidebar from '../../components/ProductSidebar';
import { IState } from '../../redux/store';
import { Creators as CreateCatalogAction } from '../../redux/modules/Catalog/ducks/index';
import { Creators as CreateLoadingAction } from '../../redux/modules/Loading/ducks/index';
import ProductCard from '../../components/ProductCard';
import { IProduct } from '../../redux/modules/Cart/types';

const Products: React.FC = () => {
  const { isLoading } = useSelector((state:IState) => state.loading);
  const { products } = useSelector((state: IState) => state.catalog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CreateLoadingAction.loadingRequest());
    dispatch(CreateCatalogAction.getProductsCatalogRequest());
  }, [dispatch, products]);
  return (
    <Box sx={{ flexGrow: 1 }}>

      <>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '4rem',
            marginBottom: '2rem',
            borderRadius: '5px',
            background: '#003A4D',
            padding: '10px',
            fontSize: '1.75rem',
            fontWeight: '500',
            color: '#fff',
            paddingLeft: '2rem',
          }}
        >
          Catálogo de produtos

          <IconButton onClick={() => location.reload()}>
            <Cached fontSize="large" sx={{ color: '#FFF' }} />
          </IconButton>
        </Typography>

        <Grid
          container
          direction="row"
          spacing={2}
          alignItems="flex-start"
        >
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <ProductSidebar />
          </Grid>

          <Grid item lg={9} md={9} xs={12}>
            {
              isLoading
                ? (
                  <div style={{
                    margin: '0 auto',
                    width: '100%',
                    height: '50vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  >
                    <CircularProgress color="primary" sx={{ fontSize: '5rem' }} />
                  </div>
                )
                : (
                  <>
                    <Grid
                      sx={{ marginBottom: 20 }}
                      container
                      rowSpacing={2}
                      columnSpacing={{
                        lg: 0, md: 2, xs: 2, sm: 2,
                      }}
                    >
                      {
                        products && products.map((product: IProduct) => (
                          <Grid item lg={3} md={4} xs={12} sm={4} key={product.id}>
                            <ProductCard product={product} />
                          </Grid>
                        ))
                      }
                    </Grid>

                    <Stack spacing={2} sx={{ position: 'relative', bottom: 120 }}>
                      <Pagination
                        count={10}
                        renderItem={(item) => (
                          <PaginationItem
                            components={{ previous: ArrowBack, next: ArrowForward }}
                            {...item}
                          />
                        )}
                      />
                    </Stack>
                  </>
                )
            }

          </Grid>
        </Grid>
      </>

    </Box>
  );
};

export default Products;
