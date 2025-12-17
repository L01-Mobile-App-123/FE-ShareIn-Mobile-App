import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import InterestListScreen from '@/components/interest/InterestListScreen';

export default function InterestScreen() {
  const [query, setQuery] = useState('');

  const handleSearch = (text: string) => {
    setQuery(text);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <InterestListScreen
        query={query}
        onChangeQuery={(text) => {
          handleSearch(text);
        }}
      />
    </KeyboardAvoidingView>
  );
}
