import HttpService from '@services/api/http.service';
import { BaseResponse } from '@base/models/base';
import { BasePaginatedResponse } from '@base/models/basePaginated';
import type {
  Cohort,
  CreateCohortRequest,
  UpdateCohortRequest,
  CohortSelectOption,
  DeleteCohortsRequest,
} from '../../types/general-category/cohort';

export interface CohortListParams {
  page?: number;
  limit?: number;
  search?: string;
}

class CohortService extends HttpService {
  private readonly basePath = '/cohort';

  /**
   * Lấy tất cả cohorts
   */
  async getAll(): Promise<BaseResponse<Cohort[]>> {
    return this.get<Cohort[]>(`${this.basePath}/get-all`);
  }

  /**
   * Lấy danh sách cohorts có phân trang và tìm kiếm
   */
  async getList(params?: CohortListParams): Promise<BasePaginatedResponse<Cohort>> {
    const queryParams = {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      search: params?.search ?? '',
    };
    return this.getPaginated<Cohort>(`${this.basePath}/get-list`, queryParams);
  }

  /**
   * Lấy danh sách cohorts cho dropdown/select
   */
  async getSelect(): Promise<BaseResponse<CohortSelectOption[]>> {
    return this.get<CohortSelectOption[]>(`${this.basePath}/get-select`);
  }

  /**
   * Lấy cohort theo ID
   */
  async getById(id: number): Promise<BaseResponse<Cohort>> {
    return this.get<Cohort>(`${this.basePath}/${id}`);
  }

  /**
   * Tạo mới cohort
   */
  async create(data: CreateCohortRequest): Promise<BaseResponse<Cohort>> {
    return this.post<Cohort>(`${this.basePath}`, data);
  }

  /**
   * Cập nhật cohort theo ID
   */
  async update(id: number, data: UpdateCohortRequest): Promise<BaseResponse<Cohort>> {
    return this.put<Cohort>(`${this.basePath}/${id}`, data);
  }

  /**
   * Xóa cohort theo ID
   */
  async deleteById(id: number): Promise<BaseResponse<void>> {
    return this.delete<BaseResponse<void>>(`${this.basePath}/${id}`);
  }

  /**
   * Xóa nhiều cohorts
   */
  async deleteMany(data: DeleteCohortsRequest): Promise<BaseResponse<void>> {
    return this.delete<BaseResponse<void>>(`${this.basePath}`, {
      config: {
        data: data,
      },
    });
  }
}

// Export singleton instance
export const cohortService = new CohortService();
export default cohortService;
