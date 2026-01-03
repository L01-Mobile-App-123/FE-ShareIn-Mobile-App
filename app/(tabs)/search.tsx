import PostItem, { Post } from '@/components/home/PostItem';
import PostList from '@/components/home/PostList';
import AddInterestCard from '@/components/interest/AddInterestCard';
import { SearchService } from '@/services/searchService';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [postList, setPostList] = useState<Post[]>([]);
  const [showAddnewInterest, setShowAddnewInterest] = useState(false);

  const [selectedType, setSelectedType] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [category, setCategory] = useState('');

  const params = useLocalSearchParams();

  const [refreshing, setRefreshing] = useState(false);

  const loadingRef = useRef(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);

  const fetchHistory = async () => {
    const history = await SearchService.getSearchHistory();
    setHistory(history);
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setPostList([]);
      pageRef.current = 1;
      setHasMore(true);
      await fetchHistory();
    } finally {
      setRefreshing(false);
    }
  };

  const handleSearch = async (text: string) => {
    const suggestions = await SearchService.getSuggestions(text);
    setSuggestions(suggestions);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (params.filters) {
      try {
        const parsed = JSON.parse(params.filters as string);

        setCategory(parsed.category ?? '');
        setSelectedType(parsed.type ?? '');
        setMinPrice(parsed.minPrice ?? '');
        setMaxPrice(parsed.maxPrice ?? '');
        setSortBy(parsed.sortBy ?? '');
        setTimeRange(parsed.timeRange ?? '');
      } catch (e) {
        console.warn('Error parsing filters:', e);
      }
    }
  }, [params.filters]);

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
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}> Search</Text>
        </View>

        {/* Search input */}
        <Text style={styles.label}>Search query</Text>
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
            onPress={async () => {
              const data = await SearchService.search({ keyword: query, transactionType: selectedType, categoryId: category, timeRange, sortBy, minPrice: minPrice ? Number(minPrice) : undefined, maxPrice: maxPrice ? Number(maxPrice) : undefined, page: 1, limit: 20 });
              setPostList(data.items);
              setSuggestions([]);
              setHistory([]);
              setShowAddnewInterest(data.items.length === 0);
              setHasMore(data.items.length >= 20);
            }}
            style={{ marginLeft: 10, backgroundColor: '#eee', padding: 10, borderRadius: 10 }}
          >
            <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: '/FilterScreen',
                params: {
                  filters: JSON.stringify({
                    category,
                    selectedType,
                    timeRange,
                    minPrice,
                    maxPrice,
                    sortBy
                  }),
                },
              });
            }}
            style={{ marginLeft: 10, backgroundColor: '#eee', padding: 10, borderRadius: 10 }}
          >
            <Ionicons name="filter" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        
        {/* Pop up suggestions */}
        {suggestions.length > 0 && (
          <View style={{ padding: 20 }}>
            {suggestions.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setQuery(item); 
                  handleSearch(item);
                }}
                style={{ paddingVertical: 6 }}
              >
                <Text style={{ fontSize: 14, color: '#555' }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {history.length > 0 &&  (
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
              Recent Searches
            </Text>
            {history.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setQuery(item);
                  handleSearch(item);
                }}
                style={{ paddingVertical: 6 }}
              >
                <Text style={{ fontSize: 14, color: '#555' }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {postList.map((item) => (
          <PostItem key={item.post_id} item={item} />
        ))}

        <>
          {loadingRef.current ? (
            <ActivityIndicator style={{ marginVertical: 16 }} />
          ) : null}

          {!hasMore && !loadingRef.current ? (
            <Text
              style={{
                textAlign: 'center',
                color: '#888',
                marginVertical: 12,
                fontSize: 12,
              }}
            >
              There is nothing more to show
            </Text>
          ) : null}

          {hasMore ? (
            <TouchableOpacity
              onPress={async () => {
                loadingRef.current = true;
                const data = await SearchService.search({ keyword: query, transactionType: selectedType, categoryId: category, timeRange, sortBy, minPrice: minPrice ? Number(minPrice) : undefined, maxPrice: maxPrice ? Number(maxPrice) : undefined, page: pageRef.current + 1, limit: 20 });
                setPostList((prev) => [...prev, ...data.items]);
                setHasMore(data.items.length >= 20);
                loadingRef.current = false;
                pageRef.current += 1;
              }}
              style={{ padding: 12, alignItems: 'center' }}
            >
              <Ionicons name="arrow-forward" size={24} color="#333" />
            </TouchableOpacity>
          ) : null}

          {pageRef.current !== 1 ? (
            <TouchableOpacity
              onPress={async () => {
                loadingRef.current = true;
                const data = await SearchService.search({ keyword: query, transactionType: selectedType, categoryId: category, timeRange, sortBy, minPrice: minPrice ? Number(minPrice) : undefined, maxPrice: maxPrice ? Number(maxPrice) : undefined, page: pageRef.current - 1, limit: 20 });
                setPostList((prev) => [...prev, ...data.items]);
                setHasMore(data.items.length >= 20);
                loadingRef.current = false;
                pageRef.current -= 1;
              }}
              style={{ padding: 12, alignItems: 'center' }}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          ) : null}
        </>


        {showAddnewInterest && <AddInterestCard />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
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
  },
  label: {
    color: '#666',
    fontSize: 14,
    marginBottom: 6,
    paddingHorizontal: 20,
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
