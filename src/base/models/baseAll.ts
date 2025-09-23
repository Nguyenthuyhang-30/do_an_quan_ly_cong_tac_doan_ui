export interface BasePaginatedResponse<T> {
  code: number;
  message: string;
  data: T[];
}
