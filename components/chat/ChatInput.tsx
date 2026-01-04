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
  // console.log('ChatInput rendered');

  const [text, setText] = useState('');

  const handleSend = () => {
    const socket = getSocket();

    if (!socket) {
      console.log('No socket');
      return;
    }
    if (!conversationId) {
      console.log('No conversationId');
      return;
    }
    if (!text.trim()) return;

    const payload = {
      conversationId,
      content: text,
      messageType: 'TEXT',
    };

    console.log('Emit send_message:', payload);
    socket.emit('send_message', payload);

    onLocalSend(text); // hiển thị ngay
    setText('');
  };

  return (
    <View>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder="Type something..."
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
        />
        <Pressable style={styles.sendBtn} onPress={handleSend}>
          <Ionicons name="send-outline" size={22} color="#fff" />
        </Pressable>
      </View>
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
    // pointerEvents: 'box-none',
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 6,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  sendBtn: {
    backgroundColor: '#FDD835',
    borderRadius: 20,
    padding: 6,
  },
});
