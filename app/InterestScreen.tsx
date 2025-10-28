import PostList from "@/components/home/PostList";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";
import AddInterestCard from "@/components/interest/AddInterestCard";
import InterestListScreen from "@/components/interest/InterestListScreen";

export default function InterestScreen({ navigation }: any) {
  const [query, setQuery] = useState("");

  const handleSearch = (text: string) => {
    setQuery(text);
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}> List interests</Text>
      </View>

      {/* Search input */}
      <View style={{ flexDirection: "row", alignItems: "center", width: '100%', paddingHorizontal: 20, justifyContent: 'space-between' }}>
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
      </View>

      <InterestListScreen />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  label: {
    color: "#666",
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  icon: { fontSize: 20 },
  active: {
    backgroundColor: "#FF9A00",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  activeLabel: {
    fontSize: 12,
    color: "#fff",
  },
});