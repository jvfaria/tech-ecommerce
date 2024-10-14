import React from 'react';
import {
  Button,
  Paper,
  TableContainer,
  Typography,
  Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { ProductionQuantityLimits } from '@mui/icons-material';
import { ICartItem } from '../../redux/modules/Cart/types';
import { IState } from '../../redux/store';
import { ButtonFinishContainer, CartContainer } from './styles';
import CartTable from '../../components/CustomCartTable/CustomPaginationActionsTable';

const Cart: React.FC = () => {
  const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CartContainer>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'left',
            borderRadius: '5px',
            marginTop: '4rem',
            marginBottom: '2rem',
            background: '#003A4D',
            padding: '10px',
            fontSize: '1.75rem',
            fontWeight: '500',
            color: '#fff',
            paddingLeft: '2rem',
          }}
        >
          Carrinho
        </Typography>
        {
          cart.length === 0
            ? (
              <TableContainer
                component={Paper}
                sx={{
                  maxWidth: '100%',
                  height: '30rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  bgcolor: '#fff',
                }}
              >
                <div>
                  <Typography variant="h4" sx={{ color: '#5a5a5a' }}>
                    Seu carrinho está
                    { ' ' }
                    <strong>vazio</strong>
                  </Typography>
                </div>
                <div>
                  <ProductionQuantityLimits sx={{ fontSize: '10rem', color: 'gray' }} />
                </div>
              </TableContainer>
            )
            : (
              <CartTable />
            )
        }

        <ButtonFinishContainer>
          <Button variant="contained" color="info">Continuar comprando</Button>
          <Button sx={{ marginLeft: '20px' }} variant="contained" color="success">Fechar compra</Button>
        </ButtonFinishContainer>
      </CartContainer>
    </Box>
  );
};

export default Cart;
