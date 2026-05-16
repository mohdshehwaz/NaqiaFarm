import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Linking,
  BackHandler,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface PlantAnalysisResult {
  cropName: string;
  disease: string;
  confidence: string;
  recommendedFertilizer: string;
  treatmentSteps: string;
  summary: string;
}

export default function ResultScreen() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  let result: PlantAnalysisResult | null = null;

  useEffect(() => {
    const handleBack = () => {
      router.replace("/(tabs)/home");
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () => backHandler.remove();
  }, []);

  try {
    const rawData = params?.data;
    if (rawData) {
      const dataStr = Array.isArray(rawData) ? rawData[0] : rawData;
      const parsed = JSON.parse(dataStr);

      result = {
        cropName: parsed.cropName || parsed.CropName,
        disease: parsed.disease || parsed.Disease,
        confidence: parsed.confidence || parsed.Confidence,
        recommendedFertilizer: parsed.recommendedFertilizer || parsed.RecommendedFertilizer,
        treatmentSteps: parsed.treatmentSteps || parsed.TreatmentSteps,
        summary: parsed.summary || parsed.Summary,
      };
    }
  } catch (e) {
    console.log("Parse Error:", e);
  }

  const image = Array.isArray(params?.image) ? params.image[0] : params.image;
  const callOffice = () => Linking.openURL("tel:+919718060881");

  if (!result) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={{ fontSize: 16, color: '#666' }}>Analysis data missing</Text>
          <Pressable 
            style={{ marginTop: 15, padding: 12, backgroundColor: '#2e7d32', borderRadius: 8 }}
            onPress={() => router.replace("/(tabs)/home")}
          >
            <Text style={{ color: '#fff' }}>Go Back Home</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Pressable 
        style={[styles.closeIcon, { top: insets.top + 10 }]} 
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Ionicons name="close-circle" size={40} color="rgba(0,0,0,0.5)" />
      </Pressable>

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        
        <View style={{ padding: 15 }}>
          <Text style={styles.title}>🌿 Crop Analysis</Text>
          
          {/* 1. Crop Name Card */}
          <View style={styles.card}>
            <Text style={styles.heading}>🔍 Identification</Text>
            <Text style={styles.bodyText}>{result.cropName}</Text>
          </View>

          {/* 2. Disease Card */}
          <View style={styles.card}>
            <Text style={styles.heading}>⚠️ Problem</Text>
            <Text style={styles.bodyText}>{result.disease}</Text>
          </View>

          {/* 3. Recommended Fertilizer Card */}
          {result.recommendedFertilizer && (
            <View style={styles.card}>
              <Text style={styles.heading}>🧪 Recommended Fertilizer</Text>
              <Text style={styles.bodyText}>{result.recommendedFertilizer}</Text>
            </View>
          )}

          {/* 4. Treatment Steps Card */}
          <View style={styles.card}>
            <Text style={styles.heading}>💊 Treatment Steps</Text>
            <Text style={styles.bodyText}>{result.treatmentSteps}</Text>
          </View>

          {/* 5. Summary Card */}
          {result.summary && (
            <View style={styles.card}>
              <Text style={styles.heading}>🧠 Summary & Reasons</Text>
              <Text style={styles.bodyText}>{result.summary}</Text>
            </View>
          )}

          <Text style={styles.confidence}>Confidence: {result.confidence}</Text>
          
          <Pressable style={styles.callBtnMain} onPress={callOffice}>
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.btnText}>Call Our Office</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 10 }]}>
        <Pressable style={styles.cameraBtn} onPress={() => router.replace("/(scan)/camera")}>
          <Ionicons name="camera" size={26} color="#1b5e20" />
        </Pressable>
        <Pressable style={styles.historyBtn} onPress={() => router.push("/(tabs)/account/history")}>
          <Ionicons name="leaf" size={20} color="#fff" />
          <Text style={styles.btnText}>My Plant Disease</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8f9fa" },
  image: { width: "100%", height: 320, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  closeIcon: { position: 'absolute', right: 20, zIndex: 60 },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 15, color: "#333" },
  card: { backgroundColor: "white", marginBottom: 12, padding: 18, borderRadius: 16, elevation: 2 },
  // 🎯 Headings ka color wapas pehle jise clean charcoal dark gray (#333) kar diya hai
  heading: { fontSize: 16, fontWeight: "700", marginBottom: 6, color: "#333" }, 
  bodyText: { fontSize: 15, color: '#444', lineHeight: 22 },
  confidence: { marginVertical: 10, color: "#666", fontStyle: 'italic' },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  callBtnMain: { marginTop: 15, backgroundColor: "#3f7f63", height: 55, borderRadius: 30, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  bottomContainer: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 12, backgroundColor: "#ffffff", borderTopLeftRadius: 25, borderTopRightRadius: 25, elevation: 20 },
  cameraBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#e8f5e9", alignItems: "center", justifyContent: "center" },
  historyBtn: { flex: 1, marginLeft: 15, height: 60, borderRadius: 30, backgroundColor: "#2e7d32", flexDirection: "row", alignItems: "center", justifyContent: "center" },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "700", marginLeft: 8 },
});