import { getSocket } from '@/services/chatSocket';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

export default function ChatInput({
  conversationId,
  onLocalSend,
}: {
  conversationId: string;
  onLocalSend: (text: string) => void;
}) {
  const [text, setText] = useState('');

  const handleSend = () => {
    const socket = getSocket();
    if (!socket) return;

    if (!socket.connected) {
      console.log('Socket chưa sẵn sàng, chờ reconnect...');
      return;
    }

    const messageContent = text.trim();
    if (!conversationId || !messageContent) return;

    socket.emit('send_message', {
      conversationId,
      content: messageContent,
      messageType: 'TEXT',
    });

    onLocalSend(messageContent);
    setText('');
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Type something..."
        placeholderTextColor="#999"
        value={text}
        onChangeText={setText}
        // Đảm bảo không bị lag trên Android
        disableFullscreenUI={true}
      />
      <Pressable
        style={[styles.sendBtn, !text.trim() && { backgroundColor: '#E0E0E0' }]}
        onPress={handleSend}
        disabled={!text.trim()}
      >
        <Ionicons name="send-outline" size={22} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 6,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 10,
    color: '#000',
  },
  sendBtn: {
    backgroundColor: '#FDD835',
    borderRadius: 20,
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
