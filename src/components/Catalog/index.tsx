import React from 'react';
import {
  Grid,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import ProductCard from '../ProductCard';
import { IProduct } from '../../redux/modules/Cart/types';
import { ICatalogState } from '../../redux/modules/Catalog/types';

const Catalog: React.FC<ICatalogState> = ({ products }: ICatalogState) => {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Grid
      sx={{ marginBottom: 20 }}
      container
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 2, md: 4 }}
    >
      {
        products && products.map((product: IProduct) => (
          <Grid item md={4} sm={4} xs={6} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))
      }

    </Grid>
  );
};

export default Catalog;
