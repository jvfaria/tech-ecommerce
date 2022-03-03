import React from 'react';
import {
  Button,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { ICartItem } from '../../redux/modules/Cart/types';
import { IState } from '../../redux/store';
import { formatNumberCurrency } from '../../utils/FormatNumberCurrency';
import { ButtonFinishContainer, CartContainer } from './styles';

const Cart: React.FC = () => {
  const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);

  return (
    <CartContainer>
      <Typography variant="h2" sx={{ fontSize: '2.75rem', textAlign: 'left', marginBottom: '4rem' }}>Carrinho</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {

              cart.map(item => (
                <TableRow key={item.product.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.product.brand}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatNumberCurrency(item.product.price)}</TableCell>
                  <TableCell>
                    {formatNumberCurrency(item.product.price * item.quantity)}
                  </TableCell>
                </TableRow>
              ))

              }
          </TableBody>
        </Table>
      </TableContainer>

      <ButtonFinishContainer>
        <Button variant="contained" color="info">Comprar +</Button>
        <Button sx={{ marginLeft: '20px' }} variant="contained" color="success">Fechar</Button>
      </ButtonFinishContainer>

    </CartContainer>
  );
};

export default Cart;
