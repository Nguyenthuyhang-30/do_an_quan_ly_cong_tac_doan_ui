import { BaseService } from './base.service';
import { BasePaginatedResponse } from '@base/models/basePaginated';
import {
  MemberTransfer,
  CreateTransferRequest,
  ApproveTransferRequest,
  RejectTransferRequest,
  TransferStatistics,
  TransferListParams,
} from '../../types/member-transfer';

/**
 * Member Transfer Service
 */
class TransferService extends BaseService<
  MemberTransfer,
  CreateTransferRequest,
  Partial<CreateTransferRequest>
> {
  constructor() {
    super('transfer');
  }

  /**
   * Create transfer request
   */
  async createTransfer(data: CreateTransferRequest): Promise<MemberTransfer> {
    const response = await this.http.post<MemberTransfer>(
      '/transfer',
      data as unknown as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Get transfer history by member
   */
  async getByMember(
    memberId: number,
    params?: { page?: number; limit?: number },
  ): Promise<BasePaginatedResponse<MemberTransfer>> {
    return this.http.getPaginated<MemberTransfer>(
      `/transfer/member/${memberId}`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Get all transfers with pagination and filters
   */
  async getAllTransfers(
    params?: TransferListParams,
  ): Promise<BasePaginatedResponse<MemberTransfer>> {
    return this.http.getPaginated<MemberTransfer>(
      '/transfer',
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Get transfers by status
   */
  async getByStatus(
    status: 'pending' | 'approved' | 'rejected',
    params?: { page?: number; limit?: number },
  ): Promise<BasePaginatedResponse<MemberTransfer>> {
    return this.http.getPaginated<MemberTransfer>('/transfer', { ...params, status } as Record<
      string,
      string | number | boolean | null | undefined
    >);
  }

  /**
   * Get transfers by from branch
   */
  async getByFromBranch(
    fromBranchId: number,
    params?: { page?: number; limit?: number },
  ): Promise<BasePaginatedResponse<MemberTransfer>> {
    return this.http.getPaginated<MemberTransfer>(
      `/transfer/from-branch/${fromBranchId}`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Get transfers by to branch
   */
  async getByToBranch(
    toBranchId: number,
    params?: { page?: number; limit?: number },
  ): Promise<BasePaginatedResponse<MemberTransfer>> {
    return this.http.getPaginated<MemberTransfer>(
      `/transfer/to-branch/${toBranchId}`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Get transfer by ID
   */
  async getTransferById(id: number): Promise<MemberTransfer> {
    const response = await this.http.get<MemberTransfer>(`/transfer/${id}`);
    return response.data;
  }

  /**
   * Get transfer statistics
   */
  async getTransferStatistics(): Promise<TransferStatistics> {
    const response = await this.http.get<TransferStatistics>('/transfer/statistics');
    return response.data;
  }

  /**
   * Approve transfer request
   */
  async approve(id: number, data: ApproveTransferRequest): Promise<MemberTransfer> {
    const response = await this.http.put<MemberTransfer>(
      `/transfer/${id}/approve`,
      data as unknown as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Reject transfer request
   */
  async reject(id: number, data: RejectTransferRequest): Promise<MemberTransfer> {
    const response = await this.http.put<MemberTransfer>(
      `/transfer/${id}/reject`,
      data as unknown as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Cancel transfer request
   */
  async cancel(id: number): Promise<void> {
    await this.http.delete(`/transfer/${id}`);
  }
}

export default new TransferService();
