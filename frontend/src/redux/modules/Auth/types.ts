export interface IAuthState {
  user: IAuthResponse
}

export interface IAuthResponse {
  username: string;
  token: string;
  authorities: string[];
}

export interface IUserRegisterResponse {
  username: string;
  email: string;
  password: string;
  error: IError;
}

export interface IError {
  timestamp: string;
  status: string;
  error: string;
  path: string;
  message: string;
}

export interface IAuthProps {
  user: {
    username: string;
    token: string;
    authorities: string[];
  }
}

export interface ILoginCredentials {
  email: string;
  password: string;
}
