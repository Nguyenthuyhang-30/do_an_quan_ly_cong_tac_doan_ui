export interface BasePaginatedResponse<T> {
  code: number;
  success: boolean;
  message: string;
  data: {
    list: T[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}
