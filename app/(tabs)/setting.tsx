import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SettingScreen() {
  const user = {
    name: "Nguyen Ha Thuy Linh",
    avatar: "https://i.pravatar.cc/200", // đổi link avatar thật ở đây
  };

  const menuItems = [
    { title: "Password", icon: "lock-closed-outline", route: "/password" },
    { title: "Setting profile", icon: "person-outline", route: "/profile-setting" },
    { title: "List of interest", icon: "heart-outline", route: "/InterestScreen" },
    { title: "Sign out", icon: "log-out-outline", route: "/(auth)/Onboarding" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header */}
      <LinearGradient colors={["#FFB547", "#FF8C00"]} style={styles.header}>
        {/* Header */}
        <Text style={styles.headerTitle}> Setting</Text>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      </LinearGradient>

      {/* Menu */}
      <View style={styles.subContainer}>
        <Text style={styles.userName}>{user.name}</Text>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={() => router.push(item.route as never)}>
              <Text style={styles.menuText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFb547",
  },
  header: {
    padding: 20,
    paddingVertical: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
  avatar: {
    alignSelf: "center",
    marginBottom: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  userName: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600",
    color: "#FF9F0A",
  },
  subContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -50,
    paddingBottom: 20,
  },
  menuContainer: {
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 1,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});
