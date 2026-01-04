import ApiClient, { cleanPayload } from '@/config/api';
import analytics from '@react-native-firebase/analytics';

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
  async search<T = any>(params: SearchParams): Promise<SearchResponse<T>> {
    analytics().logSearch({ search_term: params.keyword || '' });
    const res = await ApiClient.get(
      '/api/v1/search',
      cleanPayload({
        keyword: params.keyword,
        transactionType: params.transactionType,
        categoryId: params.categoryId,
        timeRange: params.timeRange,
        sortBy: params.sortBy,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        page: params.page,
        limit: params.limit,
      }),
    );

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
