import { Grid, Typography } from '@mui/material';
import React from 'react';
import Catalog from '../../components/Catalog';
import ProductSidebar from '../../components/ProductSidebar';
import { ProductContainer } from './styles';

const Products: React.FC = () => (
  <ProductContainer>
    <Typography variant="h2" sx={{ fontSize: '2.75rem', textAlign: 'left', marginBottom: '4rem' }}>Catálogo de produtos</Typography>
    <Grid
      container
      direction="row"
      spacing={3}
      alignItems="flex-start"
    >
      <Grid item lg={4} md={3} sm={12} xs={12}>
        <ProductSidebar />
      </Grid>

      <Grid item lg={8} md={9} sm={12} xs={12}>
        <Catalog />
      </Grid>
    </Grid>
  </ProductContainer>
);

export default Products;
