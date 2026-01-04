import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChatArea, { ChatMessage } from '@/components/chat/ChatArea';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import { connectSocket } from '@/services/chatSocket';
import { ConversationService } from '@/services/conversationService';

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [partnerName, setPartnerName] = useState('');
  const [partnerAvatar, setPartnerAvatar] = useState<string | undefined>();

  const [isBlocked] = useState(false);

  const router = useRouter();
  const {
    postId,
    userId,
    avatar,
    user_name,
    conversationId: paramConversationId,
  } = useLocalSearchParams();
  const [conversationId, setConversationId] = useState<string | null>(
    typeof paramConversationId === 'string' ? paramConversationId : null,
  );
  const handleGoBack = () => router.push('/(tabs)/chat');

  useEffect(() => {
    if (!userId) return;

    ConversationService.findOrCreate({
      recipient_id: String(userId),
      post_id: String(postId),
    }).then((res) => {
      setConversationId(res.conversation_id);
    });
  }, [userId]);

  useEffect(() => {
    if (!conversationId) return;

    ConversationService.getMessages({
      conversationId,
      page: 1,
      limit: 50,
    }).then((res) => {
      const mapped: ChatMessage[] = res.data.map((m) => ({
        id: m.message_id,
        message: m.content,
        isSender: m.sender_id === userId,
        avatar: m.sender.avatar_url,
      }));

      setMessages(mapped);
      ConversationService.markAsRead(conversationId);
    });
  }, [conversationId, userId]);

  useEffect(() => {
    if (user_name) setPartnerName(String(user_name));
    if (avatar) setPartnerAvatar(String(avatar));
  }, [user_name, avatar]);

  // Sau khi có conversationId, gắn listener
  useEffect(() => {
    if (!conversationId || !userId) return;

    const socket = connectSocket(String(userId));

    socket.on('new_message', (payload) => {
      if (payload.conversationId !== conversationId) return;

      setMessages((prev) => [
        ...prev,
        {
          id: payload.message_id,
          message: payload.content,
          isSender: false,
          avatar: payload.sender?.avatar_url,
        },
      ]);
    });

    return () => {
      socket.off('new_message');
    };
  }, [conversationId, userId]);
  const handleLocalSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        message: text,
        isSender: true,
      },
    ]);
  };
  useEffect(() => {
    if (!userId) return;
    connectSocket(String(userId));
  }, [userId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ChatHeader
          name={partnerName}
          avatar={partnerAvatar}
          isBlocked={isBlocked}
          onStarPress={() =>
            router.push({
              pathname: '/Feedback',
              params: { postId: postId },
            })
          }
          onBackPress={handleGoBack}
        />

        <ChatArea messages={messages} />
        {conversationId && (
          <ChatInput
            conversationId={conversationId}
            onLocalSend={handleLocalSend}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  container: { flex: 1 },
});
