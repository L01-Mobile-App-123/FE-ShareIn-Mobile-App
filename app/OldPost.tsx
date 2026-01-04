import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
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
import { PostService } from './../services/postService';

export default function OldPost() {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(1);
  const loadingRef = useRef(false);

  const fetchDrafts = async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    const currentPage = pageRef.current;

    try {
      const data = await PostService.getDrafts({
        page: currentPage,
        limit: 20,
      });

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      const mapped: Post[] = data.map((item: any) => ({
        post_id: item.post_id,
        user_id: 'me',
        authorName: 'You',
        avatarUrl: '',
        timestamp: new Date(item.created_at).toLocaleDateString(),
        location: item.location,
        tag: item.transaction_type,
        rating: 0,
        content: item.description,
        images: item.image_urls ?? [],
        likesCount: item.view_count ?? 0,
        price: Number(item.price) || 0,
        status: item.status,
        is_available: item.is_available,
        is_liked: item.is_liked,
        is_saved: item.is_saved,
      }));

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
      fetchDrafts();
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
            <Text style={styles.topTitle}>Old post</Text>
          </View>
        </View>

        <FlatList
          data={posts}
          keyExtractor={(item) => item.post_id}
          renderItem={({ item }) => <PostItem item={item} editable />}
          onEndReached={fetchDrafts}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListFooterComponent={
            <>
              {loadingRef.current ? (
                <ActivityIndicator style={{ marginVertical: 16 }} />
              ) : null}

              {!hasMore && !loadingRef.current ? (
                <Text style={styles.emptyText}>
                  There is nothing more to show
                </Text>
              ) : null}
            </>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 16 },

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
