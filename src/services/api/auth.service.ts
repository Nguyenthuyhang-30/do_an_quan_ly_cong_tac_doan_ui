import HttpService from './http.service';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  VerifyTokenResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  User,
} from '../../types/auth';

class AuthService {
  private http = new HttpService();
  private readonly TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly USER_KEY = 'user';

  /**
   * Register new user
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await this.http.post<RegisterResponse>(
      '/access/register',
      data as Record<string, unknown>,
    );

    if (response.data) {
      // Save tokens and user to localStorage
      this.setTokens(response.data.tokens);
      this.setUser(response.data.user);
    }

    return response.data;
  }

  /**
   * Login user (with email or username)
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.http.post<LoginResponse>(
      '/access/login',
      credentials as Record<string, unknown>,
    );

    if (response.data) {
      // Save tokens and user to localStorage
      this.setTokens(response.data.tokens);
      this.setUser(response.data.user);
    }

    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await this.http.post('/access/logout', {});
    } finally {
      // Clear all auth data from localStorage
      this.clearAuth();
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<RefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const payload: RefreshTokenRequest = { refreshToken };
    const response = await this.http.post<RefreshTokenResponse>(
      '/access/refresh-token',
      payload as Record<string, unknown>,
    );

    if (response.data) {
      this.setAccessToken(response.data.accessToken);
      if (response.data.refreshToken) {
        this.setRefreshToken(response.data.refreshToken);
      }
    }

    return response.data;
  }

  /**
   * Verify token validity
   */
  async verifyToken(): Promise<VerifyTokenResponse> {
    const response = await this.http.post<VerifyTokenResponse>('/access/verify-token', {});
    return response.data;
  }

  /**
   * Request password reset
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await this.http.post('/access/forgot-password', data as Record<string, unknown>);
  }

  /**
   * Reset password with token
   */
  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await this.http.post('/access/reset-password', data as Record<string, unknown>);
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Set tokens
   */
  private setTokens(tokens: { accessToken: string; refreshToken: string }): void {
    this.setAccessToken(tokens.accessToken);
    this.setRefreshToken(tokens.refreshToken);
  }

  /**
   * Set access token
   */
  private setAccessToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Set refresh token
   */
  private setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  /**
   * Set user
   */
  private setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Clear all auth data
   */
  clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}

export default new AuthService();
