import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MessageBubble from './MessageBubble';

type ChatMessage = {
  id: string;
  message: string;
  isSender?: boolean;
  avatar?: string;
};

type ChatAreaProps = {
  messages?: ChatMessage[];
};

export default function ChatArea({
  messages = [
    { id: '1', message: 'Xin chào bạn!', avatar: 'https://i.pravatar.cc/100?img=5' },
    { id: '2', message: 'Chào! Mình là ChatGPT 😄', isSender: true },
    { id: '3', message: 'Thử xem component này chạy tốt chưa?', avatar: 'https://i.pravatar.cc/100?img=5' },
  ],
}: ChatAreaProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((m) => (
          <MessageBubble
            key={m.id}
            message={m.message}
            isSender={m.isSender}
            avatar={m.avatar}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 12,
    paddingBottom: 12,
  },
});
