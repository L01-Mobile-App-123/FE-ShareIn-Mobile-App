// Chặn toàn bộ Expo runtime (winter)
jest.mock('expo', () => ({}));
jest.mock('expo-modules-core', () => ({}));
jest.mock('expo-font', () => ({}));
jest.mock('expo-linear-gradient', () => 'LinearGradient');

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('expo-constants', () => ({
  manifest: {
    releaseChannel: 'test',
  },
}));

jest.mock('@/services/userInterestService', () => ({
  UserInterestService: {
    getCategories: jest.fn().mockResolvedValue([]),
    addInterest: jest.fn().mockResolvedValue(true),
  },
}));

jest.mock('react-native-dropdown-picker', () => {
  const React = require('react');
  const { View, Text, Pressable } = require('react-native');

  return {
    __esModule: true,
    default: ({ items, setValue }) => (
      <View>
        <Pressable onPress={() => setValue('food')}>
          <Text>Select category</Text>
        </Pressable>
        {items?.map((i) => (
          <Text key={i.value}>{i.label}</Text>
        ))}
      </View>
    ),
  };
});

jest.mock('@/services/userInterestService', () => ({
  UserInterestService: {
    addUserInterest: jest.fn(),
  },
}));

jest.mock('@/constants/category', () => ({
  CATEGORY_OPTIONS: [
    { id: 'tech', label: 'Tech', icon: 'ios-flask', colors: ['#000', '#fff'] },
  ],
  CATEGORY_UI_MAP: {
    tech: { label: 'Tech', icon: 'ios-flask', colors: ['#000', '#fff'] },
  },
}));

jest.mock('@/services/userInterestService', () => ({
  UserInterestService: {
    addUserInterest: jest.fn(),
  },
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }) => <>{children}</>,
}));