import React from 'react';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';
import MainHeader from '../../components/MainHeader';
import { AuthProvider } from '../../hooks/auth';
import About from '../../pages/About/About';
import AccountDashboard from '../../pages/AccountDashboard/AccountDashboard';
import Cart from '../../pages/Cart/Cart';
import Home from '../../pages/HomePage/Home';
import Login from '../../pages/Login/Login';
import NotFound from '../../pages/NotFound/NotFound';
import ProductOverview from '../../pages/ProductOverview/ProductOverview';
import Products from '../../pages/Products/Products';
import Register from '../../pages/Register/Register';
import { CustomContainer } from '../../styles/globalStyle';
import RequireAuth from './RequireAuth';

const Routes: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <MainHeader />
      <CustomContainer>
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/product/:id" element={<ProductOverview />} />
          <Route path="/account-dashboard" element={<RequireAuth><AccountDashboard /></RequireAuth>} />
        </Switch>
      </CustomContainer>
    </AuthProvider>
  </BrowserRouter>

);

export default Routes;
