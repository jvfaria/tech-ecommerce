import React, { useEffect, useCallback, useState } from 'react';
import {
  Typography,
  CardContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Card,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { connect, useDispatch, useSelector } from 'react-redux';
import { capitalizeFirstLetter } from '../../utils/CapitalizeFirstLetter';
import { Creators as CreateBrandActions } from '../../redux/modules/Brands/ducks';
import { Creators as CreateCategoryActions } from '../../redux/modules/Categories/ducks';
import { IState } from '../../redux/store';
import { IBrand } from '../../redux/modules/Brands/types';
import { ICategory } from '../../redux/modules/Categories/types';
import { Subtitle } from './styles';
import { Creators as CreateAction } from '../../redux/modules/Catalog/ducks';
import { Creators as CreateLoadingAction } from '../../redux/modules/Loading/ducks/index';

import { countAll } from '../../services/ProductsCatalog/productsCatalog';

interface ISidebarProps {
  brands: IBrand[];
  categories: ICategory[];
}

interface ICheckedProps {
  checked: boolean;
  id: string;
}

const ProductSidebar: React.FC<ISidebarProps> = ({ brands, categories }: ISidebarProps) => {
  const [totalProducts, setTotalProducts] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CreateBrandActions.getBrandsRequest());
    dispatch(CreateCategoryActions.getCategoriesRequest());
    getTotalProducts();

    async function getTotalProducts() {
      const totalProductsReq = await countAll();
      setTotalProducts(totalProductsReq.data);
    }
  }, [dispatch]);

  const handleOnChangeCategory = useCallback((event: any) => {
    if (event.target.checked) {
      dispatch(CreateLoadingAction.loadingRequest());
      setTimeout(() => {
        dispatch(CreateAction.getProductsByCategoryRequest(event.target.value.toUpperCase()));
      }, 1000);
    } else {
      dispatch(CreateAction.uncheckProductsByCategory(event.target.value.toUpperCase()));
    }
  }, [dispatch]);

  const handleOnChangeBrand = useCallback((event: any) => {
    if (event.target.checked) {
      dispatch(CreateLoadingAction.loadingRequest());
      setTimeout(() => {
        dispatch(CreateAction.getProductsByBrandRequest(event.target.value.toUpperCase()));
      }, 1000);
    } else {
      dispatch(CreateAction.uncheckProductsByBrand(event.target.value.toUpperCase()));
    }
  }, [dispatch]);

  return (
    <Card variant="outlined">
      <CardContent>
        <div style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-beetwen',
        }}
        >
          <div style={{
            width: '100%',
          }}
          >
            <Typography gutterBottom variant="subtitle2" sx={{ fontSize: '1.80rem' }}>
              Filtrar
            </Typography>
          </div>
          <div style={{
            width: '40%',
          }}
          >
            <span style={{
              fontWeight: 500, fontSize: '0.8rem', color: '#7f858d',
            }}
            >
              {`${totalProducts} produtos`}
            </span>

          </div>
        </div>
        <Subtitle gutterBottom variant="subtitle1">
          Categoria
        </Subtitle>
        <FormGroup>
          {
            categories.length !== 0
              ? categories.map(category => (
                <FormControlLabel
                  key={category.id}
                  control={<Checkbox />}
                  label={capitalizeFirstLetter(category.name)}
                  value={capitalizeFirstLetter(category.name)}
                  onChange={handleOnChangeCategory}
                />
              )) : <CircularProgress sx={{ margin: '0 auto' }} />
          }
        </FormGroup>

        <Subtitle gutterBottom variant="subtitle1">
          Marca
        </Subtitle>
        <FormGroup>
          {
            brands.length !== 0
              ? brands.map(brand => (
                <FormControlLabel
                  key={brand.id}
                  control={<Checkbox />}
                  label={capitalizeFirstLetter(brand.name)}
                  value={capitalizeFirstLetter(brand.name)}
                  onChange={handleOnChangeBrand}
                />
              )) : <CircularProgress sx={{ margin: '0 auto' }} />
          }
        </FormGroup>

      </CardContent>
    </Card>
  );
};

function mapStateToProps(state: IState) {
  const { getBrandsRequest } = CreateBrandActions;
  const { getCategoriesRequest } = CreateCategoryActions;

  return {
    getBrandsRequest,
    getCategoriesRequest,
    brands: state.brands.brands,
    categories: state.categories.categories,
  };
}

export default connect(mapStateToProps)(ProductSidebar);
