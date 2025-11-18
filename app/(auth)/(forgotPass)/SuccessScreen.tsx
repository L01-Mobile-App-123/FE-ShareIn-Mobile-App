import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";

export default function SuccessScreen() {

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backArrow}
        >
          <Ionicons name="chevron-back" size={26} color="#333" />
        </TouchableOpacity>

        <Text style={styles.title}>Forgot password</Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        {/* Illustration Image */}
        <Image
            source={require("../../../assets/images/Illustration1.png")}
            style={styles.illustration}
        />

        <Text style={styles.label}>Change password successfully!</Text>

        <Text style={styles.smallText}>
          You have successfully change password. Please use the new password when signing in.
        </Text>

        {/* BUTTON SEND */}
        <TouchableOpacity
            style={styles.btn}
            onPress={() => {
                router.push("/(auth)/LogInScreen");
            }}
            >
            <Text style={styles.btnText}>Ok</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  /** HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 12,
  },
  backArrow: {
    fontSize: 32,
    color: "#222",
    marginTop: -4,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#222",
  },

  /** CARD */
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 22,
    marginTop: 24,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  illustration: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginVertical: 20,
    resizeMode: "contain",
  },

  label: {
    fontSize: 20,
    color: "#FF9A00",
    fontWeight: "500",
  },

  input: {
    borderWidth: 1,
    borderColor: "cacaca",
    borderRadius: 12,
    padding: 14,
    marginVertical: 10,
    backgroundColor: "white",
    fontSize: 16,
    fontWeight: "500",
    color: "grey",
  },

  smallText: {
    marginTop: 18,
    fontSize: 16,
    color: "#333",
  },

  btn: {
    backgroundColor: "#FF9A00",
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 8,
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
  },
  btnText: {
    color: "#fff", fontWeight: "600", textAlign: "center" 
  },
});
