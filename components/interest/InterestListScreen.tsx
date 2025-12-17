import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AddInterestCard from './AddInterestCard';
import { InterestItem, UserInterest, UserInterestService } from '@/services/userInterestService';
import { CATEGORY_UI_MAP } from '@/constants/category';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function InterestListScreen({
  query,
  onChangeQuery,
}: {
  query: string;
  onChangeQuery: (text: string) => void;
}) {
  const [showAddInterestCard, setShowAddInterestCard] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [interests, setInterests] = useState<InterestItem[]>([]);
  
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await loadUserInterests();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadUserInterests();
  }, []);

  const loadUserInterests = async () => {
    try {
      const data = await UserInterestService.getUserInterests();
      setInterests(data);
    } catch (err) {
      console.log('Load user interests failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId: string, keyWord: string) => {
    setInterests((prev) => prev.filter((item) => item.id !== `${categoryId}-${keyWord}`));
    try {
      setLoading(true);
      await UserInterestService.deleteUserInterest(categoryId, keyWord);
      Alert.alert('Success', 'Interest deleted successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to delete interest. Please try again.');
      console.log('Failed to update user interest:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: InterestItem}) => {
    const ui =
      CATEGORY_UI_MAP[item.category_id] ??
      CATEGORY_UI_MAP["55555555-5555-5555-5555-555555555555"];

    return (
      <View style={styles.item}>
        <LinearGradient
          colors={ui.colors}
          style={styles.iconBox}
        >
          <Ionicons
            name={ui.icon as any}
            size={22}
            color="white"
          />
        </LinearGradient>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.itemTitle}>{item.keyWord}</Text>
          <Text style={styles.itemCategory}>{ui.label}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.category_id, item.keyWord)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* List */}
      <FlatList
        data={interests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 40,
          flexGrow: 1,          // QUAN TRỌNG
        }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}> List interests</Text>
            </View>

            {/* Search input */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
              }}
            >
              <View style={styles.content}>
                <Text style={styles.label}>Search query</Text>
                <TextInput
                  value={query}
                  onChangeText={onChangeQuery}
                  placeholder="Enter keyword..."
                  style={styles.input}
                />
              </View>
            </View>

            <Text style={styles.label}>
              Your interests <Text style={{color: 'red'}}>({interests.length})</Text>
            </Text>
          </>
        }
        ListEmptyComponent={
          !loading ? (
            <Text style={{
              textAlign: "center",
              marginTop: 50,
              color: "#999",
            }}>
              No interests found. Please add your interests.
            </Text>
          ) : null
        }
      />

      {/* Add new */}
      {showAddInterestCard === false ? (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddInterestCard(true)}
        >
          <Text style={styles.addButtonText}>Add new interest</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setShowAddInterestCard(false)}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}

      {showAddInterestCard && <AddInterestCard isFullWidth={true} />}

      <View style={{ height: 30 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  headerText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemCategory: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: '#B33030',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#FFF',
    borderWidth: 1.2,
    borderColor: '#FF9A00',
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 15,
    color: '#FF9A00',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#FFF',
    borderWidth: 1.2,
    borderColor: 'red',
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cancelButtonText: {
    fontSize: 15,
    color: 'red',
    fontWeight: '600',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 45,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  icon: { fontSize: 20 },
  active: {
    backgroundColor: '#FF9A00',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  activeLabel: {
    fontSize: 12,
    color: '#fff',
  },
});
