import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostItem, { Post } from '../components/home/PostItem';
import { PostService } from './../services/postService';
import analytics from '@react-native-firebase/analytics';

export default function PostDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [post, setPost] = useState<Post | null>(null);

  const fetchPost = async () => {
    try {
      const data = await PostService.getPost(params.postId as string);

      analytics().logEvent('post_view', { post_id: params.postId });

      const mapToPost = (item: any): Post => ({
        post_id: item.post_id,
        user_id: item.user_id,
        authorName: item.user?.full_name,
        avatarUrl: item.user?.avatar_url,
        timestamp: new Date(item.created_at).toLocaleDateString(),
        location: item.location,
        tag: item.transaction_type,
        rating: Math.floor(((item.user?.reputation_score ?? 0) / 100) * 5),
        content: item.description,
        images: item.image_urls,
        likesCount: item.view_count,
        price: item.price,
        status: item.status,
        is_available: item.is_available,
        is_liked: item.is_liked,
        is_saved: item.is_saved,
      });

      setPost(mapToPost(data));
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPost();
    }, []),
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.topLeft}>
            <Pressable onPress={() => router.back()} style={styles.topBtn}>
              <Ionicons name="chevron-back" size={22} color="#000" />
            </Pressable>
            <Text style={styles.topTitle}>Post Detail</Text>
          </View>
        </View>

        {post ? (
          <PostItem item={post} />
        ) : (
          <ActivityIndicator
            size="large"
            color={'#FFCC00'}
            style={{ marginVertical: 16 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 16, marginTop: 30 },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  topBtn: {
    paddingRight: 2,
    paddingVertical: 4,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 12,
    fontSize: 12,
  },
});
