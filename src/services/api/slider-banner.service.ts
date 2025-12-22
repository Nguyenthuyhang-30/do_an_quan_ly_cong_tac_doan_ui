import axiosInstance from '../../base/interceptors/axios.instance';
import type {
  SliderBanner,
  CreateSliderBannerRequest,
  UpdateSliderBannerRequest,
  UpdateSliderImageRequest,
  UpdateSliderOrderRequest,
  DeleteManyRequest,
  SliderBannerListParams,
  SliderBannerSearchParams,
  SliderHomeParams,
  SliderBannerResponse,
  SliderBannerListResponse,
  SliderBannerSelectOption,
  SliderBannerStatistics,
} from '../../app-types/slider-banner';
import type { BaseResponse } from '../../base/models/base';

/**
 * Slider Banner Service
 * Handles all slider banner API operations
 */
class SliderBannerService {
  private readonly BASE_URL = '/slider-banner';

  /**
   * Get all slider banners (no pagination)
   */
  async getAll(): Promise<SliderBanner[]> {
    const response = await axiosInstance.get<BaseResponse<SliderBanner[]>>(
      `${this.BASE_URL}/get-all`,
    );
    return response.data.data;
  }

  /**
   * Get paginated list of slider banners
   */
  async getList(params?: SliderBannerListParams): Promise<SliderBannerListResponse> {
    const response = await axiosInstance.get<SliderBannerListResponse>(
      `${this.BASE_URL}/get-list`,
      { params },
    );
    return response.data;
  }

  /**
   * Get slider banners for select/dropdown
   */
  async getSelect(): Promise<SliderBannerSelectOption[]> {
    const response = await axiosInstance.get<BaseResponse<SliderBannerSelectOption[]>>(
      `${this.BASE_URL}/get-select`,
    );
    return response.data.data;
  }

  /**
   * Get sliders for home page
   */
  async getHomeSliders(params?: SliderHomeParams): Promise<SliderBanner[]> {
    const response = await axiosInstance.get<BaseResponse<SliderBanner[]>>(
      `${this.BASE_URL}/home`,
      { params },
    );
    return response.data.data;
  }

  /**
   * Search slider banners with advanced filters
   */
  async search(params: SliderBannerSearchParams): Promise<SliderBannerListResponse> {
    const response = await axiosInstance.get<SliderBannerListResponse>(`${this.BASE_URL}/search`, {
      params,
    });
    return response.data;
  }

  /**
   * Get slider banner statistics
   */
  async getStatistics(): Promise<SliderBannerStatistics> {
    const response = await axiosInstance.get<BaseResponse<SliderBannerStatistics>>(
      `${this.BASE_URL}/statistics`,
    );
    return response.data.data;
  }

  /**
   * Get slider banner by ID
   */
  async getById(id: number): Promise<SliderBanner> {
    const response = await axiosInstance.get<SliderBannerResponse>(`${this.BASE_URL}/${id}`);
    return response.data.data;
  }

  /**
   * Create new slider banner
   */
  async create(data: CreateSliderBannerRequest): Promise<SliderBanner> {
    const response = await axiosInstance.post<SliderBannerResponse>(this.BASE_URL, data);
    return response.data.data;
  }

  /**
   * Update slider banner
   */
  async update(id: number, data: UpdateSliderBannerRequest): Promise<SliderBanner> {
    const response = await axiosInstance.put<SliderBannerResponse>(`${this.BASE_URL}/${id}`, data);
    return response.data.data;
  }

  /**
   * Update slider banner image only
   */
  async updateImage(id: number, data: UpdateSliderImageRequest): Promise<SliderBanner> {
    const response = await axiosInstance.put<SliderBannerResponse>(
      `${this.BASE_URL}/${id}/image`,
      data,
    );
    return response.data.data;
  }

  /**
   * Update slider banners order
   */
  async updateOrder(data: UpdateSliderOrderRequest): Promise<void> {
    await axiosInstance.put(`${this.BASE_URL}/order`, data);
  }

  /**
   * Delete slider banner by ID
   */
  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`${this.BASE_URL}/${id}`);
  }

  /**
   * Delete many slider banners
   */
  async deleteMany(data: DeleteManyRequest): Promise<void> {
    await axiosInstance.delete(this.BASE_URL, { data });
  }
}

export const sliderBannerService = new SliderBannerService();
export default sliderBannerService;
