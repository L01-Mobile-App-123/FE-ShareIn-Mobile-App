import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AddInterestCard from "./AddInterestCard";

export default function InterestListScreen() {
  const [showAddInterestCard, setShowAddInterestCard] = useState(false);

  const [interests, setInterests] = useState([
    { id: "1", name: "Giá phơi đồ", category: "NỘI THẤT" },
    { id: "2", name: "Bàn lớn", category: "NỘI THẤT" },
    { id: "3", name: "Máy rửa chén", category: "ĐIỆN GIA DỤNG" },
    { id: "4", name: "Tivi 4K", category: "ĐIỆN TỬ" },
    { id: "5", name: "Ghế sofa", category: "NỘI THẤT" },
    { id: "6", name: "Lò vi sóng", category: "ĐIỆN GIA DỤNG" },

  ]);

  const handleDelete = (id: string) => {
    setInterests((prev) => prev.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <LinearGradient colors={["#FFB547", "#FF8C00"]} style={styles.iconBox} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>
        Results <Text style={{ color: "#E85A5A" }}>{interests.length}</Text>
      </Text>

      {/* List */}
      <FlatList
        data={interests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      {/* Add new */}
      {showAddInterestCard === false ? (
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddInterestCard(true)}>
            <Text style={styles.addButtonText}>Add new interest</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddInterestCard(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}

      {showAddInterestCard && <AddInterestCard />}

      <View style={{ height: 50 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  itemCategory: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: "#B33030",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },
  addButton: {
    borderWidth: 1.2,
    borderColor: "#FF9A00",
    borderStyle: "dashed",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  addButtonText: {
    fontSize: 15,
    color: "#FF9A00",
    fontWeight: "600",
  },
  cancelButton: {
    borderWidth: 1.2,
    borderColor: "red",
    borderStyle: "dashed",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  cancelButtonText: {
    fontSize: 15,
    color: "red",
    fontWeight: "600",
  },
});
