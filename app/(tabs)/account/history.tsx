import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// C# Entity ke hisaab se Interface
interface PlantScanHistory {
  id: number;
  mobileNumber: string;
  filePath: string;
  identification: string;
  problem: string;
  treatment: string;
  summary: string;
  confidence: string;
  createdAt: string;
}

export default function HistoryScreen() {
  const router = useRouter();
  const [history, setHistory] = useState<PlantScanHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      // 👈 Yahan apni API call lagayein:
      // const res = await fetch(`https://your-api.com/api/history/99999999`);
      // const data = await res.json();
      
      // Dummy Data Testing ke liye
      const dummyData: PlantScanHistory[] = [
        {
          id: 1,
          mobileNumber: "99999999",
          filePath: "https://ghoulbucketweb.s3.ap-southeast-2.amazonaws.com/PlantHistory/ce5f2745-5347-47fe-b284-97ba0677ba0c.jpg",
          identification: "Sugarcane",
          problem: "Red Rot",
          treatment: "Use healthy seeds and fungicides.",
          summary: "Fungal infection detected in the stalk.",
          confidence: "95%",
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          mobileNumber: "99999999",
          filePath: "https://ghoulbucketweb.s3.ap-southeast-2.amazonaws.com/PlantHistory/ce5f2745-5347-47fe-b284-97ba0677ba0c.jpg",
          identification: "Wheat",
          problem: "Leaf Rust",
          treatment: "Apply sulfur-based spray.",
          summary: "Orange spots seen on leaves.",
          confidence: "88%",
          createdAt: new Date().toISOString(),
        }
      ];
      setHistory(dummyData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Naye Page par navigate karne ka function
  const goToDetail = (item: PlantScanHistory) => {
    router.push({
      pathname: "/(tabs)/account/history-detail",
      params: { data: JSON.stringify(item) }, // Pura object string banake bhej rahe hain
    });
  };

  const renderItem = ({ item }: { item: PlantScanHistory }) => (
    <Pressable style={styles.card} onPress={() => goToDetail(item)}>
      <Image source={{ uri: item.filePath }} style={styles.thumbnail} />
      
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.cropName}>{item.identification}</Text>
          <View style={styles.confBadge}>
            <Text style={styles.confText}>{item.confidence}</Text>
          </View>
        </View>
        
        <Text style={styles.problemText} numberOfLines={1}>
          ⚠️ {item.problem}
        </Text>
        
        <Text style={styles.dateText}>
          {new Date(item.createdAt).toLocaleDateString("en-IN")}
        </Text>
      </View>
      
      <Ionicons name="chevron-forward" size={18} color="#bbb" />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Plant History</Text>
        <Text style={styles.subTitle}>Check your previous scans</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1b5e20" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.empty}>No scans found yet. 🌿</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fbfbfb" },
  header: { padding: 20, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#1b5e20" },
  subTitle: { fontSize: 14, color: "#666", marginTop: 2 },
  
  listContainer: { padding: 16 },
  
  card: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    // Shadows
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  thumbnail: { width: 70, height: 70, borderRadius: 12, backgroundColor: "#eee" },
  
  info: { flex: 1, marginLeft: 15 },
  
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  
  cropName: { fontSize: 17, fontWeight: "700", color: "#333" },
  
  confBadge: { backgroundColor: "#e8f5e9", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  
  confText: { fontSize: 11, color: "#2e7d32", fontWeight: "700" },
  
  problemText: { fontSize: 14, color: "#d32f2f", marginBottom: 4 },
  
  dateText: { fontSize: 12, color: "#999" },
  
  empty: { textAlign: "center", marginTop: 100, color: "#aaa", fontSize: 16 }
});