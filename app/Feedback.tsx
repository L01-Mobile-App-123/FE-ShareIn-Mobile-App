import PostItem from '@/components/home/PostItem';
import { PostService } from '@/services/postService';
import { RatingService } from '@/services/ratingService';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
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
  const [rating, setRating] = useState<number>(0);

  const [comment, setComment] = useState('');
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState<
    ImagePicker.ImagePickerAsset[]
  >([]);
  const handleOpenGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Need gallery permission');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImages((prev) => [...prev, ...result.assets]);
    }
  };
  const removeImage = (uri: string) => {
    setSelectedImages((prev) => prev.filter((i) => i.uri !== uri));
  };

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

  const handleSubmit = async () => {
    if (!post) return;

    if (!rating) {
      Alert.alert('Missing rating', 'Please select star rating');
      return;
    }

    try {
      const ratingScore = rating * 20;

      const res = await RatingService.create({
        rated_user_id: post.user_id,
        rating_score: ratingScore,
        comment,
      });

      if (selectedImages.length > 0) {
        await RatingService.uploadImages(res.rating_id, selectedImages);
      }

      Alert.alert('Success', 'Your feedback has been submitted', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (e: any) {
      console.log(e);

      const msg =
        e?.response?.data?.message || e?.message || 'Failed to submit feedback';

      Alert.alert('Error', msg);
    }
  };

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
            <Pressable onPress={handleSubmit}>
              <Text style={styles.done}>Done</Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          {loading ? (
            <ActivityIndicator style={{ marginTop: 40 }} />
          ) : post ? (
            <PostItem item={post} feedback />
          ) : null}
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((v) => (
              <Pressable key={v} onPress={() => setRating(v)}>
                <Ionicons
                  name={v <= rating ? 'star' : 'star-outline'}
                  size={26}
                  color={v <= rating ? '#FFC107' : '#CCC'}
                />
              </Pressable>
            ))}
          </View>

          <View style={styles.commentBox}>
            <TextInput
              placeholder="Some comments here..."
              value={comment}
              onChangeText={setComment}
              style={styles.commentInput}
              multiline
            />
          </View>

          {selectedImages.length > 0 && (
            <View style={styles.previewRow}>
              {selectedImages.map((item) => (
                <View key={item.uri} style={styles.previewWrapper}>
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.previewImage}
                  />
                  <Pressable
                    style={styles.removeBtn}
                    onPress={() => removeImage(item.uri)}
                  >
                    <Ionicons name="close-circle" size={18} color="red" />
                  </Pressable>
                </View>
              ))}
            </View>
          )}

          <Pressable style={styles.attachBtn} onPress={handleOpenGallery}>
            <Ionicons name="image-outline" size={22} color="#222" />
            <Text style={styles.attachText}>Attach photo evidences</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  previewRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
  },

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
  previewWrapper: {
    position: 'relative',
    marginTop: 10,
    width: '25%',
    alignItems: 'center',
  },

  previewImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },

  removeBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 4,
    gap: 6,
  },
});
