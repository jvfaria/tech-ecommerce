import React, { useEffect, useCallback } from 'react';
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
import { connect, useDispatch } from 'react-redux';
import { capitalizeFirstLetter } from '../../utils/CapitalizeFirstLetter';
import { Creators as CreateBrandActions } from '../../redux/modules/Brands/ducks';
import { Creators as CreateCategoryActions } from '../../redux/modules/Categories/ducks';
import { IState } from '../../redux/store';
import { IBrand } from '../../redux/modules/Brands/types';
import { ICategory } from '../../redux/modules/Categories/types';
import { Subtitle } from './styles';

interface ISidebarProps {
  brands: IBrand[];
  categories: ICategory[];
}

const ProductSidebar: React.FC<ISidebarProps> = ({ brands, categories }: ISidebarProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  console.log('categories', categories);

  useEffect(() => {
    dispatch(CreateBrandActions.getBrandsRequest());
    dispatch(CreateCategoryActions.getCategoriesRequest());
  }, [dispatch]);

  const handleOnChange = useCallback(() => {
    console.log('ONCHANGE');
  }, []);

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
            width: '50%',
          }}
          >
            <span style={{ textAlign: 'right', width: '100%' }}>1500 produtos</span>

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
                  onChange={handleOnChange}
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
                  onChange={handleOnChange}
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
