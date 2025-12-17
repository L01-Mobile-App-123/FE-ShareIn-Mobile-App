import PostList from '@/components/home/PostList';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import AddInterestCard from '@/components/interest/AddInterestCard';

export default function SearchScreen({ navigation }: any) {
  const [query, setQuery] = useState('');
  const [postListVisible, setPostListVisible] = useState(true);
  const [selectedType, setSelectedType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');

  const params = useLocalSearchParams();

  const handleSearch = (text: string) => {
    if (text.trim().toLowerCase() === 'table') {
      setPostListVisible(false);
    } else {
      setPostListVisible(true);
    }
  };

  useEffect(() => {
    if (params.filters) {
      try {
        const parsed = JSON.parse(params.filters as string);

        setCategory(parsed.category ?? '');
        setSelectedType(parsed.type ?? '');
        setStartDate(parsed.startDate ?? '');
        setEndDate(parsed.endDate ?? '');
      } catch (e) {
        console.warn('Error parsing filters:', e);
      }
    }
  }, [params.filters]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}> Search</Text>
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
            onChangeText={(text) => {
              setQuery(text);
              handleSearch(text);
            }}
            placeholder="Enter keyword..."
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: '/FilterScreen',
              params: {
                filters: JSON.stringify({
                  category,
                  selectedType,
                  startDate,
                  endDate,
                }),
              },
            });
          }}
        >
          <Ionicons name="filter" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {postListVisible ? <PostList /> : <AddInterestCard isFullWidth={false} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 40,
  },
  backArrow: {
    fontSize: 22,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  label: {
    color: '#666',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navButton: {
    alignItems: 'center',
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
