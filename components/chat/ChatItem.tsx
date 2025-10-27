import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export interface Message {
  id: string;
  name: string;
  message: string;
  avatar: string;
}

export interface ChatItemProps {
  item: Message;
}

export default function ChatItem({ item }: ChatItemProps) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/ChatScreen', // ✅ đúng route path (vì nó nằm ngoài tabs)
          params: { id: item.id, name: item.name, avatar: item.avatar },
        })
      }
    >
      <View style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD54F',
    borderRadius: 15,
    padding: 10,
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  message: {
    color: '#333',
    fontSize: 14,
  },
});
