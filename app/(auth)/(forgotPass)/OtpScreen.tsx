import { Ionicons } from "@expo/vector-icons";
import { Button } from "@react-navigation/elements";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function OtpScreen() {
  const [otp, setOtp] = useState("");
  const isValid = otp.trim().length > 0;

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
        <Text style={styles.label}>Type a code</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
            <TextInput
                value={otp}
                onChangeText={setOtp}
                placeholder="Enter your code"
                placeholderTextColor="#BDBDBD"
                style={[styles.input, { textAlign: 'center' }]}
            />
            <TouchableOpacity
            style={[styles.btn, { width: '30%', paddingHorizontal: 10, paddingVertical: 10, margin: 0 }]}
                onPress={() => {
                    setOtp("");
                    console.log("Resend OTP");
                }}
            >
                <Text style={styles.btnText}>Resend</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.smallText}>
          This code will expired 5 minutes after this message. If you don't get a message, please try again.
        </Text>

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
                    console.log("Send OTP:", otp);
                    router.push("/(auth)/(forgotPass)/PasswordScreen");
                }
            }}
            >
            <Text style={styles.btnText}>Send</Text>
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
