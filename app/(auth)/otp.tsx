import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { verifyOtp, resendOtp } from "../../services/authService";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OtpScreen() {
  const router = useRouter();
  const { mobile } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [enteredOtp, setEnteredOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = enteredOtp.length === 6;

  const handleVerify = async () => {
    if (!isValid || loading) return;

    try {
      setLoading(true);

      const res = await verifyOtp(mobile as string, enteredOtp);

      console.log("Verify response:", res);
      await AsyncStorage.setItem("token", res.data);

      // ✅ success → home screen (no back)
      router.replace("/(tabs)/home");

    } catch (error: any) {
      alert(error.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp(mobile as string);
      alert("OTP resent successfully");
    } catch (err) {
      alert("Failed to resend OTP");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* 🌿 Top */}
        <View style={styles.topSection}>
          <Image
            source={require("../../assets/images/green.png")}
            style={styles.image}
          />
          <Text style={styles.heading}>Verify your</Text>
          <Text style={styles.headingBold}>Phone Number</Text>
        </View>

        {/* 🧾 Card */}
        <View
          style={[
            styles.card,
            { paddingBottom: 25 + insets.bottom, marginBottom: 40 },
          ]}
        >
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>
            OTP sent to +91 {mobile}
          </Text>

          {/* OTP Input */}
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="------"
            placeholderTextColor="#999"
            value={enteredOtp}
            onChangeText={setEnteredOtp}
          />

          {/* Verify Button */}
          <Pressable
            style={[
              styles.button,
              { opacity: isValid && !loading ? 1 : 0.5 },
            ]}
            disabled={!isValid || loading}
            onPress={handleVerify}
          >
            <Text style={styles.buttonText}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Text>
          </Pressable>

          {/* Resend */}
          <Pressable onPress={handleResend}>
            <Text style={styles.resend}>
              Didn't receive OTP? Resend
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#d8f0d2",
  },

  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  topSection: {
    alignItems: "center",
    marginTop: 40,
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },

  heading: {
    fontSize: 18,
    color: "#5f7f5f",
  },

  headingBold: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4a6f4a",
  },

  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    elevation: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },

  subtitle: {
    color: "#777",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#f4f4f4",
    borderRadius: 16,
    padding: 18,
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 10,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#f2d84b",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  resend: {
    marginTop: 15,
    textAlign: "center",
    color: "#000",
  },
});