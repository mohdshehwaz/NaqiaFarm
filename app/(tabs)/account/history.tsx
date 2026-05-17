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
import { getPlantHistory } from "@/services/mobileService";

// 🎯 Naye C# Model ke hisaab se interface update kiya hai
interface PlantScanHistory {
  id: number;
  mobileNumber: string;
  filePath: string;
  cropName: string;            // Old: identification
  disease: string;             // Old: problem
  recommendedFertilizer: string; // 🔥 Naya Field
  treatmentSteps: string;       // Old: treatment
  summary: string;
  confidence: string;
  createdAt: string;
}

export default function HistoryScreen() {
  const router = useRouter();
  const [history, setHistory] = useState<PlantScanHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  // HistoryScreen ke andar ka sirf fetchHistory update kiya hai baaki code same hai aapka
  const fetchHistory = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const result = await getPlantHistory(); 

      if (result && result.data) {
        const mappedData = result.data.map((item: any) => ({
          id: item.id,
          mobileNumber: item.mobileNumber || item.MobileNumber,
          filePath: item.filePath || item.FilePath,
          // Safe binding: Naya cropName na mile to purana identification check karega
          cropName: item.cropName || item.CropName || item.identification || item.Identification || "Unknown Crop",
          disease: item.disease || item.Disease || item.problem || item.Problem || "Healthy",
          recommendedFertilizer: item.recommendedFertilizer || item.RecommendedFertilizer || "",
          treatmentSteps: item.treatmentSteps || item.TreatmentSteps || item.treatment || item.Treatment || "",
          summary: item.summary || item.Summary || "",
          confidence: item.confidence || item.Confidence || "0%",
          createdAt: item.createdAt || item.CreatedAt,
        }));

        setHistory(mappedData); 
      } else {
        setHistory([]);
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const goToDetail = (item: PlantScanHistory) => {
    router.push({
      pathname: "/history-detail",
      params: { data: JSON.stringify(item) },
    });
  };

  const renderItem = ({ item }: { item: PlantScanHistory }) => (
    <Pressable style={styles.card} onPress={() => goToDetail(item)}>
      <Image source={{ uri: item.filePath }} style={styles.thumbnail} />
      
      <View style={styles.info}>
        <View style={styles.topRow}>
          {/* 🎯 Naya Property Use Kiya: cropName (Ab card par sirf Fasal ka naam saaf dikhega) */}
          <Text style={styles.cropName} numberOfLines={1}>{item.cropName }</Text>
          
          <View style={styles.confBadge}>
            <Text style={styles.confText}>{item.confidence}</Text>
          </View>
        </View>
        
        {/* ⚠️ Naya Property Use Kiya: disease (Bimari ka naam line limit ke sath) */}
        <Text style={styles.problemText} numberOfLines={1}>
          ⚠️ {item.disease}
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
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1b5e20" style={{ marginTop: 40 }} />
      ) : errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <Pressable style={styles.retryButton} onPress={fetchHistory}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
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
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnail: { width: 70, height: 70, borderRadius: 12, backgroundColor: "#eee" },
  info: { flex: 1, marginLeft: 15 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  // Headings ka color charcoal dark (#333) hi rakha hai taaki zyada green na lage
  cropName: { fontSize: 17, fontWeight: "700", color: "#333", flex: 1, marginRight: 8 },
  confBadge: { backgroundColor: "#e8f5e9", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  confText: { fontSize: 11, color: "#2e7d32", fontWeight: "700" },
  problemText: { fontSize: 14, color: "#d32f2f", marginBottom: 4 },
  dateText: { fontSize: 12, color: "#999" },
  empty: { textAlign: "center", marginTop: 100, color: "#aaa", fontSize: 16 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  errorText: { fontSize: 16, color: "#666", marginBottom: 15, textAlign: "center" },
  retryButton: { backgroundColor: "#1b5e20", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  retryText: { color: "#fff", fontWeight: "bold" }
});