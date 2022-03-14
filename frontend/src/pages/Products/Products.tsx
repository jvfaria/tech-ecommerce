import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowBack, ArrowForward, Clear, Search,
} from '@mui/icons-material';
import {
  Grid, Typography, TextField, IconButton, InputAdornment, Box, Pagination, PaginationItem, Stack,
} from '@mui/material';
import { connect, useDispatch } from 'react-redux';
import ProductSidebar from '../../components/ProductSidebar';
import { IProduct } from '../../redux/modules/Cart/types';
import { IState } from '../../redux/store';
import Catalog from '../../components/Catalog';
import { Creators } from '../../redux/modules/Catalog/ducks/index';

interface IProductsProps {
  products: IProduct[],
}

const Products: React.FC<IProductsProps> = ({ products }: IProductsProps) => {
  const [search, setSearch] = useState('');
  const [filteredProductData, setFilteredProductData] = useState<IProduct[]>([]);
  // const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.getProductsCatalogRequest());
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
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        variant="h2"
        sx={{
          textAlign: 'left',
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
      </Typography>

      <TextField
        sx={{
          width: '100%',
          background: '#fff',
          marginBottom: '2rem',
        }}
        value={search}
        onChange={handleSearch}
        id="outlined-basic"
        label="Pesquisar produto"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {
                search.length === 0 ? (<Search />)
                  : (
                    <IconButton onClick={clearSearch}>
                      <Clear />
                    </IconButton>
                  )
              }
            </InputAdornment>
          ),
        }}
      />
      {

        }

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
            filteredProductData.length === 0
              ? <Catalog products={products} />
              : <Catalog products={filteredProductData} />
          }
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
        </Grid>
      </Grid>
    </Box>
  );
};

function mapStateToProps(state: IState) {
  const { getProductsCatalogRequest } = Creators;

  return {
    getProductsCatalogRequest,
    products: state.catalog.products,
  };
}
export default connect(mapStateToProps)(Products);
