import ApiClient, { cleanPayload } from '../config/api';

/* ========== TYPES ========== */

export type UserSummary = {
  user_id: string;
  full_name: string;
  avatar_url?: string;
};

type Post = {
  post_id: string;
  title: string;
  image_urls: string[];
};

export type Conversation = {
  conversation_id: string;
  post: Post; // thêm post đầy đủ
  partner: {
    user_id: string;
    full_name: string;
    avatar_url?: string;
  };
  last_message_at: string;
  unread_count: number;
};

export type Message = {
  message_id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'location';
  sent_at: string;
  sender: UserSummary;
};

export type FindOrCreateConversationDto = {
  recipient_id: string;
  post_id: string;
};

export type FindOrCreateConversationResponse = {
  conversation_id: string;
  message: string;
};

export type SendMessageDto = {
  conversation_id: string;
  content: string;
  message_type?: 'text' | 'image' | 'location';
};

export type PaginatedMessages = {
  data: Message[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type CompleteTransactionDto = {
  final_price: number;
  notes?: string;
};

export type CompleteTransactionResponse = {
  conversation_id: string;
  status: string;
  completed_at: string;
  message: string;
};

/* ========== SERVICE ========== */

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

export const ConversationService = {
  async findOrCreate(
    data: FindOrCreateConversationDto,
  ): Promise<FindOrCreateConversationResponse> {
    try {
      const res = await ApiClient.post(
        '/api/v1/conversations',
        cleanPayload(data),
      );
      return res.data;
    } catch (e) {
      console.log('findOrCreate error:', e);
      throw e;
    }
  },

  async getAll(): Promise<Conversation[]> {
    const res = await ApiClient.get('/api/v1/conversations');
    const raw = res.data.data ?? res.data;

    return raw.map((c: any) => ({
      ...c,
      post: {
        ...c.post,
        image_urls: c.post.image_urls ?? [],
      } as Post,
    }));
  },

  async getMessages(params: {
    conversationId: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedMessages> {
    const { conversationId, page, limit } = params;
    const query = buildQuery({ page, limit });
    const res = await ApiClient.get(
      `/api/v1/conversations/${conversationId}/messages${query}`,
    );
    console.log('getMessages raw:', JSON.stringify(res.data, null, 2));
    return res.data;
  },

  async sendMessage(data: SendMessageDto): Promise<Message> {
    const res = await ApiClient.post(
      '/api/v1/conversations/messages',
      cleanPayload(data),
    );
    return res.data;
  },

  async markAsRead(conversationId: string): Promise<void> {
    await ApiClient.patch(`/api/v1/conversations/${conversationId}/read`);
  },

  async completeTransaction(
    conversationId: string,
    data: CompleteTransactionDto,
  ): Promise<CompleteTransactionResponse> {
    const res = await ApiClient.post(
      `/api/v1/conversations/${conversationId}/complete-transaction`,
      cleanPayload(data),
    );
    return res.data;
  },
};
