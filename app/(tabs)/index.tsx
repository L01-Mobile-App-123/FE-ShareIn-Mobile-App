import HomeHeader from '@/components/home/HomeHeader';
import PostList from '@/components/home/PostList';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [text, setText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <HomeHeader value={text} onChangeText={setText} />
        <PostList />
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
    paddingHorizontal: 5,
  },
});