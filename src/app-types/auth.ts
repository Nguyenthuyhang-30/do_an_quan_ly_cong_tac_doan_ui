// Authentication Types

// User roles - Role names from API
export enum UserRole {
  ADMIN = 'Admin',
  MEMBER = 'Member',
  MODERATOR = 'Moderator',
  BCH = 'BCH', // Ban Chấp hành
}

// Role interface from API
export interface Role {
  id: number;
  roleName: string;
  roleDescription?: string;
  assignedAt?: string;
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
  userName?: string;
  username?: string;
  memberId?: number;
  roles?: Role[]; // Array of roles from API
  avatar?: string;
  status?: string | number;
}

// API Response wrapper
export interface ApiResponse<T> {
  code: string;
  message: string;
  status: string;
  data: T;
}

export interface LoginResponseData {
  member: User;
  tokens: AuthTokens;
}

export interface LoginResponse {
  code: string;
  message: string;
  status: string;
  data: LoginResponseData;
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
