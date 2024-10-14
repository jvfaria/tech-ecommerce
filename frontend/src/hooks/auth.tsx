import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Creators as CreateAuthAction } from '../redux/modules/Auth/ducks';
import { IAuthProps, ILoginCredentials } from '../redux/modules/Auth/types';
import { IRegisterUserData } from '../services/Auth/types';

interface IAuthContextData {
  auth: IAuthProps;
  login(credentials: ILoginCredentials): void;
  logout(user: IAuthProps): void;
  register(userData: IRegisterUserData): void;
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = (
  { children },
) => {
  const dispatch = useDispatch();

  const [data] = useState<IAuthProps>(() => {
    const authentication = localStorage.getItem('@TechEcommerce:user');
    if (authentication) {
      const parsedAuth: IAuthProps = JSON.parse(authentication);
      return parsedAuth;
    }

    return {} as IAuthProps;
  });

  const login = useCallback(({ email, password }): void => {
    dispatch(CreateAuthAction.getUserLoginRequest(email, password));
  }, [dispatch]);

  const logout = useCallback(({ user }): void => {
    dispatch(CreateAuthAction.logoutUser(user));
  }, [dispatch]);

  const register = useCallback((userData: IRegisterUserData): void => {
    dispatch(CreateAuthAction.registerUserRequest(userData));
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{
      auth: data, login, logout, register,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
