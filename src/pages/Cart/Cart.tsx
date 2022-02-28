import React from 'react';
import { useSelector } from 'react-redux';
import { ICartItem } from '../../redux/modules/Cart/types';
import { IState } from '../../redux/store';
import { formatNumberCurrency } from '../../utils/FormatNumberCurrency';

const Cart: React.FC = () => {
  const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);
  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map(item => (
              <tr key={item.product.id}>
                <th>{item.product.name}</th>
                <th>{item.quantity}</th>
                <th>{formatNumberCurrency(item.quantity * item.product.price)}</th>
              </tr>
            ))
          }
        </tbody>
      </table>
    </main>
  );
};

export default Cart;
