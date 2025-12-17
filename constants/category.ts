import { ColorValue } from 'react-native';

type GradientColors = readonly [ColorValue, ColorValue, ...ColorValue[]];

type CategoryUI = {
  colors: GradientColors;
  icon: string;
  label?: string;
};

export const CATEGORY_UI_MAP: Record<string, CategoryUI> = {
  // Sách & Tài liệu học tập
  '06490d65-ca73-435d-854a-baad9c4cfc1d': {
    colors: ['#FFD84D', '#FFB703'],
    icon: 'book-outline',
    label: 'Sách & Tài liệu',
  },

  // Đồ dùng học tập / Văn phòng phẩm
  'db88df79-22c9-4424-9b70-4d46a32ee275': {
    colors: ['#A0E7E5', '#4ECDC4'],
    icon: 'pencil-outline',
    label: 'Văn phòng phẩm',
  },

  // Thiết bị Điện tử
  '8e948542-70c9-41eb-adf5-e5b05687583c': {
    colors: ['#4158D0', '#C850C0'],
    icon: 'laptop-outline',
    label: 'Điện tử',
  },

  // Đồ Gia dụng & Thiết bị khác xí
  '5f0f76fd-ee82-42c0-b812-327de73acf61': {
    colors: ['#FF9A8B', '#FF6A88'],
    icon: 'home-outline',
    label: 'Gia dụng & Khác',
  },

  // Quần áo & Phụ kiện
  'cf2c9eef-50d4-4653-aa29-901f2c131609': {
    colors: ['#74E272', '#4CAF50'],
    icon: 'shirt-outline',
    label: 'Quần áo & Phụ kiện',
  },

  // Dịch vụ & Khác
  'ba9d9e6c-50ad-4930-8c69-7beff715b147': {
    colors: ['#B7B7FF', '#8B8BFF'],
    icon: 'briefcase-outline',
    label: 'Dịch vụ & Khác',
  },

  // Electronics (dự phòng tiếng Anh)
  '11111111-1111-1111-1111-111111111111': {
    colors: ['#4158D0', '#C850C0'],
    icon: 'laptop-outline',
    label: 'Electronics',
  },

  // Books (dự phòng tiếng Anh)
  '22222222-2222-2222-2222-222222222222': {
    colors: ['#FFD84D', '#FFB703'],
    icon: 'book-outline',
    label: 'Books',
  },

  // Furniture (dự phòng tiếng Anh)
  '33333333-3333-3333-3333-333333333333': {
    colors: ['#FF9A8B', '#FF6A88'],
    icon: 'bed-outline',
    label: 'Furniture',
  },

  // Clothing (dự phòng tiếng Anh)
  '44444444-4444-4444-4444-444444444444': {
    colors: ['#74E272', '#4CAF50'],
    icon: 'shirt-outline',
    label: 'Clothing',
  },

  // Misc (dự phòng tiếng Anh)
  '55555555-5555-5555-5555-555555555555': {
    colors: ['#B7B7FF', '#8B8BFF'],
    icon: 'apps-outline',
    label: 'Misc',
  },
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
