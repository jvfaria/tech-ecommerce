/* eslint-disable react/require-default-props */
import React from 'react';
import {
  RouteProps as ReactRouteProps,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

interface RouteProps extends ReactRouteProps {
  isPrivate?: boolean;
}

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { auth } = useAuth();
  const location = useLocation();
  // eslint-disable-next-line no-extra-boolean-cast
  if (!Object.keys(auth).length) {
    return <Navigate to={{ pathname: '/login' }} state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;

// <ReactDOMRoute
//   {...rest}
//   render={() => (isPrivate === !!user ? (
//     <Component />
//   ) : (
//     <Navigate to={{ pathname: isPrivate ? '/login' : '/account-dashboard' }} />
//   ))}
// />

// eslint-disable-next-line no-lone-blocks
{ /* <ReactDOMRoute
      {...rest}
      element={
        () => (isPrivate === !!user
          ? (<Component />)
          : (<Navigate to={{
            pathname: isPrivate ? '/login' : '/account-dashboard' }} />))
      }
    /> */ }
