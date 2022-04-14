import React from 'react';
import {
  Grid,
} from '@mui/material';
import ProductCard from '../ProductCard';
import { IProduct } from '../../redux/modules/Cart/types';

interface ICatalogProps {
  products: IProduct[];
}

const Catalog: React.FC<ICatalogProps> = ({ products }: ICatalogProps) => (
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
);

export default Catalog;
