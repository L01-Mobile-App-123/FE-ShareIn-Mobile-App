import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MessageBubble from './MessageBubble';

export type ChatMessage = {
  id: string;
  message: string;
  isSender?: boolean;
  avatar?: string;
};

type ChatAreaProps = {
  messages: ChatMessage[]; // bắt buộc phải truyền vào
};

export default function ChatArea({ messages }: ChatAreaProps) {
  return (
    <View style={styles.container}>
      <ScrollView
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
  contentContainer: {
    paddingTop: 12,
    paddingBottom: 12,
  },
});
