export interface WrapResponse<T> {
  status?: string;
  statusCode?: number;
  data?: T;
  error?: Error;
}
