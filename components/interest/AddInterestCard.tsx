import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function AddInterestCard() {
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleAddInterest = () => {
    if (!category || !keyword) {
      alert("Please fill in both fields");
      return;
    }
    console.log("New interest:", { category, keyword });
    // TODO: Call API here
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>NOT FOUND</Text>
      <Text style={styles.subtitle}>Do you want to add it to Interest?</Text>

      {/* Category input */}
      <View style={styles.field}>
        <Text style={styles.label}>
          Category <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Enter category"
        />
      </View>

      {/* Keyword input */}
      <View style={styles.field}>
        <Text style={styles.label}>
          Key word <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Enter keyword"
        />
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleAddInterest}>
        <Text style={styles.buttonText}>Add new interest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "stretch",
    marginHorizontal: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FF9F0A",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    fontSize: 15,
    marginBottom: 20,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  required: {
    color: "#FF9A00",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FF9A00",
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
