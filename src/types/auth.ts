// Authentication Types

// User roles
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

export interface LoginRequest extends Record<string, unknown> {
  email?: string;
  username?: string;
  password: string;
}

export interface RegisterRequest extends Record<string, unknown> {
  member_id: number;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName?: string;
  phoneNumber?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  username?: string;
  memberId?: number;
  role?: UserRole | string;
  avatar?: string;
  status?: string | number;
}

export interface LoginResponse {
  member: User;
  tokens: AuthTokens;
}

export interface RegisterResponse {
  user: User;
  tokens: AuthTokens;
}

export interface RefreshTokenRequest extends Record<string, unknown> {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface VerifyTokenResponse {
  valid: boolean;
  user?: User;
}

export interface ForgotPasswordRequest extends Record<string, unknown> {
  email: string;
}

export interface ResetPasswordRequest extends Record<string, unknown> {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest extends Record<string, unknown> {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
