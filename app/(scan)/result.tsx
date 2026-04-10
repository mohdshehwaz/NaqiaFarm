import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Linking,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function ResultScreen() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  let result = null;

  try {
    result = params?.data ? JSON.parse(params.data as string) : null;
  } catch (e) {
    console.log(e);
  }

  const image = params?.image as string;

  const callOffice = () => {
    Linking.openURL("tel:+911234567890"); // 👈 Number change kar lena
  };

  if (!result) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text>No data found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 📸 Image */}
        {image && <Image source={{ uri: image }} style={styles.image} />}

        <Text style={styles.title}>🌿 Crop Analysis</Text>

        {/* Cards (Identification, Problem, etc.) */}
        <View style={styles.card}>
          <Text style={styles.heading}>🔍 Identification</Text>
          <Text>{result.identification}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>⚠️ Problem</Text>
          <Text>{result.problem}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>💊 Treatment</Text>
          <Text>{result.treatment}</Text>
        </View>

        {/* 🎯 Confidence */}
        <Text style={styles.confidence}>
          Confidence: {result.confidence}
        </Text>

        {/* 📞 Call Button (Ab ye upar aa gaya hai) */}
        <Pressable style={styles.callBtnMain} onPress={callOffice}>
          <Ionicons name="call" size={22} color="#fff" />
          <Text style={styles.btnText}>Call to Our Office</Text>
        </Pressable>
      </ScrollView>

      {/* 🔥 Bottom Sticky Buttons */}
      <View
        style={[
          styles.bottomContainer,
          { paddingBottom: insets.bottom + 10 },
        ]}
      >
        {/* 📷 Camera */}
        <Pressable
          style={styles.cameraBtn}
          onPress={() => router.replace("/(scan)/camera")}
        >
          <Ionicons name="camera" size={24} color="#1b5e20" />
        </Pressable>

        {/* 🌿 My Plant Disease (Ab ye bottom bar mein hai) */}
        <Pressable 
          style={styles.historyBtn} 
          onPress={() => router.push("/(tabs)/account/history")} // 👈 Path check kar lena
        >
          <Ionicons name="leaf" size={20} color="#fff" />
          <Text style={styles.btnText}>My Plant Disease</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... (purane styles same hain)
  safe: { flex: 1, backgroundColor: "#f5f5f5" },
  image: { width: "100%", height: 250 },
  title: { fontSize: 22, fontWeight: "700", margin: 15, color: "#1b5e20" },
  card: { backgroundColor: "white", marginHorizontal: 15, marginVertical: 8, padding: 15, borderRadius: 12, elevation: 3 },
  heading: { fontWeight: "700", marginBottom: 5, color: "#1b5e20" },
  confidence: { margin: 15, color: "#2e7d32", fontWeight: "700" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  // 📞 Upar wala Call Button
  callBtnMain: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: "#3f7f63", // Darker green
    height: 55,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  // 🔥 Bottom Container
  bottomContainer: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },

  cameraBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },

  // 🌿 My Plant Disease Button (Bottom Bar)
  historyBtn: {
    flex: 1,
    marginLeft: 12,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2e7d32", // Primary green
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});