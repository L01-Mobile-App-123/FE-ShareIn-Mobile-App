import { getDefaultAvatar, UserService } from '@/services/userService';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { UserProfile } from 'firebase/auth';
import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeHeader() {
  const router = useRouter();
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await UserService.getMe();
      setUser(data);
      await AsyncStorage.setItem('userProfile', JSON.stringify(data));
    } catch (err) {
      console.log('Load user failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return !loading ? (
    <View style={styles.header}>
      {user && (<Image
        testID="user-avatar"
        source={{ uri: user?.avatar_url as string || getDefaultAvatar(user?.fullName as string) }}
        style={styles.avatar}
      />)}
      <Pressable style={{ flex: 1 }} onPress={() => router.push('/NewPost')}>
        <View style={styles.inputContainer}>
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.input}>What do you want to do today?</Text>
        </View>
      </Pressable>
    </View>
  ) : null;
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
