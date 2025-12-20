import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function ChatInput() {
  const [text, setText] = useState('');

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
        <TouchableOpacity style={styles.sendBtn}>
          <Ionicons name="send-outline" size={22} color="#fff" />
        </TouchableOpacity>
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
