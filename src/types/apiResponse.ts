export interface ApiResponse<T> {
  isFinished: boolean;
  code?: number;
  data?: T;
  errors?: string[];
}
