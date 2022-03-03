import React, { useState, useEffect, useCallback } from 'react';
import { Clear, Search } from '@mui/icons-material';
import {
  Grid, Typography, TextField, IconButton,
} from '@mui/material';
import { connect, useDispatch } from 'react-redux';
import { getProductsCatalogRequest } from '../../redux/modules/Catalog/actions';
import ProductSidebar from '../../components/ProductSidebar';
import { ProductContainer } from './styles';
import { IProduct } from '../../redux/modules/Cart/types';
import { IState } from '../../redux/store';
import Catalog from '../../components/Catalog';

interface IProductsProps {
  products: IProduct[],
}

const Products: React.FC<IProductsProps> = ({ products }: IProductsProps) => {
  const [search, setSearch] = useState('');
  const [filteredProductData, setFilteredProductData] = useState<IProduct[]>([]);
  // const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsCatalogRequest());
    setFilteredProductData(products);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useCallback((event: {target: {value: string}}) => {
    setSearch(event.target.value);

    if (event.target.value.length === 0 || search.length === 0) {
      setFilteredProductData(products);
      return;
    }
    const filteredProducts = products
      .filter(product => product.name.toLowerCase().includes(search.toLowerCase()));

    setFilteredProductData(filteredProducts);
  }, [products, search]);

  const clearSearch = useCallback(() => {
    setSearch('');
    setFilteredProductData(products);
  }, [products]);

  return (
    <ProductContainer>
      <Typography variant="h2" sx={{ fontSize: '2.75rem', textAlign: 'left', marginBottom: '4rem' }}>Catálogo de produtos</Typography>

      <div style={{
        paddingBottom: '1rem', width: '100%', display: 'flex', alignItems: 'center',
      }}
      >
        <TextField
          sx={{
            width: '100%',
            background: 'white',
          }}
          value={search}
          onChange={handleSearch}
          id="outlined-basic"
          label="Pesquisar produto"
        />
        {
          search.length === 0 ? (<Search sx={{ position: 'relative', right: '50px' }} />)
            : (
              <IconButton sx={{ position: 'relative', right: '50px' }} onClick={clearSearch}>
                <Clear />
                {' '}
              </IconButton>
            )
        }

      </div>
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
          {
            filteredProductData.length === 0
              ? <Catalog products={products} />
              : <Catalog products={filteredProductData} />
          }
        </Grid>
      </Grid>
    </ProductContainer>
  );
};

function mapStateToProps(state: IState) {
  return {
    getProductsCatalogRequest,
    products: state.catalog.products,
  };
}
export default connect(mapStateToProps)(Products);
