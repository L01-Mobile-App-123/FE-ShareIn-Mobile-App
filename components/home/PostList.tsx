import React from 'react';
import { FlatList, View } from 'react-native';
import PostItem, { Post } from './PostItem';

const mockPosts: Post[] = [
  {
    id: '1',
    name: 'Gia Nguyên',
    time: '13 hrs ago',
    location: 'HCM City',
    tag: 'Give away',
    content:
      'Mình có cái nồi cơm điện Sharp 1.8L, mua tầm 2 năm rồi, vẫn dùng tốt, cơm chín đều, chỉ có vỏ ngoài hơi trầy chút. Giờ mình đổi sang nồi mới nên cái này dư ra, bạn nào cần thì mình để lại, ai ở gần thì tiện ghé lấy nha.hh',
    images: ['1', '2', '3'],
  },
  {
    id: '2',
    name: 'Gia Nguyên',
    time: '2 days ago',
    location: 'HCM City',
    tag: 'Give away',
    content: 'Còn một chiếc ghế cũ ai cần thì qua lấy nhé!',
    images: ['1', '2', '3'],
  },
  {
    id: '3',
    name: 'Gia Nguyên',
    time: '2 days ago',
    location: 'HCM City',
    tag: 'Give away',
    content: 'Còn một chiếc ghế cũ ai cần thì qua lấy nhé!',
    images: ['1', '2', '3'],
  },
  {
    id: '4',
    name: 'Gia Nguyên',
    time: '2 days ago',
    location: 'HCM City',
    tag: 'Give away',
    content: 'Còn một chiếc ghế cũ ai cần thì qua lấy nhé!',
    images: ['1', '2', '3'],
  },
  {
    id: '5',
    name: 'Gia Nguyên',
    time: '2 days ago',
    location: 'HCM City',
    tag: 'Give away',
    content: 'Còn một chiếc ghế cũ ai cần thì qua lấy nhé!',
    images: ['1', '2', '3'],
  },
  {
    id: '6',
    name: 'Gia Nguyên',
    time: '2 days ago',
    location: 'HCM City',
    tag: 'Give away',
    content: 'Còn một chiếc ghế cũ ai cần thì qua lấy nhé!',
    images: ['1', '2', '3'],
  },
  {
    id: '7',
    name: 'Gia Nguyên',
    time: '2 days ago',
    location: 'HCM City',
    tag: 'Give away',
    content: 'Còn một chiếc ghế cũ ai cần thì qua lấy nhé!',
    images: ['1', '2', '3'],
  },
];

export default function PostList() {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <FlatList
        data={mockPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
