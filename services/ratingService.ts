import * as ImagePicker from 'expo-image-picker';
import ApiClient, { cleanPayload } from '../config/api';

export type Rating = {
  rating_id: string;
  rater_id: string;
  rated_user_id: string;
  rating_score: number;
  comment?: string;
  proof_image_urls: string[];
  created_at: string;
};

export type CreateRatingDto = {
  rated_user_id: string;
  rating_score: number;
  comment?: string;
};

export type UpdateRatingDto = {
  rating_score?: number;
  comment?: string;
};

export type UserRatingStats = {
  total_ratings: number;
  average_score: number;
  range_81_100_count: number;
  range_61_80_count: number;
  range_41_60_count: number;
  range_21_40_count: number;
  range_1_20_count: number;
};

function buildQuery(params?: Record<string, string | number | undefined>) {
  if (!params) return '';
  const q = Object.entries(params).reduce(
    (acc, [k, v]) => {
      if (v !== undefined) acc[k] = String(v);
      return acc;
    },
    {} as Record<string, string>,
  );
  const s = new URLSearchParams(q).toString();
  return s ? `?${s}` : '';
}

export const RatingService = {
  async create(data: CreateRatingDto): Promise<Rating> {
    const res = await ApiClient.post('/api/v1/ratings', cleanPayload(data));
    return res.data;
  },

  async update(ratingId: string, data: UpdateRatingDto): Promise<Rating> {
    const res = await ApiClient.patch(
      `/api/v1/ratings/${ratingId}`,
      cleanPayload(data),
    );
    return res.data;
  },

  async remove(ratingId: string): Promise<void> {
    await ApiClient.delete(`/api/v1/ratings/${ratingId}`);
  },

  async getUserRatings(
    userId: string,
    params?: { page?: number; limit?: number },
  ): Promise<Rating[]> {
    const query = buildQuery(params);
    const res = await ApiClient.get(`/api/v1/ratings/user/${userId}${query}`);
    return res.data.data ?? res.data;
  },

  async getUserStats(userId: string): Promise<UserRatingStats> {
    const res = await ApiClient.get(`/api/v1/ratings/user/${userId}/stats`);
    return res.data;
  },

  async getMyGiven(): Promise<Rating[]> {
    const res = await ApiClient.get('/api/v1/ratings/me/given');
    return res.data.data ?? res.data;
  },

  async getMyReceived(): Promise<Rating[]> {
    const res = await ApiClient.get('/api/v1/ratings/me/received');
    return res.data.data ?? res.data;
  },

  async uploadImages(
    ratingId: string,
    images: ImagePicker.ImagePickerAsset[],
  ): Promise<Rating> {
    const formData = new FormData();

    images.forEach((img) => {
      formData.append('files', {
        uri: img.uri,
        name: 'rating.jpg',
        type: 'image/jpeg',
      } as any);
    });

    const res = await ApiClient.patchFile(
      `/api/v1/ratings/${ratingId}/images`,
      formData,
    );

    return res.data;
  },
};
