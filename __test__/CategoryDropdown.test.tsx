import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CategoryDropdown } from '../components/interest/AddInterestCard';
import { CATEGORY_OPTIONS, CATEGORY_UI_MAP } from '@/constants/category';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Mock LinearGradient và Ionicons
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }: any) => <>{children}</>,
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

// Mock category constants
jest.mock('@/constants/category', () => ({
  CATEGORY_OPTIONS: [
    { id: 'tech', label: 'Tech', icon: 'ios-flask', colors: ['#000', '#fff'] },
    { id: 'music', label: 'Music', icon: 'ios-musical-notes', colors: ['#111', '#222'] },
  ],
  CATEGORY_UI_MAP: {
    tech: { label: 'Tech', icon: 'ios-flask', colors: ['#000', '#fff'] },
    music: { label: 'Music', icon: 'ios-musical-notes', colors: ['#111', '#222'] },
  },
}));

describe('CategoryDropdown', () => {
  it('renders placeholder when no category selected', () => {
    const setCategoryId = jest.fn();
    const { getByText } = render(
      <CategoryDropdown categoryId={null} setCategoryId={setCategoryId} />
    );

    expect(getByText('Select category')).toBeTruthy();
    expect(getByText(/Category/)).toBeTruthy(); // label
  });

  it('renders selected category when categoryId is set', () => {
    const setCategoryId = jest.fn();
    const { getByText } = render(
      <CategoryDropdown categoryId="tech" setCategoryId={setCategoryId} />
    );

    expect(getByText('Tech')).toBeTruthy();
  });

  it('calls setCategoryId when option is pressed', () => {
    const setCategoryId = jest.fn();
    const { getByText } = render(
      <CategoryDropdown categoryId={null} setCategoryId={setCategoryId} />
    );

    // Mở modal
    fireEvent.press(getByText('Select category'));

    // Chọn option đầu tiên (tech)
    fireEvent.press(getByText('Tech'));

    expect(setCategoryId).toHaveBeenCalledWith('tech');
  });
});
