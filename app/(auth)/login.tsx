import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { sendOtp } from "../../services/authService";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = mobile.length === 10;

  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    setMobile(cleaned);
  };

  const handleLogin = async () => {
    if (!isValid || loading) return;

    try {
      setLoading(true);

      const res = await sendOtp(mobile);

      console.log("OTP API Response:", res);

      router.push(`/otp?mobile=${mobile}`);
    } catch (error: any) {
      alert(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* 🌿 Top Section */}
        <View style={styles.topSection}>
          <Image
            source={require("../../assets/images/green.png")}
            style={styles.leafImage}
          />

          <Text style={styles.heading}>Reconnect with</Text>
          <Text style={styles.headingBold}>Goodness</Text>
        </View>

        {/* 🧾 Bottom Card */}
        <View
          style={[
            styles.card,
            {
              paddingBottom: 25 + insets.bottom,
              marginBottom: 40, // 👈 card upar uthaya
            },
          ]}
        >
          <Text style={styles.title}>Let's get you started</Text>

          {/* Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.countryCode}>+91</Text>

            <View style={styles.divider} />

            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              maxLength={10}
              placeholder="Your phone number"
              placeholderTextColor="#999"
              value={mobile}
              onChangeText={handleChange}
            />
          </View>

          <Text style={styles.infoText}>
            OTP will be sent on this number
          </Text>

          {/* Button */}
          <Pressable
            style={[
              styles.button,
              { opacity: isValid && !loading ? 1 : 0.5 },
            ]}
            disabled={!isValid || loading}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>
              {loading ? "Sending..." : "Get OTP"}
            </Text>
          </Pressable>

          <Text style={styles.footerText}>
            By continuing, you agree to our{" "}
            <Text style={styles.link}>Terms & Conditions</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
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

  leafImage: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginBottom: 10,
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
    marginBottom: 20,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 55,
  },

  countryCode: {
    fontSize: 16,
    marginRight: 8,
  },

  divider: {
    width: 1,
    height: 25,
    backgroundColor: "#ccc",
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  infoText: {
    marginTop: 10,
    color: "#777",
    fontSize: 12,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#f2d84b",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  footerText: {
    marginTop: 20,
    fontSize: 12,
    color: "#888",
  },

  link: {
    color: "#000",
    fontWeight: "500",
  },
});