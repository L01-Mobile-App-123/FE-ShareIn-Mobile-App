import React from 'react';
import { FlatList, View } from 'react-native';
import PostItem, { Post } from './PostItem';

export const mockPosts: Post[] = [
  {
    user_id: 'f7ff90bf-2ba7-4a53-bfb7-f745bc5def2d',
    authorName: 'Gia Nguyên',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    timestamp: '13 hrs ago',
    location: 'HCM City',
    tag: 'Give away',
    rating: 4,
    content:
      'Mình có cái nồi cơm điện Sharp 1.8L, mua tầm 2 năm rồi, vẫn dùng tốt, cơm chín đều, chỉ có vỏ ngoài hơi trầy chút. Giờ mình đổi sang nồi mới nên cái này dư ra, bạn nào cần thì mình để lại, ai ở gần thì tiện ghé lấy nha.hh',
    images: [
      'https://picsum.photos/200/300',
      'https://picsum.photos/300/300',
      'https://picsum.photos/400/300',
    ],
    likesCount: 12,
  },
  {
    user_id: '33c447ad-2b23-4b43-b74a-af87f58a38af',
    authorName: 'Gia Nguyên',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    timestamp: '2 days ago',
    location: 'HCM City',
    tag: 'Give away',
    rating: 5,
    content: 'Còn một chiếc ghế cũ ai cần thì qua lấy nhé!',
    images: [
      'https://picsum.photos/id/1011/300/400',
      'https://picsum.photos/id/1012/300/300',
      'https://picsum.photos/id/1013/400/300',
      'https://picsum.photos/id/1015/500/400',
      'https://picsum.photos/id/1016/350/350',
      'https://picsum.photos/id/1020/300/450',
      'https://picsum.photos/id/1024/400/400',
      'https://picsum.photos/id/1025/300/300',
      'https://picsum.photos/id/1027/450/300',
      'https://picsum.photos/id/1031/400/500',
      'https://picsum.photos/id/1033/350/400',
      'https://picsum.photos/id/1035/300/300',
      'https://picsum.photos/id/1037/400/350',
      'https://picsum.photos/id/1040/500/300',
      'https://picsum.photos/id/1043/400/400',
    ],
    likesCount: 5,
  },
  {
    user_id: '49060eb4-9641-4fd3-af07-f7884e2aee5a',
    authorName: 'Gia Nguyên',
    avatarUrl: 'https://picsum.photos/seed/user29/200/200',
    timestamp: '2 days ago',
    location: 'HCM City',
    tag: 'Give away',
    rating: 3,
    content: 'Còn một chiếc ghế cũ ai cần thì qua lấy nhé!',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/300',
    ],
    likesCount: 2,
  },
];

export default function PostList() {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <FlatList
        data={mockPosts}
        keyExtractor={(item) => item.user_id}
        renderItem={({ item }) => <PostItem item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40, // tránh trùng với tab bar nếu cần
        }}
      />
    </View>
  );
}
