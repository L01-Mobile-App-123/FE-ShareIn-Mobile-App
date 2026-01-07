import { ScrollView, StyleSheet } from 'react-native';
import MessageBubble from './MessageBubble';

import { UserService } from '@/services/userService';
import { useEffect, useState } from 'react';

export type ChatMessage = {
  id: string;
  message: string;
  senderId: string; // thêm field này
  avatar?: string;
};

type ChatAreaProps = {
  messages: ChatMessage[];
  recipientId: string;
};

export default function ChatArea({ messages, recipientId }: ChatAreaProps) {
  const [myUserId, setMyUserId] = useState<string | null>(null);

  useEffect(() => {
    UserService.getMe().then((me) => setMyUserId(me.user_id));
    console.log('My user ID:', myUserId);
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.contentContainer}
    >
      {[...messages].reverse().map((m) => {
        // console.log(
        //   'render message id:',
        //   m.id,
        //   'senderId:',
        //   m.senderId,
        //   'recipientId:',
        //   recipientId,
        // );

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
  container: { flex: 1, backgroundColor: 'white' },
  contentContainer: { paddingTop: 12, paddingBottom: 12 },
});
