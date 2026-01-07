import analytics from '@react-native-firebase/analytics';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import { Text } from 'react-native';
import PostItem, { Post } from '../components/home/PostItem';
import { PostService } from '../services/postService';

// Mock các service
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

// Mock PostService
jest.mock('../services/postService', () => ({
  PostService: {
    like: jest.fn().mockResolvedValue({}),
    unlike: jest.fn().mockResolvedValue({}),
    save: jest.fn().mockResolvedValue({}),
    unsave: jest.fn().mockResolvedValue({}),
  },
}));

// Mock analytics
const mockLogEvent = jest.fn();
jest.mock('@react-native-firebase/analytics', () => () => ({
  logEvent: mockLogEvent,
}));

describe('PostItem', () => {
  const fakeRouterPush = jest.fn();

  const fakePost: Post = {
    post_id: '1',
    user_id: 'user1',
    authorName: 'Alice',
    avatarUrl: 'https://avatar.com/alice.png',
    timestamp: '2026-01-07',
    location: 'Hanoi',
    tag: 'BAN_RE',
    rating: 4,
    content: 'This is a test post',
    images: ['https://img.com/1.png', 'https://img.com/2.png'],
    likesCount: 10,
    price: 100000,
    status: true,
    is_available: true,
    is_liked: false,
    is_saved: false,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: fakeRouterPush });
    jest.clearAllMocks();
  });

  it('renders post info correctly', () => {
    const { getByText, getAllByTestId } = render(
      <PostItem item={fakePost} />
    );

    // Kiểm tra tên tác giả, nội dung
    expect(getByText('Alice')).toBeTruthy();
    expect(getByText('This is a test post')).toBeTruthy();

    // Kiểm tra tag
    expect(getByText('Sell')).toBeTruthy();

    // // Kiểm tra rating stars
    // const stars = getAllByTestId('star-icon');
    // expect(stars.length).toBe(5);

    // Kiểm tra giá min-max
    expect(getByText(/80\.000 - 120\.000/)).toBeTruthy();
  });

  it('handles like press', async () => {
    (PostService.like as jest.Mock).mockResolvedValue({});
    const { getByText } = render(<PostItem item={fakePost} />);

    const likeBtn = getByText('10').parent;
    fireEvent.press(likeBtn!);

    await waitFor(() => {
      expect(PostService.like).toHaveBeenCalledWith(fakePost.post_id);
      expect(analytics().logEvent).toHaveBeenCalledWith('like_post', {
        post_id: fakePost.post_id,
      });
    });
  });

  it('handles save press', async () => {
    (PostService.save as jest.Mock).mockResolvedValue({});
    const { getByText } = render(<PostItem item={fakePost} />);

    const saveBtn = getByText('Save').parent;
    fireEvent.press(saveBtn!);

    await waitFor(() => {
      expect(PostService.save).toHaveBeenCalledWith(fakePost.post_id);
      expect(analytics().logEvent).toHaveBeenCalledWith('save_post', {
        post_id: fakePost.post_id,
      });
    });
  });

  it('handles chat press', () => {
    const onChat = jest.fn();
    const { getByText } = render(<PostItem item={fakePost} onChat={onChat} />);

    const chatBtn = getByText('Chat').parent;
    fireEvent.press(chatBtn!);

    expect(onChat).toHaveBeenCalledWith(fakePost.user_id);
    expect(analytics().logEvent).toHaveBeenCalledWith('initiate_chat', {
      user_id: fakePost.user_id,
    });
    expect(fakeRouterPush).toHaveBeenCalledWith({
      pathname: '/ChatScreen',
      params: expect.objectContaining({
        userId: fakePost.user_id,
      }),
    });
  });
});
