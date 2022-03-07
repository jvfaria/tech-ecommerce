import React, { useEffect, useState, useCallback } from 'react';
import {
  Typography,
  CardContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { Subtitle } from './styles';
import { api } from '../../../services/api';
import { capitalizeFirstLetter } from '../../../utils/CapitalizeFirstLetter';

interface IBrand {
  id: number;
  name: string;
}

interface ICategory {
  id: number;
  categoryName: string;
  random: string;
}

const CustomCard: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchBrands() {
      try {
        const response = await api.get('/brands');
        setBrands(response.data);
      } catch (err) {
        enqueueSnackbar('Erro ao carregar marcas', {
          variant: 'error',
        });
        console.log(err);
      }
    }

    async function fetchCategories() {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (err) {
        enqueueSnackbar('Erro ao carregar categorias', {
          variant: 'error',
        });
        console.log(err);
      }
    }

    fetchBrands();
    fetchCategories();
  }, [enqueueSnackbar]);

  const handleOnChange = useCallback(() => {
    console.log('ONCHANGE');
  }, []);

  return (
    <>
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
            categories && categories.map(category => (
              <FormControlLabel
                key={category.id}
                control={<Checkbox />}
                label={capitalizeFirstLetter(category.categoryName)}
                onChange={handleOnChange}
              />
            ))
          }
        </FormGroup>

        <Subtitle gutterBottom variant="subtitle1">
          Marca
        </Subtitle>
        <FormGroup>
          {
            brands.map(brand => (
              <FormControlLabel
                key={brand.id}
                control={<Checkbox />}
                label={capitalizeFirstLetter(brand.name)}
                onChange={handleOnChange}
              />
            ))
          }
        </FormGroup>

      </CardContent>
    </>
  );
};

export default CustomCard;
