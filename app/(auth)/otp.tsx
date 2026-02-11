import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
  } from "react-native";
  import { useLocalSearchParams, useRouter } from "expo-router";
  import { useState } from "react";
  
  export default function OtpScreen() {
    const router = useRouter();
    const { mobile, otp } = useLocalSearchParams();
  
    const [enteredOtp, setEnteredOtp] = useState("");
  
    const handleVerify = () => {
      if (enteredOtp === otp) {
        router.replace("/(tabs)/home");
      } else {
        alert("Invalid OTP");
      }
    };
  
    return (
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              OTP sent to +91 {mobile}
            </Text>
  
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              maxLength={4}
              placeholder="Enter 4 digit OTP"
              value={enteredOtp}
              onChangeText={setEnteredOtp}
            />
  
            <Pressable
              style={[
                styles.button,
                { opacity: enteredOtp.length === 4 ? 1 : 0.5 },
              ]}
              disabled={enteredOtp.length !== 4}
              onPress={handleVerify}
            >
              <Text style={styles.buttonText}>Verify</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
  
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
  
    card: {
      width: "100%",
      backgroundColor: "#ffffff",
      borderRadius: 28,
      padding: 30,
      elevation: 10,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
    },
  
    title: {
      fontSize: 24,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 6,
    },
  
    subtitle: {
      textAlign: "center",
      color: "#777",
      marginBottom: 30,
    },
  
    input: {
      backgroundColor: "#f4f4f4",
      borderRadius: 16,
      padding: 18,
      fontSize: 18,
      textAlign: "center",
      letterSpacing: 8,
      marginBottom: 25,
    },
  
    button: {
      backgroundColor: "#2e7d32",
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: "center",
    },
  
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
  