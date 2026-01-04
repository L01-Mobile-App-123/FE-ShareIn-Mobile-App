import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostItem, { Post } from '../components/home/PostItem';
import { PostService } from '../services/postService';
import { UserProfile, UserService } from '@/services/userService';

export default function MyPosts() {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);
  
  const loadUser = async () => {
    try {
      const data = await UserService.getMe();
      setUser(data);
    } catch (err) {
      console.log('Load user failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyPosts = async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    const currentPage = pageRef.current;

    try {
      const data = await PostService.getMyPosts({
        page: currentPage,
        limit: 20,
      });

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      const mapToPost = (item: any): Post => ({
        post_id: item.post_id,
        user_id: item.user_id,
        authorName: user?.full_name || 'Unknown',
        avatarUrl: user?.avatar_url || '',
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
      const mapped: Post[] = data.map(mapToPost);
      setPosts((prev) => {
        const map = new Map<string, Post>();
        for (const p of prev) map.set(p.post_id, p);
        for (const p of mapped) map.set(p.post_id, p);
        return Array.from(map.values());
      });

      pageRef.current += 1;
    } catch (e) {
      console.log(e);
    } finally {
      loadingRef.current = false;
    }
  };

  useFocusEffect(
    useCallback(() => {
      setPosts([]);
      setHasMore(true);
      pageRef.current = 1;
      if (user !== null) {
        fetchMyPosts();
      }
    }, [user]),
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.topLeft}>
            <Pressable onPress={() => router.back()} style={styles.topBtn}>
              <Ionicons name="chevron-back" size={22} color="#000" />
            </Pressable>
            <Text style={styles.topTitle}>My Posts</Text>
          </View>
        </View>

        <FlatList
          data={posts}
          keyExtractor={(item) => item.post_id}
          renderItem={({ item }) => <PostItem item={item} />}
          onEndReached={fetchMyPosts}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListFooterComponent={
            <View>
              {loadingRef.current ? (
                <ActivityIndicator size="large" color={'#FFCC00'} style={{ marginVertical: 16 }}/>
              ) : null}

              {!hasMore && !loadingRef.current ? (
                <Text style={styles.emptyText}>
                  There is nothing more to show
                </Text>
              ) : null}
            </View>
          }
        />
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
