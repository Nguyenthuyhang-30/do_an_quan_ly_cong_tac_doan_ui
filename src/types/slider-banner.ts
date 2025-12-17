import type { BaseResponse, BasePaginated } from '../base/models/base';

// Slider Banner Entity
export interface SliderBanner {
  id: number;
  code: string;
  name: string;
  image: string;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Request Types
export interface CreateSliderBannerRequest {
  code: string;
  name: string;
  image: string;
  order?: number;
}

export interface UpdateSliderBannerRequest {
  code?: string;
  name?: string;
  image?: string;
  order?: number;
  isActive?: boolean;
}

export interface UpdateSliderImageRequest {
  imageUrl: string;
}

export interface UpdateSliderOrderRequest {
  orderData: Array<{
    id: number;
    order: number;
  }>;
}

export interface DeleteManyRequest {
  ids: number[];
}

// Query Parameters
export interface SliderBannerListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface SliderBannerSearchParams extends SliderBannerListParams {
  hasImage?: boolean;
  dateFrom?: string;
  dateTo?: string;
  isActive?: boolean;
}

export interface SliderHomeParams {
  limit?: number;
}

// Response Types
export interface SliderBannerResponse extends BaseResponse<SliderBanner> {}

export interface SliderBannerListResponse extends BasePaginated<SliderBanner> {}

export interface SliderBannerSelectOption {
  id: number;
  code: string;
  name: string;
}

export interface SliderBannerStatistics {
  totalSliders: number;
  activeSliders: number;
  inactiveSliders: number;
  slidersWithImage: number;
  slidersWithoutImage: number;
  averageOrder?: number;
}

// Form Values
export interface SliderBannerFormValues {
  code: string;
  name: string;
  image: string;
  order?: number;
  isActive?: boolean;
}
