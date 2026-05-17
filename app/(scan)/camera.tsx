import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  BackHandler,
  Modal, // 👈 Modal import kiya custom popup ke liye
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
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

  // 🎯 LIMIT POPUP STATES: Popup show karne aur backend ka message handle karne ke liye
  const [showLimitPopup, setShowLimitPopup] = useState(false);
  const [limitMessage, setLimitMessage] = useState("");

  const cameraRef = useRef<any>(null);
  const isFocused = useIsFocused();
  const { language } = useLanguage();
  const insets = useSafeAreaInsets();

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
        skipProcessing: true,
      });

      if (!picture?.uri) return;

      setClickedImageUri(picture.uri);
      setShowAnalysisOverlay(true);
      setLoading(true);
      setCurrentAnalysisStep(0); // Step 0: Analysing Image

      const compressed = await ImageManipulator.manipulateAsync(
        picture.uri,
        [{ resize: { width: 800 } }],
        {
          compress: 0.6,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      setCurrentAnalysisStep(1); // Step 1: Measuring light level

      // ✅ REAL API CALL
      const res = await uploadCropImage(compressed.uri, language || "en");

      if (!res) {
        throw new Error("No response from API");
      }

      // 🎯 CHECK LOCK: Agar backend se scan limit exceeded wala response aaya hai
      // Aapke standard object structure ke mutabik res.metaData check hoga
      const metaData = res?.metaData || res?.MetaData;
      if (metaData && (metaData.resultCode === "R04" || metaData.resultMessage?.includes("used 2 scans"))) {
        
        // Loader band karo aur custom limit popup trigger karo
        setShowAnalysisOverlay(false);
        setLoading(false);
        setClickedImageUri(null);
        
        // Backend se aaya hua custom message state me set karo
        setLimitMessage(metaData.resultMessage || "You have used 2 scans already. Please wait for the next day.");
        setShowLimitPopup(true);
        return; // Processing yahan rok do, niche data validation tak nahi jaane dena hai
      }

      const data = res?.data || res;
      setCurrentAnalysisStep(2); // Identifying characteristics
      
      await new Promise((resolve) => setTimeout(resolve, 400));
      setCurrentAnalysisStep(3); // Preparing results
      await new Promise((resolve) => setTimeout(resolve, 400));

      const hasCropData = data?.cropName || data?.CropName || data?.disease || data?.Disease;

      if (hasCropData) {
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
        alert("No plant detected ❌. Please take a clearer photo.");
        setShowAnalysisOverlay(false);
        setLoading(false);
        setClickedImageUri(null);
      }

    } catch (error: any) {
      console.log("Camera Error => ", error);
      alert(error.message || "Something went wrong");
      setShowAnalysisOverlay(false);
      setLoading(false);
      setClickedImageUri(null);
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

      {/* ANALYSIS OVERLAY */}
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

      {/* 🎯 CUSTOM POPUP MODAL: 24-Hour Limit hit hone par dikhega */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLimitPopup}
        onRequestClose={() => setShowLimitPopup(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Warning Alarm Icon */}
            <View style={styles.warningIconCircle}>
              <Ionicons name="time" size={40} color="#d32f2f" />
            </View>

            {/* Heading Content */}
            <Text style={styles.modalTitle}>Scan Limit Reached</Text>
            
            {/* Backend Custom Message Text */}
            <Text style={styles.modalMessage}>{limitMessage}</Text>

            {/* Action Button: Modal close karke wapas home bhej dega */}
            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={() => {
                setShowLimitPopup(false);
                router.replace("/(tabs)/home"); // User ko home par redirect kar diya
              }}
            >
              <Text style={styles.modalButtonText}>Okay, Got It</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  captureBtn: { position: "absolute", alignSelf: "center" },
  captureCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    borderWidth: 6,
    borderColor: "rgba(46, 125, 50, 0.4)",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  permText: { marginBottom: 10, color: "#666", fontSize: 16 },
  permBtn: { backgroundColor: "#2e7d32", paddingVertical: 12, paddingHorizontal: 25, borderRadius: 12 },
  permBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  overlayHeader: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#e0e4eb", alignItems: "center" },
  overlayHeaderTitle: { fontSize: 18, fontWeight: "bold", color: "#1b5e20" },
  overlayImage: { width: "100%", height: 350, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  centeredStepsWrapper: { flex: 1, justifyContent: "center", alignItems: "center", paddingBottom: 50 },
  analysisRow: { flexDirection: "row", alignItems: "center", width: "80%", marginBottom: 20 },
  iconBox: { width: 35, alignItems: "center", justifyContent: "center" },
  analysisText: { marginLeft: 15, fontSize: 16, color: "#444", fontWeight: "500" },
  pendingIcon: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: "#ccc" },

  // 🎯 NEW MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Background shadow cover
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 25,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  warningIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ffebee", // Light red background alert circle
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333", // Charcoal dark color standard
    marginBottom: 10,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: "#333", // Premium looking charcoal dark button instead of heavy green
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});