import { ColorValue } from 'react-native';

type GradientColors = readonly [ColorValue, ColorValue, ...ColorValue[]];

type CategoryUI = {
  colors: GradientColors;
  icon: string;
  label?: string;
};

export const CATEGORY_UI_MAP: Record<string, CategoryUI> = {
  // Sách & Tài liệu học tập
  'd1052a21-5b27-4f97-bff5-72449df1c7e5': {
    colors: ['#FFD84D', '#FFB703'],
    icon: 'book-outline',
    label: 'Sách & Tài liệu',
  },

  // Đồ dùng học tập / Văn phòng phẩm
  '57b7553e-e9f8-417d-933a-1eeb9faed6ef': {
    colors: ['#A0E7E5', '#4ECDC4'],
    icon: 'pencil-outline',
    label: 'Đồ dùng học tập/Văn phòng phẩm',
  },

  // Thiết bị Điện tử
  '1652de72-58da-4117-af6e-4702028cdd67': {
    colors: ['#4158D0', '#C850C0'],
    icon: 'laptop-outline',
    label: 'Điện tử',
  },

  // Đồ Gia dụng & Thiết bị khác xí
  '4448261e-5985-4eb6-a0a5-20c5964ade77': {
    colors: ['#FF9A8B', '#FF6A88'],
    icon: 'home-outline',
    label: 'Gia dụng & Ký túc xá',
  },

  // Quần áo & Phụ kiện
  '65c8f363-dd99-4118-b85c-8dc1b51be67d': {
    colors: ['#74E272', '#4CAF50'],
    icon: 'shirt-outline',
    label: 'Quần áo & Phụ kiện',
  },

  // Dịch vụ & Khác
  'c4ae4f0c-fa95-4a08-810f-7577c8552c03': {
    colors: ['#B7B7FF', '#8B8BFF'],
    icon: 'briefcase-outline',
    label: 'Dịch vụ & Khác',
  }
};

type CategoryOption = {
  id: string;
  label: string;
  icon: string;
  colors: GradientColors;
};

export const CATEGORY_OPTIONS: CategoryOption[] = Object.entries(
  CATEGORY_UI_MAP,
).map(([id, ui]) => ({
  id,
  label: ui.label ?? 'Unknown',
  icon: ui.icon,
  colors: ui.colors,
}));
