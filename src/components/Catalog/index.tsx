import React, { useEffect, useState } from 'react';
import {
  Grid,
} from '@mui/material';
import { api } from '../../services/api';
import ProductCard from '../ProductCard';
import { IProduct } from '../../redux/modules/Cart/types';

const Catalog: React.FC = () => {
  const [catalog, setCatalog] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get('/products').then(response => setCatalog(response.data)).catch(err => console.error(err));
  }, []);

  return (
    <Grid
      sx={{ marginBottom: 20 }}
      container
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 2, md: 4 }}
    >
      {
        catalog && catalog.map(product => (
          <Grid item md={4} sm={4} xs={6} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))
      }

    </Grid>
  );
};

export default Catalog;
