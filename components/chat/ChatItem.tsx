import { Post, PostService } from '@/services/postService';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export interface ConversationItem {
  conversation_id: string;
  post: { post_id: string };
  partner: {
    user_id: string;
    full_name: string;
    avatar_url?: string;
  };
  last_message?: string;
  last_message_at: string;
  unread_count: number;
}

export interface ChatItemProps {
  item: ConversationItem;
}

export default function ChatItem({ item }: ChatItemProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (item.post?.post_id) {
      PostService.getPost(item.post.post_id).then(setPost);
    }
  }, [item.post?.post_id]);

  return (
    <View style={{ marginBottom: 12 }}>
      <Pressable style={styles.card}>
        <Pressable
          onPress={() =>
            router.push({
              pathname: '/ChatScreen',
              params: {
                userId: item.partner.user_id,
                user_name: item.partner.full_name,
                avatar: item.partner.avatar_url,
                postId: item.post.post_id,
              },
            })
          }
          style={styles.main}
        >
          <Image
            source={{ uri: item.partner.avatar_url }}
            style={styles.avatar}
          />
          <View style={styles.textWrap}>
            <Text style={styles.name}>{item.partner.full_name}</Text>
            {item.unread_count > 0 && (
              <Text style={styles.message} numberOfLines={1}>
                New message received
              </Text>
            )}
          </View>
        </Pressable>

        <Pressable onPress={() => setExpanded((v) => !v)}>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#444"
          />
        </Pressable>
      </Pressable>

      {expanded && post && (
        <View style={styles.expandBox}>
          <Text style={styles.expandTime}>
            {post.location ?? 'Không rõ địa điểm'}
          </Text>

          <View style={styles.row}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{post.transaction_type}</Text>
            </View>
          </View>

          <Text style={styles.desc}>{post.description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3DC',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: '#ddd',
  },
  textWrap: { flex: 1 },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: '#222',
    marginBottom: 2,
  },
  message: {
    color: '#666',
    fontSize: 13,
  },
  expandBox: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  expandTime: {
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  tag: {
    backgroundColor: '#FFD84D',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#222',
  },
  desc: {
    fontSize: 13,
    color: '#444',
    lineHeight: 18,
  },
});
