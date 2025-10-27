import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function ChatSearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={22} color="white" />
      <TextInput
        placeholder="Search for chat"
        placeholderTextColor="white"
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
});
