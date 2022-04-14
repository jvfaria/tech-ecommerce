export interface IAuthState {
  user: IAuthResponse
}

export interface IAuthResponse {
  username: string;
  token: string;
  authorities: string[];
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
