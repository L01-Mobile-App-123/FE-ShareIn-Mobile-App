import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function CreatePostScreen() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = ['Give away', 'Swap', 'Sell cheap'];

  const [images, setImages] = useState<string[]>([]);
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
        Alert.alert('Permission required', 'Please allow photo access to upload images.');
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
    });

    if (!result.canceled) {
        const selectedUris = result.assets.map((asset) => asset.uri);
        setImages([...images, ...selectedUris]);
    }
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* 🔸 HEADER */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="black" />
            <Text style={styles.headerText}>Create a post</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.postBtn}>
            <Text style={styles.postBtnText}>Post</Text>
            </TouchableOpacity>
        </View>

        {/* 🔸 NỘI DUNG */}
        <ScrollView contentContainerStyle={styles.scroll}>
            {/* Avatar + Name */}
            <View style={styles.profileRow}>
            <Image
                source={{ uri: 'https://i.pravatar.cc/100?img=8' }}
                style={styles.avatar}
            />
            <Text style={styles.username}>Gia Nguyên</Text>
            </View>

            {/* Câu hỏi */}
            <Text style={styles.question}>What do you want to trade or sell?</Text>

            {/* Image Placeholder */}
            <View style={styles.imageBox}>
            {images.length === 0 ? (
                <Text style={{ color: '#fff', fontWeight: '600' }}>Image</Text>
            ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {images.map((uri, idx) => (
                    <Image
                    key={idx}
                    source={{ uri }}
                    style={{ width: 100, height: 100, borderRadius: 10, marginRight: 10 }}
                    resizeMode="cover"
                    />
                ))}
                </ScrollView>
            )}
            </View>


            {/* Category Button */}
            <TouchableOpacity style={styles.categoryBtn}>
            <Text style={styles.categoryText}>Category</Text>
            </TouchableOpacity>

            {/* Tag Buttons */}
            <View style={styles.tagsRow}>
            {tags.map((tag) => (
                <TouchableOpacity
                key={tag}
                style={[
                    styles.tagBtn,
                    selectedTag === tag && styles.tagBtnActive,
                ]}
                onPress={() => setSelectedTag(tag)}
                >
                <Text
                    style={[
                    styles.tagText,
                    selectedTag === tag && styles.tagTextActive,
                    ]}
                >
                    {tag}
                </Text>
                </TouchableOpacity>
            ))}
            </View>
        </ScrollView>

        {/* 🔸 FOOTER UPLOAD */}
        <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
        <Ionicons name="image-outline" size={20} color="black" />
        <Text style={styles.uploadText}>Upload images</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFCC00',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '600',
  },
  postBtn: {
    backgroundColor: '#FFB100',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  postBtnText: {
    fontWeight: '600',
    color: '#000',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
  },
  question: {
    marginTop: 20,
    fontSize: 15,
    color: '#333',
    fontStyle: 'italic',
  },
  imageBox: {
    backgroundColor: '#FF9800',
    borderRadius: 15,
    height: 120,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBtn: {
    backgroundColor: '#0F3D91',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  categoryText: {
    color: '#fff',
    fontWeight: '600',
  },
  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  tagBtn: {
    backgroundColor: '#FFF9C4',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  tagBtnActive: {
    backgroundColor: '#FFB100',
  },
  tagText: {
    color: '#000',
    fontWeight: '500',
  },
  tagTextActive: {
    color: '#000',
    fontWeight: '700',
  },
  uploadBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFCC00',
    paddingVertical: 14,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  uploadText: {
    marginLeft: 8,
    fontWeight: '600',
  },
});
