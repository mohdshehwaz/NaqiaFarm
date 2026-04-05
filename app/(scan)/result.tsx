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

  if (!result) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text>No data found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const callOffice = () => {
    Linking.openURL("tel:+911234567890"); // 👈 number change kar lena
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 140,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 📸 Image */}
        {image && <Image source={{ uri: image }} style={styles.image} />}

        <Text style={styles.title}>🌿 Crop Analysis</Text>

        {/* Cards */}
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

        <View style={styles.card}>
          <Text style={styles.heading}>🧠 Summary</Text>
          <Text>{result.summary}</Text>
        </View>

        {/* 🎯 Confidence */}
        <Text style={styles.confidence}>
          Confidence: {result.confidence}
        </Text>

        {/* 🌿 IMPROVED Add Button */}
        <Pressable style={styles.addBtn}>
          <Ionicons name="leaf" size={22} color="#fff" />
          <Text style={styles.addText}>Add to My Plants</Text>
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

        {/* 📞 Call */}
        <Pressable style={styles.callBtn} onPress={callOffice}>
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.callText}>Call to Our Office</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  image: {
    width: "100%",
    height: 250,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    margin: 15,
    color: "#1b5e20",
  },

  card: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
  },

  heading: {
    fontWeight: "700",
    marginBottom: 5,
    color: "#1b5e20",
  },

  confidence: {
    margin: 15,
    color: "#2e7d32",
    fontWeight: "700",
  },

  // 🌿 ADD BUTTON (Improved)
  addBtn: {
    marginHorizontal: 16,
    marginTop: 5,
    backgroundColor: "#2e7d32",
    height: 55,
    borderRadius: 30,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    elevation: 4,
  },

  addText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },

  // 🔥 Bottom
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

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

  callBtn: {
    flex: 1,
    marginLeft: 12,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3f7f63",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  callText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});