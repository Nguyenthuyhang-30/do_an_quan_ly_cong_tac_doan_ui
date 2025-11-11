import { BaseService } from './base.service';
import { BasePaginatedResponse } from '@base/models/basePaginated';
import {
  MemberReview,
  CreateReviewRequest,
  UpdateReviewRequest,
  UpdateReviewPointRequest,
  BatchCreateReviewRequest,
  MemberTotalPoints,
  MemberReviewHistory,
  ReviewStatistics,
  ReviewListParams,
  ReviewSelectOption,
} from '../../types/member-review';

/**
 * Member Review Service
 */
class ReviewService extends BaseService<MemberReview, CreateReviewRequest, UpdateReviewRequest> {
  constructor() {
    super('member-review');
  }

  /**
   * Get reviews for dropdown/select
   */
  async getSelect(): Promise<ReviewSelectOption[]> {
    const response = await this.http.get<ReviewSelectOption[]>('/member-review/get-select');
    return response.data;
  }

  /**
   * Search reviews with advanced filters
   */
  async searchReviews(params: ReviewListParams): Promise<BasePaginatedResponse<MemberReview>> {
    return this.http.getPaginated<MemberReview>(
      '/member-review/search',
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Get review statistics
   */
  async getReviewStatistics(): Promise<ReviewStatistics> {
    const response = await this.http.get<ReviewStatistics>('/member-review/statistics');
    return response.data;
  }

  /**
   * Get reviews by member
   */
  async getByMember(
    memberId: number,
    params?: { page?: number; limit?: number },
  ): Promise<BasePaginatedResponse<MemberReview>> {
    return this.http.getPaginated<MemberReview>(
      `/member-review/member/${memberId}`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Get member total points
   */
  async getMemberTotalPoints(memberId: number): Promise<MemberTotalPoints> {
    const response = await this.http.get<MemberTotalPoints>(
      `/member-review/member/${memberId}/total-points`,
    );
    return response.data;
  }

  /**
   * Get member review history
   */
  async getMemberHistory(
    memberId: number,
    year?: number,
    month?: number,
  ): Promise<MemberReviewHistory> {
    const params: Record<string, string | number | boolean | null | undefined> = {};
    if (year !== undefined) params.year = year;
    if (month !== undefined) params.month = month;

    const response = await this.http.get<MemberReviewHistory>(
      `/member-review/member/${memberId}/history`,
      params,
    );
    return response.data;
  }

  /**
   * Get reviews by type
   */
  async getByType(
    type: string,
    params?: ReviewListParams,
  ): Promise<BasePaginatedResponse<MemberReview>> {
    return this.http.getPaginated<MemberReview>(
      `/member-review/type/${type}`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Create multiple reviews in batch
   */
  async batchCreate(data: BatchCreateReviewRequest): Promise<MemberReview[]> {
    const response = await this.http.post<MemberReview[]>(
      '/member-review/batch',
      data as unknown as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Update review point only
   */
  async updatePoint(id: number, data: UpdateReviewPointRequest): Promise<MemberReview> {
    const response = await this.http.put<MemberReview>(
      `/member-review/${id}/point`,
      data as unknown as Record<string, unknown>,
    );
    return response.data;
  }
}

export default new ReviewService();
