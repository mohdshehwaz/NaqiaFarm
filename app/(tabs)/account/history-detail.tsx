import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function HistoryDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  
  // Data nikalte waqt safety check
  let item = null;
  try {
    item = params.data ? JSON.parse(params.data as string) : null;
  } catch (e) {
    console.log("Parsing error:", e);
  }

  // Agar item nahi milta toh screen khali na dikhe
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
          <Ionicons name="arrow-back" size={24} color="#1b5e20" />
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
            <Text style={{ color: "#666" }}>No Image</Text>
          </View>
        )}
        
        <View style={styles.content}>
          <View style={styles.statusRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.identification || "N/A"}</Text>
            </View>
            <Text style={styles.confidenceText}>Accuracy: {item.confidence || "0%"}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>⚠️ Problem Detected</Text>
            <Text style={styles.value}>{item.problem || "No problem identified"}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>💊 Suggested Treatment</Text>
            <Text style={styles.value}>{item.treatment || "No treatment suggested"}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>🧠 AI Summary</Text>
            <Text style={styles.value}>{item.summary || "No summary available"}</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.date}>
              Scanned on: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Unknown"}
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
    paddingVertical: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: "#f0f0f0" 
  },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1b5e20" },
  mainImage: { width: "100%", height: 300 },
  content: { 
    padding: 20, 
    marginTop: -30, 
    backgroundColor: "#fff", 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    minHeight: 500 
  },
  statusRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  badge: { backgroundColor: "#e8f5e9", paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  badgeText: { color: "#2e7d32", fontWeight: "bold", fontSize: 16 },
  confidenceText: { color: "#666", fontWeight: "600" },
  section: { marginBottom: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: "#f9f9f9" },
  label: { fontSize: 16, fontWeight: "700", color: "#1b5e20", marginBottom: 6 },
  value: { fontSize: 15, color: "#444", lineHeight: 22 },
  footer: { marginTop: 20, alignItems: "center", paddingBottom: 40 },
  date: { color: "#999", fontSize: 13 }
});