import { getDefaultAvatar, UserService } from '@/services/userService';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import MessageBubble from './MessageBubble';

export type ChatMessage = {
  id: string;
  message: string;
  senderId: string;
  avatar?: string;
  name: string;
};

type ChatAreaProps = {
  messages: ChatMessage[];
  recipientId: string;
  refreshing: boolean;
  onRefresh: () => void;
};

export default function ChatArea({ messages, refreshing, onRefresh }: ChatAreaProps) {
  const [myUserId, setMyUserId] = useState<string | null>(null);

  useEffect(() => {
    UserService.getMe().then((me) => setMyUserId(me.user_id));
  }, []);

  if (!myUserId) return null;

  return (
    // <ScrollView
    //   style={{ flex: 1 }}
    //   contentContainerStyle={styles.contentContainer}
    // >
    //   {/* {[...messages].reverse().map((m) => { */}
    //   {messages.map((m) => {
    //     const isSender = m.senderId === myUserId;

    //     return (
    //       <MessageBubble
    //         key={m.id}
    //         message={m.message}
    //         isSender={isSender}
    //         avatar={m.avatar ?? getDefaultAvatar(m.name || '')}
    //       />
    //     );
    //   })}
    // </ScrollView>
    <FlatList
      data={ messages }
      inverted
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const isSender = item.senderId === myUserId;
        return (
          <MessageBubble
            message={item.message}
            isSender={isSender}
            avatar={item.avatar ?? getDefaultAvatar(item.name || '')}
          />
        );
      }}
      contentContainerStyle={styles.contentContainer}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      refreshing={refreshing}
      onRefresh={onRefresh}
    />

  );
}

const styles = StyleSheet.create({
  contentContainer: { paddingTop: 12, paddingBottom: 12 },
});
