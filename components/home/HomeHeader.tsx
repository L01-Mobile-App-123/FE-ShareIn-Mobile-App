import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

interface HomeHeaderProps {
  onChangeText: (text: string) => void;
  value: string;
}

export default function HomeHeader({ onChangeText, value }: HomeHeaderProps) {
  return (
    <View style={styles.header}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/100?img=8' }}
        style={styles.avatar}
      />
      <View style={styles.inputContainer}>
        <Ionicons name="create-outline" size={20} color="#fff" />
        <TextInput
          placeholder="What do you want to do today?"
          placeholderTextColor="#fff"
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  avatar: { width: 45, height: 45, borderRadius: 22.5, marginRight: 10 },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: { flex: 1, color: '#fff', fontSize: 14, marginLeft: 6 },
});
