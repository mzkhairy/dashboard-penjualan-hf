export interface CategoriesResponse {
  data: string[];
}

export interface DateRange {
  start: string;
  end: string;
}

export interface NumericRange {
  min: number;
  max: number;
}

export interface HealthResponse {
  status: string;
  version: string;
  datasetLoaded: boolean;
  totalRecords: number;
}

export interface MetadataResponse {
  totalRecords: number;
  availableSortFields: string[];
  availableGenders: string[];
  availableCategories: string[];
  dateRange: DateRange;
  ageRange: NumericRange;
  quantityRange: NumericRange;
  pricePerUnitRange: NumericRange;
  totalAmountRange: NumericRange;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface Sale {
  transactionId: number;
  date: string;
  customerId: string;
  gender: string;
  age: number;
  productCategory: string;
  quantity: number;
  pricePerUnit: number;
  totalAmount: number;
}

export interface SalesFilters {
  search?: string | null;
  category?: string | null;
  gender?: string | null;
  customerId?: string | null;
  transactionId?: number | null;
  dateFrom?: string | null;
  dateTo?: string | null;
  ageMin?: number | null;
  ageMax?: number | null;
  quantityMin?: number | null;
  quantityMax?: number | null;
  pricePerUnitMin?: number | null;
  pricePerUnitMax?: number | null;
  totalAmountMin?: number | null;
  totalAmountMax?: number | null;
  sortBy?: string;
  sortOrder?: string; // 'asc' | 'desc'
}

export interface SalesListResponse {
  data: Sale[];
  pagination: PaginationMeta;
  filters: SalesFilters;
}

export interface SummaryResponse {
  totalTransactions: number;
  totalRevenue: number;
  averageOrderValue: number;
  totalItemsSold: number;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}