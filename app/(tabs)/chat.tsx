import ChatItem from '@/components/chat/ChatItem';
import { connectSocket } from '@/services/chatSocket';
import { ConversationService } from '@/services/conversationService';
import { UserService } from '@/services/userService';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Chat() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    ConversationService.getAll().then(setConversations);
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return conversations;
    const q = search.toLowerCase();
    return conversations.filter(
      (c) =>
        c.partner.full_name.toLowerCase().includes(q) ||
        (c.last_message ?? '').toLowerCase().includes(q),
    );
  }, [search, conversations]);

  const [myUserId, setMyUserId] = useState<string | null>(null); // 👈 thêm

  useEffect(() => {
    ConversationService.getAll().then(setConversations);
  }, []);

  // 👇 lấy user giống ChatScreen
  useEffect(() => {
    UserService.getMe().then((me) => setMyUserId(me.user_id));
  }, []);

  // 👇 connect socket khi đã có userId
  useEffect(() => {
    if (myUserId) {
      connectSocket(myUserId);
    }
  }, [myUserId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </Pressable>
        <Text style={styles.title}>Chat</Text>
      </View>

      <View style={styles.searchWrap}>
        <Text style={styles.searchLabel}>Search</Text>
        <View style={styles.searchInputWrap}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.conversation_id}
        renderItem={({ item }) => <ChatItem item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 8,
    color: '#222',
  },

  searchWrap: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 6,
  },
  searchInputWrap: {
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 42,
    justifyContent: 'center',
  },
  searchInput: {
    fontSize: 15,
    color: '#222',
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
});
