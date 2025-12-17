import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { useEffect, useState } from 'react';
import { UserService, UserProfile } from '@/services/userService';

export default function SettingScreen() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await loadUser();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await UserService.getMe();
      setUser(data);
    } catch (err) {
      console.log('Load user failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  const menuItems = [
    {
      title: 'Setting profile',
      route: '/ProfileSetting',
    },
    {
      title: 'List of interest',
      route: '/InterestScreen',
    },
    {
      title: 'Saved posts',
      route: '/SavedPosts',
    },
    { title: 'Sign out', route: '/Onboarding' },
  ];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#FF9A00']} // Android
          tintColor="#FF9A00" // iOS
        />
      }
    >
      {/* Header */}
      <LinearGradient colors={['#FFB547', '#FF8C00']} style={styles.header}>
        {/* Header */}
        <Text style={styles.headerTitle}> Setting</Text>
        <Image source={{ uri: user?.avatar_url }} style={styles.avatar} />
      </LinearGradient>

      {/* Menu */}
      <View style={styles.subContainer}>
        <Text style={styles.userName}>{user?.full_name}</Text>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                if (item.title === 'Sign out') {
                  router.replace('/Onboarding');
                  return;
                }
                router.push(item.route as never);
              }}
            >
              <Text style={styles.menuText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFb547',
  },
  header: {
    padding: 20,
    paddingVertical: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#FF9F0A',
  },
  subContainer: {
    flex: 1,
    height: 1000,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -50,
    paddingBottom: 20,
  },
  menuContainer: {
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
