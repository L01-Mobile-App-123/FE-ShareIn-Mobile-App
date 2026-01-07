import { UserService } from '@/services/userService';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import MessageBubble from './MessageBubble';

export type ChatMessage = {
  id: string;
  message: string;
  senderId: string;
  avatar?: string;
};

type ChatAreaProps = {
  messages: ChatMessage[];
  recipientId: string;
};

export default function ChatArea({ messages }: ChatAreaProps) {
  const [myUserId, setMyUserId] = useState<string | null>(null);

  useEffect(() => {
    UserService.getMe().then((me) => setMyUserId(me.user_id));
  }, []);

  if (!myUserId) return null;

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.contentContainer}
    >
      {/* {[...messages].reverse().map((m) => { */}
      {messages.map((m) => {
        const isSender = m.senderId === myUserId;

        return (
          <MessageBubble
            key={m.id}
            message={m.message}
            isSender={isSender}
            avatar={m.avatar}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: { paddingTop: 12, paddingBottom: 12 },
});
