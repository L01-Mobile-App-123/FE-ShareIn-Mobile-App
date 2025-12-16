import ApiClient, { cleanPayload, toISODate } from '../config/api';
import * as ImagePicker from 'expo-image-picker';

export type UserProfile = {
  user_id: string;
  email: string;
  full_name: string;
  phone_number: string;
  avatar_url: string;
  school_name: string;
  dormitory: string;
  date_of_birth: string;
  academic_year: number;
  reputation_score: number;
  created_at: string;
};

export function getDefaultAvatar(name?: string) {
  // Dùng tên để avatar cố định cho mỗi user
  const seed = name
    ? encodeURIComponent(name)
    : Math.random().toString(36).substring(7);
  return `https://api.dicebear.com/7.x/initials/png?seed=${seed}`;
}

export const UserService = {
  async login(): Promise<void> {
    return await ApiClient.post('/api/v1/auth/verify');
  },

  async logout(): Promise<void> {
    return await ApiClient.post('/api/v1/auth/log-out');
  },

  async getMe(): Promise<UserProfile> {
    const user = await ApiClient.get('/api/v1/users');

    return {
      ...user.data,
      avatar_url:
        user.data.avatar_url && user.data.avatar_url.trim() !== ''
          ? user.data.avatar_url
          : getDefaultAvatar(user.data.full_name),
    };
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const user = await ApiClient.patch(
      '/api/v1/users',
      cleanPayload({
        full_name: data.full_name, // string | undefined
        phone_number: data.phone_number, // string | undefined
        school_name: data.school_name, // string | undefined
        dormitory: data.dormitory, // string | undefined
        academic_year: data.academic_year, // number | null
        date_of_birth: toISODate(data.date_of_birth), // string | undefined
      }),
    );

    console.log('Updated user:', user.data);

    return {
      ...user.data,
      avatar_url:
        user.data.avatar_url && user.data.avatar_url.trim() !== ''
          ? user.data.avatar_url
          : getDefaultAvatar(user.data.full_name),
    };
  },

  async updateAvatar(image: ImagePicker.ImagePickerAsset): Promise<String> {
    const formData = new FormData();

    formData.append('file', {
      uri: image.uri,
      name: 'avatar.jpg',
      type: 'image/jpeg',
    } as any);

    const res = await ApiClient.patchFile('/api/v1/users/avatar', formData);
    return res.data;
  },
};
