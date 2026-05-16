import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Naye C# model ke according typescript interface
interface HistoryDetailItem {
  cropName: string;
  disease: string;
  confidence: string;
  recommendedFertilizer: string;
  treatmentSteps: string;
  summary: string;
  filePath: string;
  createdAt: string;
}

export default function HistoryDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  
  let item: HistoryDetailItem | null = null;
  try {
    if (params.data) {
      const parsed = JSON.parse(params.data as string);
      
      // 🎯 Safe Mapping: Backend PascalCase aur frontend camelCase dono ko ek sath handle kiya
      item = {
        cropName: parsed.cropName || parsed.CropName,
        disease: parsed.disease || parsed.Disease,
        confidence: parsed.confidence || parsed.Confidence,
        recommendedFertilizer: parsed.recommendedFertilizer || parsed.RecommendedFertilizer,
        treatmentSteps: parsed.treatmentSteps || parsed.TreatmentSteps,
        summary: parsed.summary || parsed.Summary,
        filePath: parsed.filePath || parsed.FilePath,
        createdAt: parsed.createdAt || parsed.CreatedAt,
      };
    }
  } catch (e) {
    console.log("Parsing error:", e);
  }

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={{ color: "#000" }}>No Data Available</Text>
          <Pressable onPress={() => router.back()} style={{ marginTop: 20 }}>
            <Text style={{ color: "blue" }}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>Scan Result</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Check */}
        {item.filePath ? (
          <Image source={{ uri: item.filePath }} style={styles.mainImage} />
        ) : (
          <View style={[styles.mainImage, styles.center, { backgroundColor: '#eee' }]}>
            <Ionicons name="image-outline" size={40} color="#999" />
            <Text style={{ color: "#666", marginTop: 5 }}>No Image Available</Text>
          </View>
        )}
        
        <View style={styles.content}>
          <View style={styles.statusRow}>
            {/* 🌾 Identification ki jagah Crop Name ka Badge */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.cropName || "Unknown Crop"}</Text>
            </View>
            <Text style={styles.confidenceText}>Accuracy: {item.confidence || "0%"}</Text>
          </View>

          {/* ⚠️ Problem Detected (Disease Name) */}
          <View style={styles.section}>
            <Text style={styles.label}>⚠️ Problem Detected</Text>
            <Text style={styles.value}>{item.disease || "Healthy / No problem identified"}</Text>
          </View>

          {/* 🧪 Recommended Fertilizer Section (🔥 Naya Section Joda!) */}
          {item.recommendedFertilizer && (
            <View style={styles.section}>
              <Text style={styles.label}>🧪 Recommended Fertilizer & Nutrients</Text>
              <Text style={styles.value}>{item.recommendedFertilizer}</Text>
            </View>
          )}

          {/* 💊 Treatment Steps */}
          <View style={styles.section}>
            <Text style={styles.label}>💊 Suggested Treatment Steps</Text>
            <Text style={styles.value}>{item.treatmentSteps || "No treatment suggested"}</Text>
          </View>

          {/* 🧠 AI Summary */}
          {item.summary && (
            <View style={styles.section}>
              <Text style={styles.label}>🧠 Detailed Summary & Reasons</Text>
              <Text style={styles.value}>{item.summary}</Text>
            </View>
          )}

          <View style={styles.footer}>
            <Text style={styles.date}>
              Scanned on: {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : "Unknown"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 15,
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: "#f0f0f0" 
  },
  backBtn: { padding: 5 },
  // Header text charcoal black kiya
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333" }, 
  mainImage: { width: "100%", height: 320 },
  content: { 
    padding: 20, 
    marginTop: -30, 
    backgroundColor: "#fff", 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    minHeight: 500,
    // Add simple shadow effect to the sheet container
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  statusRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  badge: { backgroundColor: "#e8f5e9", paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  badgeText: { color: "#2e7d32", fontWeight: "bold", fontSize: 15 },
  confidenceText: { color: "#666", fontWeight: "600" },
  section: { marginBottom: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: "#f9f9f9" },
  // 🎯 UI Fix: Green hata kar heading text ko bold charcoal dark (#333) kiya
  label: { fontSize: 16, fontWeight: "700", color: "#333", marginBottom: 6 }, 
  value: { fontSize: 15, color: "#444", lineHeight: 22 },
  footer: { marginTop: 20, alignItems: "center", paddingBottom: 40 },
  date: { color: "#999", fontSize: 13 }
});