import ApiClient, { cleanPayload } from '@/config/api';

export interface GetNotificationParams {
  page?: number;
  limit?: number;
}

export interface NotificationItem {
  notification_id: string;
  title: string;
  content: string;
  notification_type: 'NEW_POST_IN_INTEREST' | 'POST_SOLD' | 'GENERAL';
  post_id?: string;
  category_id?: string;
  is_read: boolean;
  created_at: string;
}

export const NotificationService = {
  /** Lấy danh sách thông báo */
  async getList<T = any>(params: GetNotificationParams): Promise<T> {
    const res = await ApiClient.get(
      '/api/v1/notification',
      cleanPayload({
        page: params.page,
        limit: params.limit,
      }),
    );

    return res.data.data ?? res.data;
  },

  /** Xoá 1 thông báo */
  async delete(notificationId: string): Promise<any> {
    const res = await ApiClient.delete(
      `/api/v1/notification/${notificationId}`,
    );

    return res.data;
  },

  /** Đánh dấu đã đọc 1 thông báo */
  async markAsRead(
    notificationId: string,
    isRead: boolean = true,
  ): Promise<any> {
    const res = await ApiClient.patch(
      `/api/v1/notification/${notificationId}/read`,
      {
        is_read: isRead,
      },
    );

    return res.data;
  },

  /** Đánh dấu đã đọc tất cả */
  async markAllAsRead(isRead: boolean = true): Promise<any> {
    const res = await ApiClient.patch('/api/v1/notification/read-all', {
      is_read: isRead,
    });

    return res.data;
  },
};
