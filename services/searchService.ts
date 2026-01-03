import ApiClient from "@/config/api";

export interface SearchParams {
  keyword?: string;
  transactionType?: string;
  categoryId?: string;
  timeRange?: string;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface SearchResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  has_results: boolean;
}

export const SearchService = {
  async search<T = any>(
    params: SearchParams,
  ): Promise<SearchResponse<T>> {
    const res = await ApiClient.get('/api/v1/search', {
      keyword: params.keyword,
      transaction_type: params.transactionType,
      category_id: params.categoryId,
      time_range: params.timeRange,
      sort_by: params.sortBy,
      min_price: params.minPrice,
      max_price: params.maxPrice,
      page: params.page,
      limit: params.limit,
    });

    return res.data;
  },

  async getSearchHistory(): Promise<string[]> {
    const res = await ApiClient.get('/api/v1/search/history');
    return res.data;
  },

  async getSuggestions(keyword: string): Promise<string[]> {
    const res = await ApiClient.get('/api/v1/search/suggestions', {
      keyword: keyword,
    });

    return res.data;
  },
};
