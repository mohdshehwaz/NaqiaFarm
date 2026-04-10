import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { uploadCropImage } from "../../services/uploadService";
import * as ImageManipulator from "expo-image-manipulator";
import { useLanguage } from "../context/LanguageContext"; // ✅ add

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<any>(null);

  const { language } = useLanguage(); // ✅ language milegi yaha se

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 10 }}>
          Camera permission required
        </Text>

        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const takePhoto = async () => {
  try {
    const picture = await cameraRef.current?.takePictureAsync({
      quality: 0.7, // 👈 already reduce
    });

    if (!picture?.uri) return;

    setLoading(true);

    // 🔥 COMPRESS IMAGE
    const compressed = await ImageManipulator.manipulateAsync(
      picture.uri,
      [
        { resize: { width: 800 } }, // 👈 resize (important)
      ],
      {
        compress: 0.6, // 👈 0 to 1 (0.6 best)
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    console.log("Original:", picture.uri);
    console.log("Compressed:", compressed.uri);

    // 🔥 send compressed image
    const res = await uploadCropImage(
      compressed.uri,
      language || "en"
    );

    const data = res?.data || res;

    if (data?.identification) {
      router.push({
        pathname: "/(scan)/result",
        params: {
          data: JSON.stringify(data),
          image: compressed.uri, // 👈 use compressed
        },
      });
    } else {
      alert("No plant detected ❌");
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong ❌");
  } finally {
    setLoading(false);
  }
};

  // const takePhoto = async () => {
  //   try {
  //     const picture = await cameraRef.current?.takePictureAsync();

  //     if (!picture?.uri) return;

  //     setLoading(true);

  //     // 🔥 API call with language
  //     const res = await uploadCropImage(
  //       picture.uri,
  //       language || "en" // fallback
  //     );

  //     const data = res?.data || res;

  //     if (data?.identification) {
  //       router.push({
  //         pathname: "/(scan)/result",
  //         params: {
  //           data: JSON.stringify(data),
  //           image: picture.uri,
  //         },
  //       });
  //     } else {
  //       alert("No plant detected ❌");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert("Something went wrong ❌");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* 📷 Camera */}
      <CameraView ref={cameraRef} style={styles.camera} />

      {/* ❌ Close Button */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>

      {/* 🔄 Loading */}
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#2e7d32" />
          <Text style={{ marginTop: 5 }}>Analyzing...</Text>
        </View>
      )}

      {/* 📸 Capture Button */}
      <TouchableOpacity style={styles.captureBtn} onPress={takePhoto}>
        <View style={styles.captureCircle} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  camera: {
    flex: 1,
  },

  // ❌ Close button
  closeBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 30,
  },

  // 📸 Capture button
  captureBtn: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },

  captureCircle: {
    width: 85,
    height: 85,
    borderRadius: 50,
    backgroundColor: "#fff",
    borderWidth: 5,
    borderColor: "#2e7d32",
  },

  // 🔄 Loading UI
  loading: {
    position: "absolute",
    top: 70,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
  },

  // Permission screen
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#2e7d32",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});