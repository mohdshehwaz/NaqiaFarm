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
  import { useRouter, Href } from "expo-router";
  import { sendOtp } from "../../services/authService";

  
  export default function LoginScreen() {
    const router = useRouter();
    const [mobile, setMobile] = useState("");
  
    const isValid = mobile.length === 10;
  
    const handleChange = (text: string) => {
      const cleaned = text.replace(/[^0-9]/g, "");
      setMobile(cleaned);
    };
  
    const handleLogin = async () => {
      if (!isValid) return;
    
      try {
        const res = await sendOtp(mobile);
    
        // TEMP: test ke liye OTP show kar do
        alert("Your OTP is: " + res.otp);
    
        router.push(`/otp?mobile=${mobile}&otp=${res.otp}`);

      } catch (error) {
        alert("Failed to send OTP");
      }
    };
    
  
    return (
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          {/* 🌿 Background Tree */}
          <Image
            source={require("../../assets/images/green.png")}
            style={styles.backgroundImage}
            resizeMode="contain"
          />
  
          <View style={styles.card}>
            <Text style={styles.title}>Naqia Farm 🌾</Text>
            <Text style={styles.subtitle}>
              Enter your mobile number to continue
            </Text>
  
            {/* Input Box */}
            <View style={styles.inputWrapper}>
              <Text style={styles.countryCode}>+91</Text>
  
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                maxLength={10}
                placeholder="Enter mobile number"
                placeholderTextColor="#999"
                value={mobile}
                onChangeText={handleChange}
                returnKeyType="done"
                underlineColorAndroid="transparent"
                selectionColor="#2e7d32"
                cursorColor="#2e7d32"
              />
            </View>
  
            {/* Continue Button */}
            <Pressable
              style={[
                styles.button,
                { opacity: isValid ? 1 : 0.5 },
              ]}
              disabled={!isValid}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: "#eef7f0",
    },
  
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
  
    backgroundImage: {
      position: "absolute",
      width: 260,
      height: 260,
      opacity: 0.06,
      top: 120,
    },
  
    card: {
      width: "100%",
      backgroundColor: "#ffffff",
      borderRadius: 28,
      padding: 28,
      elevation: 8,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
    },
  
    title: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 6,
    },
  
    subtitle: {
      fontSize: 14,
      color: "#666",
      textAlign: "center",
      marginBottom: 30,
    },
  
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      borderRadius: 16,
      paddingHorizontal: 15,
      height: 56,
      marginBottom: 25,
      overflow: "hidden", // 🔥 important for Android border fix
    },
  
    countryCode: {
      fontSize: 16,
      fontWeight: "500",
      marginRight: 8,
    },
  
    input: {
      flex: 1,
      fontSize: 16,
      color: "#000",
      borderWidth: 0,
      borderColor: "transparent",
      backgroundColor: "transparent",
      padding: 0,
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
  