import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../../assets/images/onboarding1.png"),
    title: "Don’t let your unused items gather dust.",
    description:
      "ShareIN helps you buy, sell, and exchange secondhand goods easily — save money while helping the planet.",
  },
  {
    id: "2",
    image: require("../../assets/images/onboarding2.png"),
    title: "Thousands of quality items updated daily.",
    description:
      "With ShareIN, you can shop smarter, cheaper, and safer in just a few taps.",
  },
  {
    id: "3",
    image: require("../../assets/images/onboarding3.png"),
    title: "Connecting people through sharing.",
    description:
      "Find someone who has what you need and exchange what you don’t use.",
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      router.replace("/Splash");
    }
  };


  /** ✅ Bỏ qua onboarding */
  const handleSkip = () => {
    router.replace("/Splash");
  };

  /** ✅ Bổ sung getItemLayout để scrollToIndex hoạt động ổn định */
  const getItemLayout = (_: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        ref={flatListRef}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        )}
        getItemLayout={getItemLayout}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      />

      {/* Dots indicator */}
      <View style={styles.indicatorContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>
            {currentIndex === slides.length - 1 ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  slide: {
    width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 50,
  },
  image: { width: "100%", height: 300, marginBottom: 30, marginTop: 200,resizeMode: "contain" },
  title: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600",
    color: "#FF9A00",
    textAlign: "center",
    marginBottom: 10,
  },
  desc: {
    textAlign: "center",
    color: "#555",
    fontSize: 16,
    lineHeight: 24,
  },
  indicatorContainer: {
    width: "100%",
    alignContent: "center",
    flexDirection: "row", 
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", 
    bottom: 200
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#FF9A00",
    width: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    alignItems: "center",
  },
  nextBtn: {
    backgroundColor: "#FF9A00",
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  nextText: { color: "#fff", fontWeight: "600" },
  skipBtn: { marginTop: 10 },
  skipText: { color: "#FF9A00", fontWeight: "500" },
});
