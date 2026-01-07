import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import HomeHeader from '../components/home/HomeHeader';
import { UserService } from '@/services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@/services/userService', () => ({
  UserService: { getMe: jest.fn() },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('expo-router', () => ({ useRouter: () => ({ push: mockPush }) }));

jest.mock('@expo/vector-icons', () => ({ Ionicons: () => null }));

describe('HomeHeader', () => {
  const fakeUser = {
    uid: '123',
    displayName: 'John Doe',
    email: 'john@example.com',
    avatar_url: 'https://example.com/avatar.png',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing while loading', async () => {
    (UserService.getMe as jest.Mock).mockResolvedValue(fakeUser);

    const { queryByTestId, queryByText } = render(<HomeHeader />);

    // loading → avatar và text chưa render
    expect(queryByTestId('user-avatar')).toBeNull();
    expect(queryByText('What do you want to do today?')).toBeNull();
  });

  it('renders avatar and text after loadUser', async () => {
    (UserService.getMe as jest.Mock).mockResolvedValue(fakeUser);

    const { getByTestId, getByText } = render(<HomeHeader />);

    await waitFor(() => expect(getByTestId('user-avatar')).toBeTruthy());

    const avatar = getByTestId('user-avatar');
    expect(avatar.props.source.uri).toBe(fakeUser.avatar_url);

    const text = getByText('What do you want to do today?');
    fireEvent.press(text);
    expect(mockPush).toHaveBeenCalledWith('/NewPost');
  });

  it('handles loadUser failure gracefully', async () => {
    (UserService.getMe as jest.Mock).mockRejectedValue(new Error('Failed'));

    const { queryByTestId, getByText } = render(<HomeHeader />);

    await waitFor(() => expect(UserService.getMe).toHaveBeenCalled());

    expect(queryByTestId('user-avatar')).toBeNull();
    // Pressable vẫn render dù user load fail
    expect(getByText('What do you want to do today?')).toBeTruthy();
  });
});
