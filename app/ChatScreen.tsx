import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChatArea, { ChatMessage } from '@/components/chat/ChatArea';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';

// Hàm mock API
function fetchMockMessages(userId: string): Promise<ChatMessage[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          message: 'Xin chào bạn!',
          avatar: 'https://i.pravatar.cc/100?img=5',
        },
        { id: '2', message: 'Chào! Mình là ChatGPT 😄', isSender: true },
        {
          id: '3',
          message: 'Thử xem component này chạy tốt chưa?',
          avatar: 'https://i.pravatar.cc/100?img=5',
        },
      ]);
    }, 500); // giả lập delay 0.5s
  });
}

export default function ChatScreen() {
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showUnblockModal, setShowUnblockModal] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const router = useRouter();
  const { id, name, avatar } = useLocalSearchParams();

  const handleGoBack = () => {
    router.push('/(tabs)/chat');
  };

  // Lấy dữ liệu mock
  useEffect(() => {
    fetchMockMessages(id as string).then((data) => setMessages(data));
  }, [id]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ChatHeader
          isBlocked={isBlocked}
          onInfoPress={() => setShowBlockModal(true)}
          onBackPress={handleGoBack}
        />

        {/* ChatArea nhận messages từ state */}
        <ChatArea messages={messages} />

        <ChatInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
});
