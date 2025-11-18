import React, { use, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";
import RNPickerSelect from 'react-native-picker-select';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function FilterScreen({ navigation }: any) {
  const [category, setCategory] = useState("Give away");
  const [type, setType] = useState('');

  const [time, setTime] = useState<string | null>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const categories = ["Exchange", "Give away", "Sell"];
  const times = ["1 week ago", "1 month ago", "1 year ago"];

  const itemTypes = [
    { label: "Chair", value: "chair" },
    { label: "Table", value: "table" },
    { label: "Laptop", value: "laptop" },
    { label: "Phone", value: "phone" },
    { label: "Clothes", value: "clothes" },
    { label: "Books", value: "books" },
    { label: "Bicycle", value: "bicycle" },
    { label: "Others", value: "others" },
  ];

  const params = useLocalSearchParams();
  
  useEffect(() => {
    if (!time) return;
    const now = dayjs();
    let start;
    switch (time) {
      case "1 week ago":
        start = now.subtract(1, "week");
        break;
      case "1 month ago":
        start = now.subtract(1, "month");
        break;
      case "1 year ago":
        start = now.subtract(1, "year");
        break;
      default:
        start = now;
    }
    setStartDate(start.format("DD/MM/YYYY"));
    setEndDate(now.format("DD/MM/YYYY"));
  }, [time]);

  const handleCustomDateChange = (type: "start" | "end", value: string) => {
    if (type === "start") setStartDate(value);
    if (type === "end") setEndDate(value);
    setTime(null); // reset preset selection
  };

  useEffect(() => {
    if (params.filters) {
      try {
        const parsed = JSON.parse(params.filters as string);

        setCategory(parsed.category ?? "");
        setType(parsed.selectedType ?? "");
        setStartDate(parsed.startDate ?? "");
        setEndDate(parsed.endDate ?? "");
      } catch (e) {
        console.warn("Error parsing filters:", e);
      }
    }
  }, [params.filters]); 

  useEffect(() => {
    if (!startDate || !endDate) return;

    const start = dayjs(startDate, "DD/MM/YYYY");
    const end = dayjs(endDate, "DD/MM/YYYY");

    if (!start.isValid() || !end.isValid()) {
      console.warn("Invalid date(s):", startDate, endDate);
      return;
    }

    const diffDays = end.diff(start, "day");

    if (diffDays === 7) setTime("1 week ago");
    else if (diffDays === 30 || diffDays === 31) setTime("1 month ago");
    else if (diffDays >= 364 && diffDays <= 366) setTime("1 year ago");
    else setTime(null); // custom range, không khớp preset
  }, [startDate, endDate]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}> Filter</Text>
      </View>

      {/* Category */}
      <View style={styles.section}>
        <View style={styles.row}>
          {categories.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => setCategory(c)}
              style={[
                styles.chip,
                category === c && styles.chipActive,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  category === c && styles.chipTextActive,
                ]}
              >
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Type */}
        <Text style={styles.label}>Type</Text>
        <View style={styles.dropdown}>
            <RNPickerSelect
            items={itemTypes}
            onValueChange={setType}
            value={type}
            style={{
                inputIOS: { ...styles.dropdownText, borderWidth: 0 },
                inputAndroid: {
                ...styles.dropdownText,
                borderWidth: 0,
                backgroundColor: "transparent",
                },
                inputWeb: {
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                appearance: "none", // ⚠️ cái này cực quan trọng
                WebkitAppearance: "none", // Safari fix
                MozAppearance: "none", // Firefox fix
                fontSize: 16,
                color: "#333",
                width: "100%",
                paddingRight: 28, // chừa chỗ cho icon
                },
                iconContainer: { top: 12, right: 8 },
            }}
            useNativeAndroidPickerStyle={false} 
            Icon={() => (
            <Ionicons name="chevron-down" size={24} color="#ddd" />
            )}
            placeholder={{ label: "Select item type", value: null }}
          />
        </View>

        {/* Time */}
        <Text style={styles.label}>Time</Text>
        <View style={styles.row}>
          {times.map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTime(t)}
              style={[
                styles.chip,
                time === t && styles.chipActive,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  time === t && styles.chipTextActive,
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dates */}
        <View style={styles.dateRow}>
          <View style={styles.dateBox}>
            <Text style={styles.label}>Start:</Text>
            <TextInput
                value={startDate}
                onChangeText={(text) => handleCustomDateChange("start", text)}
                style={styles.dateInput}
                placeholder="DD/MM/YYYY"
            />
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.label}>End:</Text>
            <TextInput
                value={endDate}
                onChangeText={(text) => handleCustomDateChange("end", text)}
                style={styles.dateInput}
                placeholder="DD/MM/YYYY"
            />
          </View>
        </View>
      </View>

      {/* Apply */}
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => {
            router.replace({
            pathname: '/(tabs)/search',
            params: {
              filters: JSON.stringify({
                category,
                type,
                startDate,
                endDate,
              }),
            },
          });
        }}
        >
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 40,
  },
  backArrow: {
    fontSize: 22,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  section: {
    marginTop: 10,
    marginLeft: 20, 
    marginRight: 20,
  },
  label: {
    marginTop: 16,
    marginBottom: 6,
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  chipActive: {
    backgroundColor: "#FF9A00",
    borderColor: "#FF9A00",
  },
  chipText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 6,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  dateBox: { flex: 1 },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: "#333",
  },
  applyButton: {
    backgroundColor: "#FF9A00",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 80,
    width: "80%",
    alignSelf: "center",
  },
  applyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
