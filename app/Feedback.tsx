import PostItem from '@/components/home/PostItem';
import { PostService } from '@/services/postService';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FeedbackScreen() {
  const router = useRouter();
  const { postId } = useLocalSearchParams();

  const [comment, setComment] = useState('');
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const data = await PostService.getPost(postId as string);
        setPost({
          post_id: data.post_id,
          user_id: data.user?.user_id,
          authorName: data.user?.full_name,
          avatarUrl: data.user?.avatar_url,
          timestamp: new Date(data.created_at).toLocaleDateString(),
          location: data.location,
          tag: data.transaction_type,
          rating: Math.round((data.user?.reputation_score ?? 0) / 20),
          content: data.description,
          images: data.image_urls,
          likesCount: data.view_count ?? 0,
          price: data.price,
          status: data.status === 'posted',
          is_available: data.is_available,
          is_liked: data.is_liked,
          is_saved: false,
        });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Pressable onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#222" />
            </Pressable>
            <Text style={styles.title}>Feedback</Text>
            <Pressable>
              <Text style={styles.done}>Done</Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          {loading ? (
            <ActivityIndicator style={{ marginTop: 40 }} />
          ) : post ? (
            <PostItem item={post} feedback />
          ) : null}

          <View style={styles.commentBox}>
            <TextInput
              placeholder="Some comments here..."
              value={comment}
              onChangeText={setComment}
              style={styles.commentInput}
              multiline
            />
          </View>

          <Pressable style={styles.attachBtn}>
            <Ionicons name="image-outline" size={22} color="#222" />
            <Text style={styles.attachText}>Attach photo evidences</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  container: { flex: 1, backgroundColor: 'white' },
  scroll: { paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    justifyContent: 'space-between',
  },
  title: { fontSize: 18, fontWeight: '600', color: '#222' },
  done: {
    backgroundColor: '#FFF3DC',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    fontSize: 13,
    color: '#222',
  },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 12 },
  commentBox: {
    backgroundColor: '#FFF3DC',
    borderRadius: 14,
    padding: 12,
    margin: 16,
  },
  commentInput: {
    fontSize: 14,
    color: '#444',
    minHeight: 60,
  },
  attachBtn: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: '#FFD84D',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  attachText: { fontWeight: '600', fontSize: 14, color: '#222' },
});
