export interface IUser {
  email: string;
  password: string;
}

export interface IAuthState {
  login: IUser
}
