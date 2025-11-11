// Account Types

export type AccountStatus = 'active' | 'inactive' | 'locked';

export interface Account {
  id: number;
  email: string;
  fullName: string;
  phoneNumber?: string;
  address?: string;
  avatar?: string;
  roleId?: number;
  status?: AccountStatus;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
  role?: {
    id: number;
    name: string;
  };
}

export interface UpdateAccountProfileRequest {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  avatar?: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordRequest {
  newPassword: string;
}

export interface UpdateAccountRoleRequest {
  roleId: number;
}

export interface AccountListParams {
  page?: number;
  limit?: number;
  search?: string;
  roleId?: number;
  status?: AccountStatus;
  [key: string]: string | number | boolean | undefined;
}
