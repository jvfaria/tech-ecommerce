import React from 'react';
import {
  Card,
} from '@mui/material';
import CustomCard from './CustomCard/index';

export const ProductSidebar = () => (
  <>
    <Card variant="outlined">
      <CustomCard />
    </Card>
  </>
);

export default ProductSidebar;
