import {
  Button,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import React from 'react';
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
                  <TableRow>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.product.brand}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.product.price}</TableCell>
                    <TableCell>
                      {formatNumberCurrency(item.product.price * item.product.quantity)}
                    </TableCell>
                  </TableRow>
                ))
              }
          </TableBody>
        </Table>
      </TableContainer>

      <ButtonFinishContainer>
        <Button variant="contained" color="info">Comprar +</Button>
        <Button sx={{ marginLeft: '20px' }} variant="contained" color="success">Finalizar</Button>
      </ButtonFinishContainer>

    </CartContainer>
    // <main>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Produto</th>
    //         <th>Quantidade</th>
    //         <th>Subtotal</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {
    //         cart.map(item => (
    //           <tr key={item.product.id}>
    //             <th>{item.product.name}</th>
    //             <th>{item.quantity}</th>
    //             <th>{formatNumberCurrency(item.quantity * item.product.price)}</th>
    //           </tr>
    //         ))
    //       }
    //     </tbody>
    //   </table>
    // </main>
  );
};

export default Cart;
