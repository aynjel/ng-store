export interface TUser {
  id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  active: boolean;
  role: UserRole;
}

export type UserRole = 'Admin' | 'Customer';

export type TUserReadonly = Omit<TUser, 'password'>;

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export type CreateUserRequest = Omit<TUser, 'id'>;
