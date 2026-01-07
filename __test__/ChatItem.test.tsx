import { PostService } from '@/services/postService';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ChatItem, { ConversationItem } from '../components/chat/ChatItem';

// Mock router
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock PostService
jest.mock('@/services/postService', () => ({
  PostService: {
    getPost: jest.fn(),
  },
}));

// Mock default avatar
jest.mock('@/services/userService', () => ({
  getDefaultAvatar: (name: string) => `https://default.avatar/${name}.png`,
}));

describe('ChatItem', () => {
  const fakeConversation: ConversationItem = {
    conversation_id: 'conv1',
    partner: { user_id: 'u1', full_name: 'Alice', avatar_url: undefined },
    post: { post_id: 'p1' },
    last_message: 'Hello!',
    last_message_at: '2026-01-07',
    unread_count: 2,
  };

  const fakePost = {
    post_id: 'p1',
    location: 'Hanoi',
    transaction_type: 'Sell',
    description: 'This is a test post',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (PostService.getPost as jest.Mock).mockResolvedValue(fakePost);
  });

  it('renders partner name, avatar and unread message', () => {
    const { getByText } = render(<ChatItem item={fakeConversation} />);
    expect(getByText('Alice')).toBeTruthy();
    expect(getByText('New message received')).toBeTruthy();
  });

  it('calls router.push with correct params when main Pressable is clicked', () => {
    const { getByText } = render(<ChatItem item={fakeConversation} />);
    const mainPressable = getByText('Alice').parent; // parent Pressable
    fireEvent.press(mainPressable!);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/ChatScreen',
      params: {
        userId: 'u1',
        user_name: 'Alice',
        avatar: undefined,
        postId: 'p1',
      },
    });
  });

  it('toggles expanded post info when chevron Pressable is clicked', async () => {
    const { queryByText, getByText, getByTestId } = render(<ChatItem item={fakeConversation} />);

    // Ban đầu chưa expanded
    expect(queryByText('Hanoi')).toBeNull();

    // Lấy tất cả Pressable, chevron là Pressable thứ 2 trong component
    const chevron = getByTestId('chevron-pressable');
    fireEvent.press(chevron);

    // Chờ PostService.getPost resolve
    await waitFor(() => {
      expect(getByText('Hanoi')).toBeTruthy();
      expect(getByText('Sell')).toBeTruthy();
      expect(getByText('This is a test post')).toBeTruthy();
    });

    // Collapse
    fireEvent.press(chevron);
    await waitFor(() => {
      expect(queryByText('Hanoi')).toBeNull();
    });
  });
});
