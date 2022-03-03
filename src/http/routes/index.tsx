import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import MainHeader from '../../components/MainHeader';
import About from '../../pages/About/About';
import Cart from '../../pages/Cart/Cart';
import Home from '../../pages/HomePage/Home';
import Login from '../../pages/Login/Login';
import NotFound from '../../pages/NotFound/NotFound';
import Products from '../../pages/Products/Products';
import Register from '../../pages/Register/Register';

const Routes: React.FC = () => (
  <>
    <MainHeader />
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
      {/* <Route path="/catalog" element={<Catalog />} /> */}
    </Switch>
  </>

);

export default Routes;
