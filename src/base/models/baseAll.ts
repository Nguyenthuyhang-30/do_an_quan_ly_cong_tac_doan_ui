export interface BasePaginatedResponse<T> {
  code: number;
  success: boolean;
  message: string;
  data: T[];
}
