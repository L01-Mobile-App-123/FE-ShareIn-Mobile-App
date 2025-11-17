import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {/* 🔥 Header Gradient */}
      <LinearGradient
        colors={["#FFB547", "#FF8C00"]}
        style={styles.headerGradient}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Sign up</Text>
      </LinearGradient>

      {/* 🔥 Phần dưới bo tròn */}
      <View style={styles.content}>
        
        {/* Welcome text */}
        <Text style={styles.welcome}>Welcome to ShareIn,</Text>
        <Text style={styles.subtitle}>Hello there, create a new account</Text>

        {/* Illustration Image */}
        <Image
          source={require("../../assets/images/Illustration.png")}
          style={styles.illustration}
        />

        {/* Inputs */}
        <TextInput style={styles.input} placeholder="Name" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Phone number" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />

        {/* Sign up Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        {/* Sign Up */}
        <Text style={styles.bottomText}>
          Have an account?{" "}
          <Text
            style={{ color: "#FF9A00" }}
            onPress={() => router.push("/(auth)/LogInScreen")}
          >
            Log in
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB547",
  },

  /* Header gradient */
  headerGradient: {
    paddingTop: 55,
    paddingBottom: 60,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  backBtn: {
    position: "absolute",
    left: 20,
    top: 55,
    padding: 5,
  },

  headerTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    marginTop: 15,
  },

  /* Content box */
  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -40,
    paddingHorizontal: 25,
    paddingBottom: 30,
    paddingTop: 20,
  },

  welcome: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FF9A00",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    marginBottom: 15,
  },

  illustration: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginVertical: 20,
    resizeMode: "contain",
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

  forgot: {
    color: "#FF9A00",
    alignSelf: "flex-end",
    marginBottom: 20,
    marginTop: 5,
  },

  button: {
    backgroundColor: "#FF9A00",
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 8,
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff", fontWeight: "600", textAlign: "center" 
  },

  bottomText: {
    marginTop: 25,
    textAlign: "center",
    color: "#555",
    fontSize: 14,
  },
});
