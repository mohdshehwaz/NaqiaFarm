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

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<any>(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission required</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async () => {
    const picture = await cameraRef.current?.takePictureAsync();
    if (!picture?.uri) return;

    setLoading(true);

    try {
      const res = await uploadCropImage(picture.uri);

      const data = res?.data || res;

      if (data?.identification) {
        router.push({
          pathname: "/(scan)/result",
          params: {
            data: JSON.stringify(data),
            image: picture.uri,
          },
        });
      } else {
        alert("No plant detected ❌");
      }
    } catch (error) {
      alert("Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} />

      {/* ❌ CLOSE BUTTON */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#2e7d32" />
          <Text>Analyzing...</Text>
        </View>
      )}

      <TouchableOpacity style={styles.captureBtn} onPress={takePhoto}>
        <View style={styles.captureCircle} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  camera: { flex: 1 },

  // ❌ CLOSE BUTTON STYLE
  closeBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 30,
  },

  captureBtn: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },

  captureCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    borderWidth: 5,
    borderColor: "#2e7d32",
  },

  loading: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
  },
});