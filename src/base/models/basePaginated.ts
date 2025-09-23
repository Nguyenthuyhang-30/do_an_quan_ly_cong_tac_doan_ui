export interface BasePaginatedResponse<T> {
  code: number;
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
