import * as ImagePicker from 'expo-image-picker';
import ApiClient, { cleanPayload } from '../config/api';

export type Category = {
  category_id: string;
  category_name: string;
  description?: string;
};

export type Post = {
  post_id: string;
  category_id: string;
  title: string;
  description: string;
  transaction_type: 'CHO_MIEN_PHI' | 'DOI_DO' | 'BAN_RE';
  price?: number;
  location?: string;
  status: 'draft' | 'posted';
  is_available: boolean;
  view_count: number;
  created_at: string;
  user: any;
  image_urls: string[];
  is_liked: boolean;
  is_saved: boolean;
};

export type CreatePostDto = {
  category_id: string;
  title: string;
  description: string;
  transaction_type: 'CHO_MIEN_PHI' | 'DOI_DO' | 'BAN_RE';
  price?: number;
  location?: string;
  status?: 'draft' | 'posted';
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

export const PostService = {
  async getCategories(): Promise<Category[]> {
    const res = await ApiClient.get('/api/v1/posts/categories');
    return res.data;
  },

  async createPost(data: CreatePostDto): Promise<Post> {
    const res = await ApiClient.post('/api/v1/posts', cleanPayload(data));
    return res.data;
  },

  async createDraft(data: CreatePostDto): Promise<Post> {
    const res = await ApiClient.post('/api/v1/posts/save', cleanPayload(data));
    return res.data;
  },

  async getPosts(params?: {
    category_id?: string;
    page?: number;
    limit?: number;
  }): Promise<Post[]> {
    const query = buildQuery(params);
    const res = await ApiClient.get(`/api/v1/posts${query}`);
    return res.data.data ?? res.data;
  },

  async getMyPosts(params?: {
    page?: number;
    limit?: number;
  }): Promise<Post[]> {
    const query = buildQuery(params);
    const res = await ApiClient.get(`/api/v1/posts/me${query}`);
    return res.data.data ?? res.data;
  },

  async getDrafts(params?: { page?: number; limit?: number }): Promise<Post[]> {
    const query = buildQuery(params);
    const res = await ApiClient.get(`/api/v1/posts/drafts${query}`);
    return res.data.data ?? res.data;
  },

  async getSaved(params?: { page?: number; limit?: number }): Promise<any[]> {
    const query = buildQuery(params);
    const res = await ApiClient.get(`/api/v1/posts/saved${query}`);
    return res.data.data ?? res.data;
  },

  async getPost(postId: string): Promise<Post> {
    const res = await ApiClient.get(`/api/v1/posts/${postId}`);
    return res.data;
  },

  async updatePost(
    postId: string,
    data: Partial<CreatePostDto & { is_available?: boolean }>,
  ): Promise<Post> {
    const res = await ApiClient.patch(
      `/api/v1/posts/${postId}`,
      cleanPayload(data),
    );
    return res.data;
  },

  async repost(
    postId: string,
    data?: { title?: string; description?: string },
  ): Promise<Post> {
    const res = await ApiClient.post(`/api/v1/posts/${postId}/repost`, {
      original_post_id: postId,
      ...data,
    });
    return res.data;
  },

  async uploadImages(postId: string, images: ImagePicker.ImagePickerAsset[]) {
    const formData = new FormData();

    images.forEach((img) => {
      formData.append('files', {
        uri: img.uri,
        name: 'post.jpg',
        type: 'image/jpeg',
      } as any);
    });

    const res = await ApiClient.patchFile(
      `/api/v1/posts/${postId}/images`,
      formData,
    );

    return res.data;
  },

  async like(postId: string): Promise<void> {
    await ApiClient.post(`/api/v1/posts/${postId}/like`);
  },

  async unlike(postId: string): Promise<void> {
    await ApiClient.delete(`/api/v1/posts/${postId}/like`);
  },

  async save(postId: string): Promise<void> {
    await ApiClient.post(`/api/v1/posts/${postId}/save`);
  },

  async unsave(postId: string): Promise<void> {
    await ApiClient.delete(`/api/v1/posts/${postId}/save`);
  },
};
