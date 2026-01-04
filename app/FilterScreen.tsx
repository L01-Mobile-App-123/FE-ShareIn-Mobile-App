import React, { use, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import RNPickerSelect from 'react-native-picker-select';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { CategoryDropdown } from '@/components/interest/AddInterestCard';

dayjs.extend(customParseFormat);

export default function FilterScreen({ navigation }: any) {
  const [selectedType, setSelectedType] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');

  const params = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setQuery('');
      setCategory('');
      setSelectedType('');
      setTimeRange('');
      setMinPrice('');
      setMaxPrice('');
      setSortBy('');
    } finally {
      setRefreshing(false);
    }
  };

  const type = [
    { label: 'Sell', value: 'BAN_RE' },
    { label: 'Free', value: 'CHO_MIEN_PHI' },
    { label: 'Exchange', value: 'DOI_DO' },
  ];

  const times = [
    {
      label: '7 Days',
      value: '7days',
    },
    {
      label: '30 Days',
      value: '30days',
    },
    {
      label: 'All Time',
      value: 'all',
    },
  ];

  const sortOptions = [
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Newest First', value: 'newest' },
    { label: 'Oldest First', value: 'oldest' },
  ];

  useEffect(() => {
    if (params.filters) {
      try {
        const parsed = JSON.parse(params.filters as string);
        setQuery(parsed.query ?? '');
        setCategory(parsed.category ?? '');
        setSelectedType(parsed.selectedType ?? '');
        setTimeRange(parsed.timeRange ?? '');
        setMinPrice(parsed.minPrice ?? '');
        setMaxPrice(parsed.maxPrice ?? '');
        setSortBy(parsed.sortBy ?? '');
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
      <View>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}> Filter</Text>
        </View>

        {/* Category */}
        <View style={styles.section}>
          {/* type */}
          <Text style={styles.label}>Type</Text>
          <View style={styles.row}>
            {type.map((t) => (
              <TouchableOpacity
                key={t.label}
                onPress={() => setSelectedType(t.value)}
                style={[
                  styles.chip,
                  selectedType === t.value && styles.chipActive,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedType === t.value && styles.chipTextActive,
                  ]}
                >
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Category */}
          <Text style={styles.label}>Category</Text>
          <CategoryDropdown
            categoryId={category}
            setCategoryId={setCategory}
            isShowLabel={false}
          />

          {/* Time */}
          <Text style={[styles.label, { marginTop: 0 }]}>Time</Text>
          <View style={styles.row}>
            {times.map((t) => (
              <TouchableOpacity
                key={t.label}
                onPress={() => setTimeRange(t.value)}
                style={[
                  styles.chip,
                  timeRange === t.value && styles.chipActive,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    timeRange === t.value && styles.chipTextActive,
                  ]}
                >
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Price Range */}
          <Text style={styles.label}>Price Range</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.dateInput}
              placeholder="Min Price"
              keyboardType="numeric"
              value={minPrice}
              onChangeText={setMinPrice}
            />
            <TextInput
              style={styles.dateInput}
              placeholder="Max Price"
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={setMaxPrice}
            />
          </View>

          {/* Sort By */}
          <Text style={styles.label}>Sort By</Text>
          <View style={styles.dropdown}>
            <RNPickerSelect
              items={sortOptions}
              onValueChange={setSortBy}
              value={sortBy}
              style={{
                inputIOS: { ...styles.dropdownText, borderWidth: 0 },
                inputAndroid: {
                  ...styles.dropdownText,
                  borderWidth: 0,
                  backgroundColor: 'transparent',
                },
                inputWeb: {
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  appearance: 'none', // ⚠️ cái này cực quan trọng
                  WebkitAppearance: 'none', // Safari fix
                  MozAppearance: 'none', // Firefox fix
                  fontSize: 16,
                  color: '#333',
                  width: '100%',
                  paddingRight: 28, // chừa chỗ cho icon
                },
                iconContainer: { top: 12, right: 8 },
              }}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <Ionicons name="chevron-down" size={24} color="#ddd" />
              )}
              placeholder={{ label: 'Select sort option', value: null }}
            />
          </View>
        </View>

        {/* Apply */}
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => {
            router.replace({
              pathname: '/(tabs)/search',
              params: {
                filters: JSON.stringify({
                  query,
                  category,
                  selectedType,
                  timeRange,
                  minPrice,
                  maxPrice,
                  sortBy,
                }),
              },
            });
          }}
        >
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
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
  section: {
    marginLeft: 20,
    marginRight: 20,
  },
  label: {
    marginTop: 16,
    marginBottom: 6,
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  chipActive: {
    backgroundColor: '#FF9A00',
    borderColor: '#FF9A00',
  },
  chipText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 6,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  dateBox: { flex: 1 },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#333',
    width: '48%',
  },
  applyButton: {
    backgroundColor: '#FF9A00',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 80,
    width: '80%',
    alignSelf: 'center',
  },
  applyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
