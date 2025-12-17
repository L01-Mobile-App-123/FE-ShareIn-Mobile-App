import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MOCK_DATA = [
  {
    id: '1',
    user: 'Gia Nguyễn',
    avatar: 'https://i.pravatar.cc/100',
    time: '13 hrs ago',
    location: 'HCM City',
    description:
      'Mình có cái nồi cơm điện Sharp 1.8L, mua tầm 2 năm rồi, vẫn dùng tốt...',
    likes: 12,
    images: [1, 2, 3],
  },
  {
    id: '2',
    user: 'Gia Nguyễn',
    avatar: 'https://i.pravatar.cc/100',
    time: '13 hrs ago',
    location: 'HCM City',
    description: 'Mình có cái nồi cơm điện Sharp 1.8L, mua tầm 2 năm rồi...',
    likes: 12,
    images: [1, 2],
  },
];

export default function SavedPosts() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} />
        <Text style={styles.headerTitle}>Save posts</Text>
      </View>

      <FlatList
        data={MOCK_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

/* ---------------- Card ---------------- */

function PostCard({ post }: any) {
  return (
    <View style={styles.card}>
      {/* User row */}
      <View style={styles.row}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />

        <View style={{ flex: 1 }}>
          <View style={styles.rowBetween}>
            <Text style={styles.username}>{post.user}</Text>
            <Text style={styles.meta}>
              {post.time} • {post.location}
            </Text>
          </View>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Give away</Text>
            </View>

            <View style={styles.starRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Ionicons key={i} name="star-outline" size={14} />
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Content */}
      <Text style={styles.desc}>{post.description}</Text>

      {/* Images */}
      <View style={styles.imageGrid}>
        {post.images.map((i: number) => (
          <View key={i} style={styles.imageBox}>
            <Text style={{ color: 'white' }}>Image</Text>
          </View>
        ))}
      </View>

      {/* Actions */}
      <View style={styles.actionRow}>
        <View style={styles.row}>
          <Ionicons name="heart-outline" size={20} />
          <Text style={{ marginLeft: 4 }}>{post.likes}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="chatbubble-outline" size={20} />
          <Text style={{ marginLeft: 4 }}>Chat</Text>
        </View>

        <TouchableOpacity style={styles.saveBtn}>
          <Ionicons name="bookmark" size={18} />
          <Text style={{ marginLeft: 6 }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },

  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  username: {
    fontWeight: '600',
  },
  meta: {
    fontSize: 12,
    color: '#777',
  },

  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#FFD84D',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },

  starRow: {
    flexDirection: 'row',
  },

  desc: {
    marginVertical: 10,
    lineHeight: 20,
  },

  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  imageBox: {
    width: '48%',
    height: 90,
    backgroundColor: '#F4A63B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD84D',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
});
