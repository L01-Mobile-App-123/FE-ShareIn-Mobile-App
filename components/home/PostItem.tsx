import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PostService } from './../../services/postService';
import analytics from '@react-native-firebase/analytics';

// 1. Định nghĩa Interface cho dữ liệu
export interface Post {
  post_id: string;
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
  price?: number;
  status: boolean;
  is_available: boolean;
  is_liked: boolean;
  is_saved: boolean;
}

interface PostItemProps {
  item: Post;
  saved?: boolean;
  onChat?: (user_id: string) => void;
  editable?: boolean;
  feedback?: boolean;
}

export default function PostItem({
  item,
  onChat,
  editable,
  feedback,
}: PostItemProps) {
  const [liked, setLiked] = useState(item.is_liked === true);
  const [saved, setSaved] = useState(item.is_saved === true);

  React.useEffect(() => {
    setLiked(item.is_liked === true);
    setSaved(item.is_saved === true);
  }, [item.is_liked, item.is_saved]);

  const router = useRouter();

  const handleLikePress = async () => {
    try {
      if (!liked) {
        await PostService.like(item.post_id);
        analytics().logEvent('like_post', { post_id: item.post_id });
        setLiked(true);
      } else {
        await PostService.unlike(item.post_id);
        setLiked(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSavePress = async () => {
    try {
      if (!saved) {
        await PostService.save(item.post_id);
        analytics().logEvent('save_post', { post_id: item.post_id });
        setSaved(true);
      } else {
        await PostService.unsave(item.post_id);
        setSaved(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChatPress = () => {
    console.log('handleChatPress', {
      user_id: item.user_id,
      user_name: item.authorName,
      avatar: item.avatarUrl,
      postId: item.post_id,
    });

    onChat?.(item.user_id);
    analytics().logEvent('initiate_chat', { user_id: item.user_id });

    router.push({
      pathname: '/ChatScreen',
      params: {
        userId: item.user_id,
        user_name: item.authorName,
        avatar: item.avatarUrl,
        postId: item.post_id,
        init: 'true',
      },
    });
  };

  const itemTagText = () => {
    switch (item.tag) {
      case 'BAN_RE':
        return 'Sell';
      case 'CHO_MIEN_PHI':
        return 'Free';
      case 'DOI_DO':
        return 'Exchange';
      default:
        return item.tag;
    }
  };

  const formatMoney = (n: number) =>
    n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const getMinMaxFromPrice = (price: number) => {
    const delta = price * 0.2;
    const min = Math.round(price - delta);
    const max = Math.round(price + delta);
    return { min, max };
  };

  const minMax =
    item.tag === 'BAN_RE' && item.price ? getMinMaxFromPrice(item.price) : null;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (!editable) {
          router.push(`/PostDetail?postId=${item.post_id}`);
        }
      }}
    >
      <View style={styles.header}>
        <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />

        <View style={styles.headerInfo}>
          <View style={styles.leftInfo}>
            <Text style={styles.name}>{item.authorName}</Text>
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

          <View style={styles.rightInfo}>
            <Text style={styles.metaText}>{item.timestamp}</Text>
            <Text style={styles.metaText}>{item.location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.tagRow}>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{itemTagText()}</Text>
        </View>

        {item.tag === 'BAN_RE' && minMax && (
          <Text style={styles.priceRangeText}>
            {formatMoney(minMax.min)} - {formatMoney(minMax.max)}
          </Text>
        )}
      </View>

      <Text style={styles.contentText}>{item.content}</Text>

      <View style={styles.imageGrid}>
        {item.images?.length > 0 ? (
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
        ) : null}
      </View>

      {!feedback && (
        <View style={[styles.footer, editable && styles.footerEditable]}>
          {editable ? (
            <TouchableOpacity
              style={styles.footerBtn}
              onPress={() => router.push(`/NewPost?editId=${item.post_id}`)}
            >
              <Ionicons name="create-outline" size={22} color="black" />
              <Text style={styles.footerBtnText}>Edit</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.footerBtn}
                onPress={handleLikePress}
              >
                <Ionicons
                  name={liked ? 'heart' : 'heart-outline'}
                  size={24}
                  color={liked ? 'red' : 'black'}
                />
                <Text>{liked ? item.likesCount + 1 : item.likesCount}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.footerBtn}
                onPress={handleChatPress}
              >
                <Ionicons name="chatbubble-outline" size={22} color="black" />
                <Text style={styles.footerBtnText}>Chat</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.footerBtn}
                onPress={handleSavePress}
              >
                <Ionicons
                  name={saved ? 'bookmark' : 'bookmark-outline'}
                  size={22}
                  color={saved ? 'blue' : 'black'}
                />
                <Text>{saved ? 'Saved' : 'Save'}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    backgroundColor: '#FFDD57',
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
    gap: 8,
  },
  imageItem: {
    height: 200,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 8,
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
  leftInfo: { flex: 1 },
  rightInfo: { alignItems: 'flex-end' },

  tagRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  priceRangeText: {
    fontSize: 14,
    color: '#333',
  },
  footerEditable: {
    justifyContent: 'flex-end',
  },
});
