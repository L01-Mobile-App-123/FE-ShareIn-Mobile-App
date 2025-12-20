import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 1. Định nghĩa Interface cho dữ liệu
export interface Post {
  user_id: string;
  authorName: string;
  avatarUrl: string;
  timestamp: string;
  location: string;
  tag: string;
  rating: number;
  content: string;
  images: string[];
  likesCount: number;
}

interface PostItemProps {
  item: Post;
  onLike?: (user_id: string) => void;
  onSave?: (user_id: string) => void;
  onChat?: (user_id: string) => void;
}

export default function PostItem({
  item,
  onLike,
  onSave,
  onChat,
}: PostItemProps) {
  // 1. Thêm state cho nút like và save
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  // 2. Sửa handleLikePress
  const handleLikePress = () => {
    setLiked(!liked);
    onLike?.(item.user_id); // gọi API nếu cần
  };

  // 3. Sửa handleSavePress
  const handleSavePress = () => {
    setSaved(!saved);
    onSave?.(item.user_id); // gọi API nếu cần
  };

  // 4. Sửa handleChatPress
  const handleChatPress = () => {
    onChat?.(item.user_id);
    router.push({
      pathname: '/ChatScreen',
      params: {
        id: item.user_id,
        name: item.authorName,
        avatar: item.avatarUrl,
      },
    });
  };

  return (
    <View style={styles.card}>
      {/* Header: Avatar, Name, Time, Location và Stars */}
      <View style={styles.header}>
        <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />

        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{item.authorName}</Text>
            <Text style={styles.metaText}>
              {item.timestamp} • {item.location}
            </Text>
          </View>

          {/* Phần Rating Stars */}
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= item.rating ? 'star' : 'star-outline'}
                size={20}
                color="black"
              />
            ))}
          </View>
        </View>
      </View>

      {/* Tag: Give away */}
      <View style={styles.tagContainer}>
        <Text style={styles.tagText}>{item.tag}</Text>
      </View>

      {/* Content */}
      <Text style={styles.contentText}>{item.content}</Text>

      {/* Image Grid thay thế cho MasonryList */}
      <View style={styles.imageGrid}>
        {item.images.length > 0 && (
          <View style={styles.imageContainer}>
            {item.images.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                style={[
                  styles.imageItem,
                  { width: item.images.length === 1 ? '100%' : '48.5%' },
                ]}
              />
            ))}
          </View>
        )}
      </View>

      {/* Footer: Like, Chat, Save */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerBtn} onPress={handleLikePress}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={24}
            color={liked ? 'red' : 'black'}
          />
          <Text>{liked ? item.likesCount + 1 : item.likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerBtn} onPress={handleChatPress}>
          <Ionicons name="chatbubble-outline" size={22} color="black" />
          <Text style={styles.footerBtnText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerBtn} onPress={handleSavePress}>
          <Ionicons
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={saved ? 'blue' : 'black'}
          />
          <Text>{saved ? 'Saved' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
  ratingRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  tagContainer: {
    marginTop: 12,
    backgroundColor: '#FFDD57', // Màu vàng giống hình
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  tagText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  contentText: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 22,
    color: '#222',
  },
  imageGrid: {
    marginTop: 12,
    width: '100%',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8, // Khoảng cách giữa các ảnh
  },
  imageItem: {
    height: 200, // Bạn có thể tùy chỉnh chiều cao cố định hoặc dùng aspect ratio
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 8,
  },
  leftColumn: {
    flex: 1,
    gap: 10,
  },
  rightColumn: {
    flex: 1,
  },
  smallImageBox: {
    flex: 1,
    backgroundColor: '#FFA500',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  largeImageBox: {
    flex: 1,
    backgroundColor: '#FFA500',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  placeholderText: {
    color: 'white',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
  },
  footerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  footerBtnText: {
    fontSize: 15,
    color: '#444',
    fontWeight: '500',
  },
});
