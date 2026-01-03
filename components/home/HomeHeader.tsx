import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface HomeHeaderProps {}

export default function HomeHeader() {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/100?img=8' }}
        style={styles.avatar}
      />
      <Pressable style={{ flex: 1 }} onPress={() => router.push('/NewPost')}>
        <View style={styles.inputContainer}>
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.input}>What do you want to do today?</Text>
        </View>
      </Pressable>
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
