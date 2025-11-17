import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Logo.png")}
        style={{ width: 400, height: 400, marginBottom: 30 }}
      />
      <Text style={styles.title}>Create your ShareIN account</Text>
      <Text style={styles.desc}>
        ShareIN is a powerful tool that allows you to easily share your old utensils with friends.
      </Text>

      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={() => router.push("/(auth)/SignUpScreen")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => router.push("/(auth)/LogInScreen")}
      >
        <Text style={styles.buttonSecondaryText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        By continuing, you accept our{" "}
        <Text style={{ color: "#F2A03D" }}>Terms of Service</Text> and{" "}
        <Text style={{ color: "#F2A03D" }}>Privacy Policy</Text>.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700", color: "#FF9A00", marginBottom: 8, textAlign: "center" },
  desc: { fontSize: 16, textAlign: "center", color: "#666", marginBottom: 24 },
  buttonPrimary: {
    backgroundColor: "#FF9A00",
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontWeight: "600", textAlign: "center" },
  buttonSecondary: {
    borderColor: "#FF9A00",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonSecondaryText: { color: "#F2A03D", textAlign: "center", fontWeight: "600" },
  terms: { color: "#888", textAlign: "center", fontSize: 14, marginTop: 20 },
});
