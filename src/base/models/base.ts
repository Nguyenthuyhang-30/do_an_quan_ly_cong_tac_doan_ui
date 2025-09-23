export interface BaseResponse<T> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}
