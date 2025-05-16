export interface debounceInterface {
  value: string;
  delay: number;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface DataPaginate<T> {
  entries: T[];
  page_info: PaginationData;
}

export interface PaginationData {
  page: number;
  limit: number;
  total_row: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface Links {
  prev: string | null;
  next: string | null;
}
