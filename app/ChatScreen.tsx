import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChatArea, { ChatMessage } from '@/components/chat/ChatArea';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import { connectSocket, getSocket } from '@/services/chatSocket';
import { ConversationService } from '@/services/conversationService';
import { getDefaultAvatar, UserService } from '@/services/userService';

export default function ChatScreen() {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const s = getSocket();
    if (s) setSocket(s);
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [partnerName, setPartnerName] = useState('');
  const [partnerAvatar, setPartnerAvatar] = useState<string | undefined>();
  const [myUserId, setMyUserId] = useState<string | null>(null);

  const [isBlocked] = useState(false);

  const router = useRouter();
  const {
    postId,
    userId: recipientId,
    avatar,
    user_name,
    conversationId: paramConversationId,
  } = useLocalSearchParams();

  const [conversationId, setConversationId] = useState<string | null>(
    typeof paramConversationId === 'string' ? paramConversationId : null,
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      if (!conversationId) return;

      ConversationService.getMessages({
        conversationId,
        page: 1,
        limit: 100,
      }).then((res) => {
        const mapped: ChatMessage[] = res.data.map((m) => ({
          id: m.message_id,
          message: m.content,
          senderId: m.sender_id,
          avatar: m.sender.avatar_url,
          name: m.sender.full_name,
        }));

        setMessages(mapped);
        // setMessages(mapped);
        ConversationService.markAsRead(conversationId);
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleGoBack = () => router.push('/(tabs)/chat');

  useEffect(() => {
    UserService.getMe().then((me) => setMyUserId(me.user_id));
  }, []);

  useEffect(() => {
    if (!recipientId) return;

    ConversationService.findOrCreate({
      recipient_id: String(recipientId),
      post_id: String(postId),
    }).then((res) => setConversationId(res.conversation_id));
  }, [recipientId, postId]);

  useEffect(() => {
    if (!conversationId) return;

    ConversationService.getMessages({
      conversationId,
      page: 1,
      limit: 100,
    }).then((res) => {
      const mapped: ChatMessage[] = res.data.map((m) => ({
        id: m.message_id,
        message: m.content,
        senderId: m.sender_id,
        avatar: m.sender.avatar_url,
        name: m.sender.full_name,
      }));

      setMessages(mapped); // đảo ở đây
      // setMessages(mapped);
      ConversationService.markAsRead(conversationId);
    });
  }, [conversationId]);

  useEffect(() => {
    if (user_name) setPartnerName(String(user_name));
    if (avatar) setPartnerAvatar(String(avatar));
  }, [user_name, avatar]);

  // useEffect(() => {
  //   if (!conversationId || !myUserId) return;

  //   const socket = connectSocket(myUserId);

  //   socket.on('message_sent', (payload: any) => {
  //     console.log('Message sent confirmed:', payload);
  //     if (payload.conversation_id !== conversationId) return;

  //     setMessages((prev) => [
  //       {
  //         id: payload.message_id,
  //         message: payload.content,
  //         senderId: payload.sender_id,
  //         avatar: payload.sender?.avatar_url,
  //         name: payload.sender?.full_name,
  //       },
  //       ...prev
  //     ]); 
  //   });

  //   return () => {
  //     socket.off('new_message');
  //     socket.disconnect();
  //   };
  // }, [conversationId, myUserId]);


  // useEffect(() => {
  //   if (!myUserId) return;

  //   const socket = connectSocket(myUserId);

  //   const onMessageSent = (payload: any) => {
  //     console.log('Message sent confirmed:', payload);

  //     // ❗ chỉ filter, KHÔNG connect/disconnect
  //     if (payload.conversation_id !== conversationId) return;

  //     setMessages((prev) => [
  //       {
  //         id: payload.message_id,
  //         message: payload.content,
  //         senderId: payload.sender_id,
  //         avatar: payload.sender?.avatar_url,
  //         name: payload.sender?.full_name,
  //       },
  //       ...prev,
  //     ]);
  //   };

  //   socket.on('message_sent', onMessageSent);

  //   return () => {
  //     socket.off('message_sent', onMessageSent); // ✅ đúng event
  //   };
  // }, [myUserId, conversationId]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const onNewMessage = (payload: any) => {
      console.log('New message received:', payload);
      if (payload.conversation_id !== conversationId) return;

      setMessages((prev) => [
        {
          id: payload.message_id, 
          message: payload.content,
          senderId: payload.sender_id,
          avatar: payload.sender?.avatar_url,
          name: payload.sender?.full_name,
        },
        ...prev,
      ]);
    };

    socket.on('new_message', onNewMessage);
    socket.on('message_sent', onNewMessage);

    return () => {
      socket.off('new_message', onNewMessage);
      socket.off('message_sent', onNewMessage);
    };
  }, [conversationId]);


  if (!myUserId) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ChatHeader
          name={partnerName}
          avatar={partnerAvatar ?? getDefaultAvatar(partnerName)}
          isBlocked={isBlocked}
          onStarPress={() =>
            router.push({ pathname: '/Feedback', params: { postId } })
          }
          onBackPress={handleGoBack}
        />

        <ChatArea messages={messages} recipientId={String(recipientId)} refreshing={refreshing} onRefresh={onRefresh} />

        {conversationId && (
          <ChatInput
            conversationId={conversationId}
            onLocalSend={(text) => {}}
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
