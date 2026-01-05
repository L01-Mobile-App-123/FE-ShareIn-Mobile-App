import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ChatHeaderProps {
  name: string;
  avatar?: string;
  onStarPress: () => void;
  isBlocked: boolean;
  onBackPress?: () => void;
}

export default function ChatHeader({
  name,
  avatar,
  onStarPress,
  isBlocked,
  onBackPress,
}: ChatHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
        <TouchableOpacity onPress={onBackPress}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.rightGroup}>
        {!isBlocked && (
          <TouchableOpacity onPress={onStarPress}>
            <Feather name="star" size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDD835',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  leftGroup: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rightGroup: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ddd' },
  name: { fontWeight: '700', fontSize: 16 },
});
