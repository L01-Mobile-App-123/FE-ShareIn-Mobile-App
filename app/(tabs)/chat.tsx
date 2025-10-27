import ChatItem from '@/components/chat/ChatItem';
import ChatSearchBar from '@/components/chat/ChatSearchBar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Giả lập dữ liệu API
const mockMessages = [
  { id: '1', name: 'Nguyên', message: 'New message received', avatar: 'https://i.pravatar.cc/100?img=1' },
  { id: '2', name: 'Lan', message: 'Hello! How are you?', avatar: 'https://i.pravatar.cc/100?img=2' },
  { id: '3', name: 'Minh', message: 'Let’s meet tomorrow', avatar: 'https://i.pravatar.cc/100?img=3' },
  { id: '4', name: 'An', message: 'Project update ready', avatar: 'https://i.pravatar.cc/100?img=4' },
  { id: '5', name: 'Nguyên', message: 'See you soon', avatar: 'https://i.pravatar.cc/100?img=5' },
  { id: '6', name: 'Minh', message: 'Let’s meet tomorrow', avatar: 'https://i.pravatar.cc/100?img=3' },
  { id: '7', name: 'An', message: 'Project update ready', avatar: 'https://i.pravatar.cc/100?img=4' },
  { id: '8', name: 'Nguyên', message: 'See you soon', avatar: 'https://i.pravatar.cc/100?img=5' },
];


export default function Chat() {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(mockMessages);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredData(mockMessages);
    } else {
      const lower = search.toLowerCase();
      const filtered = mockMessages.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) ||
          item.message.toLowerCase().includes(lower)
      );
      setFilteredData(filtered);
    }
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ChatSearchBar search={search} setSearch={setSearch} />
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatItem item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
});
