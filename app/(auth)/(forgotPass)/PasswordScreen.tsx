import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function PasswordScreen() {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const isValid = pass.trim().length > 0 && pass === confirmPass;

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
        <Text style={styles.label}>Type your password</Text>

        <TextInput
          value={pass}
          onChangeText={setPass}
          placeholder="Enter your password"
          placeholderTextColor="#BDBDBD"
          style={styles.input}
          secureTextEntry={true}
        />

        <TextInput
          value={confirmPass}
          onChangeText={setConfirmPass}
          placeholder="Confirm your password"
          placeholderTextColor="#BDBDBD"
          style={styles.input}
          secureTextEntry={true}
        />

        {/* BUTTON SEND */}
        <TouchableOpacity
            disabled={!isValid}
            style={[
                styles.btn,
                { 
                opacity: isValid ? 1 : 0.4,
                backgroundColor: isValid ? "#FF9A00" : "#F6E9D2"
                }
            ]}
            onPress={() => {
                if (isValid) {
                    console.log("Send password:", pass);
                    router.push("/(auth)/(forgotPass)/SuccessScreen");
                }
            }}
            >
            <Text style={styles.btnText}>Change password</Text>
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

  label: {
    fontSize: 13,
    color: "#7A7A7A",
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
    fontSize: 14,
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
