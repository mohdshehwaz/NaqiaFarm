import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  StatusBar, // StatusBar add kiya visual clean up ke liye
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants"; 
import { colors } from "../../styles/colors";
import { useTranslation } from "../../context/useTranslation";

export default function HelpScreen() {
  const { t } = useTranslation();

  const callSupport = () => {
    Linking.openURL("tel:+919718060881");
  };

  const openWhatsApp = () => {
    const phone = "919718060881";
    const message = "Hello, I need help regarding farming guidance.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  const sendEmail = () => {
    Linking.openURL("mailto:support@naqiafarm.com");
  };

  return (
    <View style={styles.container}>
      {/* 1. Status Bar ko transparent rakhein taki background color upar tak jaye */}
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* 2. Top Spacer: Ye sirf notch ka area cover karega */}
      <View style={styles.topInset} />

      {/* 3. FIXED HEADER: Iski height fix kar di hai taki ye "bada" na dikhe */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {t("help.title")}
        </Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <Ionicons name="help-circle" size={40} color={colors.primary} />

        <Text style={styles.title}>
          {t("help.heading")}
        </Text>

        <Text style={styles.subtitle}>
          {t("help.subtitle")}
        </Text>

        {/* CALL */}
        <Pressable style={styles.button} onPress={callSupport}>
          <Ionicons name="call-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>
            {t("help.call")}
          </Text>
        </Pressable>

        {/* WHATSAPP */}
        <Pressable style={styles.button} onPress={openWhatsApp}>
          <Ionicons name="logo-whatsapp" size={18} color="#fff" />
          <Text style={styles.buttonText}>
            {t("help.whatsapp")}
          </Text>
        </Pressable>

        {/* EMAIL */}
        <Pressable style={styles.button} onPress={sendEmail}>
          <Ionicons name="mail-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>
            {t("help.email")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f5",
  },

  // Notch area fix
  topInset: {
    height: Constants.statusBarHeight,
    backgroundColor: colors.primary, // Isse notch ka color header se match karega
  },

  header: {
    backgroundColor: colors.primary,
    height: 55, // Header ki fixed height taki wo bada na dikhe
    justifyContent: "center", // Text ko vertically center karne ke liye
    alignItems: "center",
    // Halka sa shadow taki niche ke content se alag dikhe
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700", // Thoda bold kiya design ke liye
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: "#fff",
    margin: 20, // Margin thoda badhaya layout clean karne ke liye
    padding: 25,
    borderRadius: 20, // More rounded for modern look
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 15,
    textAlign: "center",
    color: "#333",
  },

  subtitle: {
    color: "#777",
    marginTop: 8,
    textAlign: "center",
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 10,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
    backgroundColor: "#2e7d32",
    paddingVertical: 14, // Buttons thode bade aur touch-friendly
    paddingHorizontal: 15,
    borderRadius: 12,
    width: "100%",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});