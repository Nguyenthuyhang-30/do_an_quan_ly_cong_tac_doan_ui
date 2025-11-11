import { BaseService } from './base.service';
import { BasePaginatedResponse } from '@base/models/basePaginated';
import {
  YouthUnionMember,
  CreateMemberRequest,
  UpdateMemberRequest,
  UpdateMemberStatusRequest,
  MemberListParams,
  MemberStatistics,
  MemberSelectOption,
} from '../../types/youth-union-member';
import { Activity } from '../../types/activity';

/**
 * Youth Union Member Service
 */
class MemberService extends BaseService<
  YouthUnionMember,
  CreateMemberRequest,
  UpdateMemberRequest
> {
  constructor() {
    super('member');
  }

  /**
   * Get members for dropdown/select
   */
  async getSelect(): Promise<MemberSelectOption[]> {
    const response = await this.http.get<MemberSelectOption[]>('/member/get-select');
    return response.data;
  }

  /**
   * Search members with advanced filters
   */
  async searchMembers(params: MemberListParams): Promise<BasePaginatedResponse<YouthUnionMember>> {
    return this.http.getPaginated<YouthUnionMember>(
      '/member/search',
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Get member statistics
   */
  async getMemberStatistics(): Promise<MemberStatistics> {
    const response = await this.http.get<MemberStatistics>('/member/statistics');
    return response.data;
  }

  /**
   * Get members by branch
   */
  async getByBranch(
    branchId: number,
    params?: MemberListParams,
  ): Promise<BasePaginatedResponse<YouthUnionMember>> {
    return this.http.getPaginated<YouthUnionMember>(
      `/member/branch/${branchId}`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Get member full profile
   */
  async getProfile(id: number): Promise<YouthUnionMember> {
    const response = await this.http.get<YouthUnionMember>(`/member/${id}/profile`);
    return response.data;
  }

  /**
   * Get member activity history
   */
  async getActivityHistory(
    id: number,
    params?: { page?: number; limit?: number },
  ): Promise<BasePaginatedResponse<Activity>> {
    return this.http.getPaginated<Activity>(
      `/member/${id}/activities`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Update member status
   */
  async updateStatus(id: number, data: UpdateMemberStatusRequest): Promise<YouthUnionMember> {
    const response = await this.http.put<YouthUnionMember>(
      `/member/${id}/status`,
      data as unknown as Record<string, unknown>,
    );
    return response.data;
  }
}

export default new MemberService();
