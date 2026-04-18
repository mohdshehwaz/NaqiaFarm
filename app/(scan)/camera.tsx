import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState, useEffect } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { uploadCropImage } from "../../services/uploadService";
import * as ImageManipulator from "expo-image-manipulator";
import { useLanguage } from "../context/LanguageContext";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const [showAnalysisOverlay, setShowAnalysisOverlay] = useState(false);
  const [clickedImageUri, setClickedImageUri] = useState<string | null>(null);
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState(0);

  const cameraRef = useRef<any>(null);
  const isFocused = useIsFocused();
  const { language } = useLanguage();
  const insets = useSafeAreaInsets(); // ✅ safe area

  useEffect(() => {
    const backAction = () => {
      router.replace("/(tabs)/home");
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, []);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permText}>Camera permission required</Text>
        <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async () => {
    if (loading) return;

    try {
      const picture = await cameraRef.current?.takePictureAsync({
        quality: 0.7,
        skipProcessing: true, // ✅ Android fix
      });

      if (!picture?.uri) return;

      setClickedImageUri(picture.uri);
      setShowAnalysisOverlay(true);
      setLoading(true);
      setCurrentAnalysisStep(0);

      setTimeout(() => setCurrentAnalysisStep(1), 800);

      const compressed = await ImageManipulator.manipulateAsync(
        picture.uri,
        [{ resize: { width: 800 } }],
        { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
      );

      const res = await uploadCropImage(compressed.uri, language || "en");
      const data = res?.data || res;

      setTimeout(() => setCurrentAnalysisStep(2), 1000);
      setTimeout(() => setCurrentAnalysisStep(3), 1200);

      setTimeout(() => {
        if (data?.identification) {
          setShowAnalysisOverlay(false);
          setLoading(false);
          setClickedImageUri(null);

          router.push({
            pathname: "/(scan)/result",
            params: {
              data: JSON.stringify(data),
              image: compressed.uri,
            },
          });
        } else {
          alert("No plant detected ❌");
          setShowAnalysisOverlay(false);
        }
      }, 1500);
    } catch (error) {
      setShowAnalysisOverlay(false);
    }
  };

  const renderStatusIcon = (stepIndex: number) => {
    if (currentAnalysisStep > stepIndex) {
      return <Ionicons name="checkmark-circle" size={24} color="#1b5e20" />;
    }
    if (currentAnalysisStep === stepIndex) {
      return <ActivityIndicator size="small" color="#2e7d32" />;
    }
    return <View style={styles.pendingIcon} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      {isFocused && permission?.granted ? (
        <CameraView ref={cameraRef} style={styles.camera} />
      ) : (
        <View style={[styles.camera, { backgroundColor: "black" }]} />
      )}

      {/* CLOSE BUTTON */}
      <TouchableOpacity
        style={[styles.closeBtn, { top: insets.top + 10 }]}
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>

      {/* CAPTURE BUTTON */}
      {!loading && (
        <TouchableOpacity
          style={[styles.captureBtn, { bottom: 40 + insets.bottom }]}
          onPress={takePhoto}
        >
          <View style={styles.captureCircle} />
        </TouchableOpacity>
      )}

      {/* OVERLAY */}
      {showAnalysisOverlay && clickedImageUri && (
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: "#f0f2f5", zIndex: 20 }]}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.overlayHeader}>
              <Text style={styles.overlayHeaderTitle}>Plant Identification</Text>
            </View>

            <Image source={{ uri: clickedImageUri }} style={styles.overlayImage} />

            <View style={styles.centeredStepsWrapper}>
              {[
                { id: 0, text: "Analysing Image" },
                { id: 1, text: "Measuring light level" },
                { id: 2, text: "Identifying characteristics" },
                { id: 3, text: "Preparing results" },
              ].map((item) => (
                <View key={item.id} style={styles.analysisRow}>
                  <View style={styles.iconBox}>{renderStatusIcon(item.id)}</View>
                  <Text style={styles.analysisText}>{item.text}</Text>
                </View>
              ))}
            </View>
          </SafeAreaView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  camera: { flex: 1 },

  closeBtn: {
    position: "absolute",
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 30,
    zIndex: 10,
  },

  captureBtn: {
    position: "absolute",
    alignSelf: "center",
  },

  captureCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    borderWidth: 6,
    borderColor: "rgba(46, 125, 50, 0.4)",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  permText: { marginBottom: 10, color: "#666", fontSize: 16 },

  permBtn: {
    backgroundColor: "#2e7d32",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
  },

  permBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  overlayHeader: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e4eb",
    alignItems: "center",
  },

  overlayHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1b5e20",
  },

  overlayImage: {
    width: "100%",
    height: 350,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  centeredStepsWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },

  analysisRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },

  iconBox: {
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  analysisText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#444",
    fontWeight: "500",
  },

  pendingIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
  },
});