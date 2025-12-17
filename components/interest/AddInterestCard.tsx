import { CATEGORY_OPTIONS, CATEGORY_UI_MAP } from '@/constants/category';
import { UserInterestService } from '@/services/userInterestService';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Modal,
  ActivityIndicator,
  Alert
} from 'react-native';

export default function AddInterestCard({ isFullWidth }: { isFullWidth?: boolean }) {
  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddInterest = async () => {
    if (!categoryId || !keyword) {
      alert('Please fill in both fields');
      return;
    }
    try {
      setLoading(true);
      await UserInterestService.addUserInterest(categoryId, keyword);
      Alert.alert('Success', 'Interest added successfully!');
      setKeyword('');
      setCategoryId(null);
    } catch (err) {
      Alert.alert('Error', 'Failed to add interest. Please try again.');
      console.log('Failed to update user interest:', err);
    } finally {
      setLoading(false);
    }
  };

  const SelectedCategory = ({ id }: { id: string }) => {
    const ui = CATEGORY_UI_MAP[id];

    return (
      <View style={styles.selectedRow}>
        <LinearGradient
          colors={ui.colors}
          style={styles.iconBox}
        >
          <Ionicons
            name={ui.icon as any}
            size={16}
            color="white"
          />
        </LinearGradient>

        <Text style={styles.selectedText}>
          {ui.label}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, isFullWidth ? { marginHorizontal: 0 } : { marginHorizontal: 16 }]} >
      {/* Header */}
      <Text style={styles.title}>NOT FOUND</Text>
      <Text style={styles.subtitle}>Do you want to add it to Interest?</Text>

      {/* Category input */}
      <View style={styles.field}>
        <Text style={styles.label}>
          Category <Text style={styles.required}>*</Text>
        </Text>

        <Pressable
          style={styles.dropdown}
          onPress={() => setOpen(true)}
        >
          {categoryId ? (
            <SelectedCategory id={categoryId} />
          ) : (
            <Text style={styles.placeholder}>
              Select category
            </Text>
          )}
        </Pressable>
      </View>

      {/* Keyword input */}
      <View style={styles.field}>
        <Text style={styles.label}>
          Key word <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Enter keyword"
        />
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddInterest}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Add Interest</Text>
        )}
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <Pressable
          style={styles.overlay}
          onPress={() => setOpen(false)}
        >
          <View style={styles.sheet}>
            {CATEGORY_OPTIONS.map((item) => (
              <Pressable
                key={item.id}
                style={styles.option}
                onPress={() => {
                  setCategoryId(item.id);
                  setOpen(false);
                }}
              >
                <LinearGradient
                  colors={item.colors}
                  style={[styles.iconBox, { width: 44, height: 44 }]}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={16}
                    color="white"
                  />
                </LinearGradient>

                <Text style={styles.optionText}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'stretch',
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF9F0A',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    textAlign: 'center',
    color: '#555',
    fontSize: 15,
    marginBottom: 20,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  required: {
    color: '#FF9A00',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF9A00',
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    justifyContent: "center",
  },

  placeholder: { color: "#999" },

  selectedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedText: {
    marginLeft: 8,
    fontWeight: "500",
  },

  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 24,
  },

  sheet: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 12,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  optionText: {
    marginLeft: 10,
  },
});
