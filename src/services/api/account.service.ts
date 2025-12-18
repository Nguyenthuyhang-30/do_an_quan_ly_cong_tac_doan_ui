import HttpService from './http.service';
import { BasePaginatedResponse } from '@base/models/basePaginated';
import {
  Account,
  UpdateAccountProfileRequest,
  ChangePasswordRequest,
  ResetPasswordRequest,
  AccountListParams,
} from '../../app-types/account';

/**
 * Account Service
 */
class AccountService {
  private http = new HttpService();

  /**
   * Get all accounts (Admin only)
   */
  async getAll(): Promise<Account[]> {
    const response = await this.http.get<Account[]>('/account/get-all');
    return response.data;
  }

  /**
   * Get account list with pagination, search and filters
   */
  async getList(params?: AccountListParams): Promise<BasePaginatedResponse<Account>> {
    return this.http.getPaginated<Account>('/account/get-list', params ?? null);
  }

  /**
   * Search accounts
   */
  async search(params: AccountListParams): Promise<BasePaginatedResponse<Account>> {
    return this.http.getPaginated<Account>('/account/search', params ?? null);
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<Account> {
    const response = await this.http.get<Account>('/account/profile');
    return response.data;
  }

  /**
   * Get profile by member ID (Admin only)
   */
  async getProfileByMemberId(memberId: number): Promise<Account> {
    const response = await this.http.get<Account>(`/account/${memberId}/profile`);
    return response.data;
  }

  /**
   * Update current user profile
   */
  async updateProfile(data: UpdateAccountProfileRequest): Promise<Account> {
    const response = await this.http.put<Account>(
      '/account/profile',
      data as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Change password for current user
   */
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await this.http.put<void>(
      '/account/change-password',
      data as unknown as Record<string, unknown>,
    );
  }

  /**
   * Reset password for a member (Admin only)
   */
  async resetPassword(memberId: number, data: ResetPasswordRequest): Promise<void> {
    await this.http.put<void>(
      `/account/${memberId}/reset-password`,
      data as unknown as Record<string, unknown>,
    );
  }
}

export default new AccountService();
