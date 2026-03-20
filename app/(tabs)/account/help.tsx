import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
      
      {/* HEADER */}
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

  header: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    alignItems: "center",
  },

  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
    textAlign: "center",
  },

  subtitle: {
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 15,
    backgroundColor: "#2e7d32",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});