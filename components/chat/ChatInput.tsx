import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ChatInput() {
  const [text, setText] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // ✅ nhiều ảnh

  // 🖼️ Mở thư viện ảnh (cho phép nhiều ảnh)
  const handleOpenGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Bạn cần cho phép truy cập thư viện ảnh');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // ✅ chọn nhiều ảnh
      quality: 0.8,
      // 2 dòng dưới là để cắt ảnh
    //   allowsEditing: true,
    //   aspect: [4, 3],
    });

    if (!result.canceled) {
      const newUris = result.assets.map((a) => a.uri);
      setSelectedImages((prev) => [...prev, ...newUris]); // ✅ cộng dồn
    }
  };

  // 📷 Mở camera (vẫn 1 ảnh mỗi lần)
  const handleOpenCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Bạn cần cho phép truy cập Camera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      // 2 dòng dưới là để cắt ảnh
    //   allowsEditing: true,
    //   aspect: [4, 3],
    });

    if (!result.canceled) {
      setSelectedImages((prev) => [...prev, result.assets[0].uri]);
    }
  };

  // ❌ Xóa ảnh theo index
  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <View>
      {/* --- Thanh nhập --- */}
      <View style={styles.wrapper}>
        {/* --- Nhóm trái --- */}
        <View style={styles.leftGroup}>
          <TouchableOpacity onPress={handleOpenCamera}>
            <Ionicons name="camera-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenGallery}>
            <Ionicons name="image-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        {/* --- Ô nhập --- */}
        <View style={styles.centerGroup}>
          <TextInput
            style={styles.input}
            placeholder="Type something..."
            placeholderTextColor="#999"
            value={text}
            onChangeText={setText}
          />
        </View>

        {/* --- Nhóm phải --- */}
        <View style={styles.rightGroup}>
          <TouchableOpacity>
            <Ionicons name="happy-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendBtn}>
            <Ionicons name="send-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- Preview ảnh --- */}
      {selectedImages.length > 0 && (
        <View style={styles.previewContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={selectedImages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.imageWrapper}>
                <Image source={{ uri: item }} style={styles.previewImage} />
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => handleRemoveImage(index)}
                >
                  <Ionicons name="close-circle" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  centerGroup: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  input: {
    fontSize: 15,
    paddingVertical: 6,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sendBtn: {
    backgroundColor: '#FDD835',
    borderRadius: 20,
    padding: 6,
  },
  previewContainer: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  imageWrapper: {
    marginRight: 8,
    position: 'relative',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 2,
  },
});
