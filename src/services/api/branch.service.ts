import { BaseService } from './base.service';
import { BasePaginatedResponse } from '@base/models/basePaginated';
import {
  YouthUnionBranch,
  CreateBranchRequest,
  UpdateBranchRequest,
  BranchStatistics,
  BranchSelectOption,
} from '../../app-types/youth-union-branch';
import { YouthUnionMember } from '../../app-types/youth-union-member';

/**
 * Youth Union Branch Service
 */
class BranchService extends BaseService<
  YouthUnionBranch,
  CreateBranchRequest,
  UpdateBranchRequest
> {
  constructor() {
    super('youth-union-branch');
  }

  /**
   * Get branches for dropdown/select
   */
  async getSelect(): Promise<BranchSelectOption[]> {
    const response = await this.http.get<BranchSelectOption[]>('/youth-union-branch/get-select');
    return response.data;
  }

  /**
   * Get branch statistics
   */
  async getBranchStatistics(): Promise<BranchStatistics> {
    const response = await this.http.get<BranchStatistics>('/youth-union-branch/statistics');
    return response.data;
  }

  /**
   * Get members by branch
   */
  async getMembersByBranch(
    branchId: number,
    params?: { page?: number; limit?: number },
  ): Promise<BasePaginatedResponse<YouthUnionMember>> {
    return this.http.getPaginated<YouthUnionMember>(
      `/youth-union-branch/${branchId}/members`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }
}

export default new BranchService();
