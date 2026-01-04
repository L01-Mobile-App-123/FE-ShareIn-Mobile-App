import { useFocusEffect } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { PostService } from './../../services/postService';
import PostItem, { Post } from './PostItem';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const pageRef = useRef(1);
  const loadingRef = useRef(false);

  useEffect(() => {
    fetchPosts();
    // fetchSaved();
  }, []);

  // const fetchSaved = async () => {
  //   try {
  //     const data = await PostService.getSaved({ page: 1, limit: 100 });
  //     const ids = new Set(data.map((i: any) => i.post?.post_id || i.post_id));
  //     setSavedIds(ids);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const fetchPosts = async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    const currentPage = pageRef.current;

    try {
      const data = await PostService.getPosts({ page: currentPage, limit: 20 });

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      const onlyPosted = data.filter((i: any) => i.status === 'posted');
      const onlyAvaible = onlyPosted.filter(
        (i: any) => i.is_available === true,
      );

      const mapped: Post[] = onlyPosted.map((item: any) => ({
        post_id: item.post_id,
        user_id: item.user.user_id,
        authorName: item.user.full_name,
        avatarUrl: item.user.avatar_url,
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
      }));

      setPosts((prev) => {
        const map = new Map<string, Post>();

        for (const p of prev) map.set(p.post_id, p);
        for (const p of mapped) map.set(p.post_id, p);

        return Array.from(map.values());
      });

      pageRef.current += 1;
    } catch (err) {
      console.log(err);
    } finally {
      loadingRef.current = false;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setPosts([]);
      setHasMore(true);
      pageRef.current = 1;
      fetchPosts();
    }, []),
  );

  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.post_id}
        renderItem={({ item }) => <PostItem item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        onEndReached={fetchPosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          <View>
            {loadingRef.current ? (
              <ActivityIndicator size="large" color={'#fff'} style={{ marginVertical: 16 }}/>
            ) : null}

            {!hasMore && !loadingRef.current ? (
              <Text
                style={{
                  textAlign: 'center',
                  color: '#888',
                  marginVertical: 12,
                  fontSize: 12,
                }}
              >
                There is nothing more to show
              </Text>
            ) : null}
          </View>
        }
      />
    </View>
  );
}
