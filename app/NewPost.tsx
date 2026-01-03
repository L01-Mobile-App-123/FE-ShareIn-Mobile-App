import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { CreatePostDto } from '../services/postService';
import { PostService } from '../services/postService';

type TradeType = 'give' | 'swap' | 'sell';

export default function NewPost() {
  const router = useRouter();
  const { editId } = useLocalSearchParams<{ editId?: string }>();

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState<string | null>(null);

  const [location, setLocation] = useState('');

  const [categoryItems, setCategoryItems] = useState<
    { label: string; value: string }[]
  >([]);

  // case lấy old post
  const [remoteImages, setRemoteImages] = useState<string[]>([]);

  useEffect(() => {
    PostService.getCategories().then((data) => {
      const items = data.map((c) => ({
        label: c.category_name,
        value: c.category_id,
      }));
      setCategoryItems(items);
    });
  }, []);

  useEffect(() => {
    if (!editId) return;

    (async () => {
      try {
        const res = await PostService.getPost(editId);
        const post = (res as any).data ?? res;

        setCategoryValue(post.category.category_id);
        setLocation(post.location);
        setTradeType(
          post.transaction_type === 'BAN_RE'
            ? 'sell'
            : post.transaction_type === 'DOI_DO'
              ? 'swap'
              : 'give',
        );
        setContent(post.description);

        if (post.transaction_type === 'BAN_RE' && post.price) {
          const min = Math.round(post.price * 0.8);
          const max = Math.round(post.price * 1.2);
          setAmountFrom(String(min));
          setAmountTo(String(max));
        } else {
          setAmountFrom('');
          setAmountTo('');
        }

        setRemoteImages(post.image_urls ?? []);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [editId]);

  const [tradeType, setTradeType] = useState<TradeType>('give');
  const [selectedImages, setSelectedImages] = useState<
    ImagePicker.ImagePickerAsset[]
  >([]);

  const [content, setContent] = useState('');
  const [amountFrom, setAmountFrom] = useState('');
  const [amountTo, setAmountTo] = useState('');

  const mapTradeType = (t: TradeType): 'CHO_MIEN_PHI' | 'BAN_RE' | 'DOI_DO' => {
    if (t === 'give') return 'CHO_MIEN_PHI';
    if (t === 'swap') return 'DOI_DO';
    return 'BAN_RE';
  };

  const calcPrice = (t: TradeType, from: string, to: string) => {
    if (t !== 'sell') return 0;
    const min = Number(from) || 0;
    const max = Number(to) || 0;
    if (!min && !max) return 0;
    return Math.round((min + max) / 2);
  };

  const handleOpenGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Cần cho phép truy cập thư viện ảnh');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImages((prev) => [...prev, ...result.assets]);
    }
  };

  const removeImage = (uri: string) => {
    setSelectedImages((prev) => prev.filter((i) => i.uri !== uri));
  };

  const handleSave = () => {
    Alert.alert('Save draft', 'Do you want to save this post as draft?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Save',
        onPress: async () => {
          if (!categoryValue || !location) {
            Alert.alert('Error', 'Category and location are required');
            return;
          }

          const payload: CreatePostDto = {
            category_id: categoryValue,
            title: 'Default title for drafting. Does not matter',
            description: content,
            location,
            transaction_type: mapTradeType(tradeType),
            price: calcPrice(tradeType, amountFrom, amountTo),
            status: 'draft',
          };

          const post = await PostService.createPost(payload);

          // up ảnh chỉ local
          if (selectedImages.length > 0) {
            await PostService.uploadImages(post.post_id, selectedImages);
          }

          router.back();
        },
      },
    ]);
  };

  const handlePost = () => {
    Alert.alert('Post', 'Are you sure you want to post this?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Post',
        onPress: async () => {
          if (!categoryValue || !location) {
            Alert.alert('Error', 'Category and location are required');
            return;
          }

          const payload: CreatePostDto = {
            category_id: categoryValue,
            title: 'Default title for posting. Does not matter',
            description: content,
            location,
            transaction_type: mapTradeType(tradeType),
            price: calcPrice(tradeType, amountFrom, amountTo),
            status: 'posted',
          };

          const post = await PostService.createPost(payload);

          // up ảnh chỉ local
          if (selectedImages.length > 0) {
            await PostService.uploadImages(post.post_id, selectedImages);
          }

          router.back();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.topLeft}>
            <Pressable onPress={() => router.back()} style={styles.topBtn}>
              <Ionicons name="chevron-back" size={22} color="#000" />
            </Pressable>
            <Text style={styles.topTitle}>New post</Text>
          </View>

          <View style={styles.topRight}>
            <Pressable style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
            </Pressable>

            <Pressable style={styles.postBtn} onPress={handlePost}>
              <Text style={styles.postText}>Post</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.inputBox}>
          <TextInput
            placeholder="What do you want to trade or sell?..."
            placeholderTextColor="#999"
            style={styles.textInput}
            multiline
            scrollEnabled
            value={content}
            onChangeText={setContent}
          />
        </View>

        <Text style={styles.label}>Category *</Text>
        <DropDownPicker
          open={categoryOpen}
          value={categoryValue}
          items={categoryItems}
          setOpen={setCategoryOpen}
          setValue={setCategoryValue}
          setItems={setCategoryItems}
          placeholder="---"
          style={styles.selectBox}
          dropDownContainerStyle={styles.dropdownContainer}
          zIndex={3000}
          zIndexInverse={1000}
          maxHeight={220}
          listMode="FLATLIST"
        />

        <Text style={styles.label}>Location *</Text>
        <TextInput
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
          style={[styles.selectBox, { paddingHorizontal: 12, height: 44 }]}
        />

        <View style={styles.tradeRow}>
          {(['give', 'swap', 'sell'] as TradeType[]).map((t) => (
            <Pressable
              key={t}
              onPress={() => setTradeType(t)}
              style={[
                styles.tradeBtn,
                tradeType === t && styles.tradeBtnActive,
              ]}
            >
              <Text
                style={
                  tradeType === t ? styles.tradeTextActive : styles.tradeText
                }
              >
                {t === 'give'
                  ? 'Give away'
                  : t === 'swap'
                    ? 'Swap'
                    : 'Sell cheap'}
              </Text>
            </Pressable>
          ))}
        </View>
        {tradeType === 'sell' && (
          <View style={styles.amountBox}>
            <Text style={styles.amountTitle}>Amount</Text>

            <View style={styles.amountRow}>
              <View style={styles.amountItem}>
                <Text style={styles.amountLabel}>From</Text>
                <TextInput
                  style={styles.amountInput}
                  keyboardType="numeric"
                  value={amountFrom}
                  onChangeText={setAmountFrom}
                  placeholder="0"
                />
              </View>

              <View style={styles.amountItem}>
                <Text style={styles.amountLabel}>To</Text>
                <TextInput
                  style={styles.amountInput}
                  keyboardType="numeric"
                  value={amountTo}
                  onChangeText={setAmountTo}
                  placeholder="0"
                />
              </View>
            </View>
          </View>
        )}

        <FlatList
          key="grid"
          data={[
            ...remoteImages.map((uri) => ({ type: 'remote' as const, uri })),
            ...selectedImages.map((a) => ({
              type: 'local' as const,
              uri: a.uri,
            })),
          ]}
          keyExtractor={(i) => i.uri}
          numColumns={4}
          renderItem={({ item }) => (
            <View style={styles.previewWrapper}>
              <Image source={{ uri: item.uri }} style={styles.previewImage} />
              <Pressable
                style={styles.removeBtn}
                onPress={() => {
                  if (item.type === 'remote') {
                    setRemoteImages((prev) =>
                      prev.filter((u) => u !== item.uri),
                    );
                  } else {
                    setSelectedImages((prev) =>
                      prev.filter((i) => i.uri !== item.uri),
                    );
                  }
                }}
              >
                <Ionicons name="close-circle" size={18} color="red" />
              </Pressable>
            </View>
          )}
        />

        <View style={styles.bottom}>
          <Pressable
            style={styles.editBtn}
            onPress={() => router.push('/OldPost')}
          >
            <Ionicons name="create-outline" size={20} color="#000" />
            <Text style={styles.editText}>Edit old post</Text>
          </Pressable>

          <Pressable style={styles.uploadBtn} onPress={handleOpenGallery}>
            <Ionicons name="image-outline" size={22} color="#000" />
            <Text style={styles.uploadText}>Upload images</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 20 },

  header: { fontSize: 20, fontWeight: '600', marginTop: 8 },

  inputBox: {
    backgroundColor: '#FFF6E5',
    borderRadius: 14,
    padding: 14,
    marginTop: 16,
    height: 120,
  },

  textInput: {
    fontSize: 14,
    height: '100%',
    textAlignVertical: 'top',
  },

  label: { marginTop: 16, fontWeight: '500', color: '#555' },

  selectBox: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    marginTop: 6,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
  },

  tradeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  tradeBtn: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tradeBtnActive: { backgroundColor: '#FFD54F' },
  tradeText: { color: '#777' },
  tradeTextActive: { color: '#000', fontWeight: '600' },

  previewWrapper: {
    position: 'relative',
    marginTop: 12,
    marginBottom: 12,
    width: '25%',
    alignItems: 'center',
  },

  previewImage: { width: 75, height: 75, borderRadius: 10 },
  removeBtn: { position: 'absolute', top: -6, right: -6 },

  bottom: { marginTop: 'auto', paddingBottom: 16 },

  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    borderRadius: 22,
    justifyContent: 'center',
    gap: 8,
  },
  editText: { fontWeight: '500' },

  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE082',
    paddingVertical: 12,
    borderRadius: 22,
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },
  uploadText: { fontWeight: '500' },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  topBtn: {
    paddingRight: 2,
    paddingVertical: 4,
  },

  topTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  topRight: {
    flexDirection: 'row',
    gap: 10,
  },

  saveBtn: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },

  saveText: {
    fontSize: 13,
    fontWeight: '500',
  },

  postBtn: {
    backgroundColor: '#FFD54F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },

  postText: {
    fontSize: 13,
    fontWeight: '600',
  },

  previewContainer: {
    maxHeight: 120,
  },

  amountBox: {
    marginTop: 16,
  },

  amountTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },

  amountRow: {
    flexDirection: 'row',
    gap: 12,
  },

  amountItem: {
    flex: 1,
  },

  amountLabel: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },

  amountInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
  },
});
