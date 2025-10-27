import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface Post {
  id: string;
  name: string;
  time: string;
  location: string;
  tag: string;
  content: string;
  images: string[];
}

interface PostItemProps {
  item: Post;
}

export default function PostItem({ item }: PostItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://i.pravatar.cc/100?img=3' }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.meta}>{item.time} • {item.location}</Text>
        </View>
      </View>

      <View style={styles.tagContainer}>
        <Text style={styles.tag}>{item.tag}</Text>
      </View>

      <Text style={styles.content}>{item.content}</Text>

      <View style={styles.imageRow}>
        {item.images.map((img, index) => (
          <View key={index} style={[styles.imageBox, index === 1 && { flex: 2 }]}>
            <Text style={{ color: '#fff' }}>Image</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerBtn}>
          <Ionicons name="heart-outline" size={20} color="black" />
          <Text style={{ marginLeft: 4 }}>13</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn}>
          <Ionicons name="bookmark-outline" size={20} color="black" />
          <Text style={{ marginLeft: 4 }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF9E5',
    borderRadius: 15,
    marginBottom: 15,
    padding: 12,
  },
  header: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
  meta: { color: '#666', fontSize: 12 },
  tagContainer: { marginTop: 6, alignSelf: 'flex-start' },
  tag: {
    backgroundColor: '#FFDD57',
    color: '#000',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: '600',
  },
  content: { marginTop: 6, fontSize: 14, color: '#333' },
  imageRow: { flexDirection: 'row', gap: 6, marginTop: 8 },
  imageBox: {
    flex: 1,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 6,
  },
  footerBtn: { flexDirection: 'row', alignItems: 'center' },
});
