// Member Review Types

export type ReviewType =
  | 'khen-thuong'
  | 'ky-luat'
  | 'thi-dua'
  | 'danh-gia-dinh-ky'
  | 'xep-loai'
  | 'khac';

export interface MemberReview {
  id: number;
  memberId: number;
  reviewType: ReviewType;
  title: string;
  description?: string;
  point?: number;
  reviewDate?: string;
  createdBy?: number;
  createdAt?: string;
  updatedAt?: string;
  member?: {
    id: number;
    code: string;
    fullName: string;
    email: string;
  };
}

export interface CreateReviewRequest {
  memberId: number;
  reviewType: ReviewType;
  title: string;
  description?: string;
  point?: number;
  reviewDate?: string;
  createdBy?: number;
}

export type UpdateReviewRequest = Partial<CreateReviewRequest>;

export interface UpdateReviewPointRequest {
  point: number;
}

export interface BatchCreateReviewRequest {
  reviews: CreateReviewRequest[];
}

export interface ReviewListParams {
  page?: number;
  limit?: number;
  memberId?: number;
  reviewType?: ReviewType;
  search?: string;
  minPoint?: number;
  maxPoint?: number;
  dateFrom?: string;
  dateTo?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ReviewSelectOption {
  id: number;
  title: string;
  reviewType: ReviewType;
  point?: number;
}

export interface MemberTotalPoints {
  memberId: number;
  totalPoints: number;
  reviewCount: number;
  averagePoint: string;
  pointsByType: Record<ReviewType, number>;
}

export interface MemberReviewHistory {
  memberId: number;
  year?: number;
  month?: number;
  reviews: MemberReview[];
  totalPoints: number;
}

export interface ReviewStatistics {
  totalReviews: number;
  reviewsByType: Array<{
    reviewType: ReviewType;
    count: number;
  }>;
  averagePointPerMember: number;
  topMembers: Array<{
    memberId: number;
    memberName: string;
    totalPoints: number;
  }>;
}
