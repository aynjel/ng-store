export interface TUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export type UserRole = 'Admin' | 'Customer';

export type TUserReadonly = Omit<TUser, 'password'>;

export type CreateUserRequest = Omit<TUser, 'id'>;
