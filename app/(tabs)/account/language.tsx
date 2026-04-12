import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  StatusBar 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants"; // Height fix ke liye
import { colors } from "../../styles/colors";
import { useTranslation } from "../../context/useTranslation";
import { useLanguage } from "../../context/LanguageContext";

export default function LanguageScreen() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "ur", label: "اردو" },
  ];

  return (
    <View style={styles.container}>
      {/* 1. Status Bar Setup */}
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* 2. Notch Area Spacer */}
      <View style={styles.topInset} />

      {/* 3. CLEAN HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {t("account.menu.language")}
        </Text>
      </View>

      {/* LIST CARD */}
      <View style={styles.card}>
        {languages.map((item, index) => (
          <Pressable
            key={item.code}
            style={[
              styles.row,
              // Last item ka border hatane ke liye
              index === languages.length - 1 && { borderBottomWidth: 0 }
            ]}
            onPress={() => setLanguage(item.code as any)}
          >
            <Text style={[
              styles.text,
              // Selected language ko thoda highlight karne ke liye
              language === item.code && { color: colors.primary, fontWeight: "600" }
            ]}>
              {item.label}
            </Text>

            {language === item.code && (
              <Ionicons
                name="checkmark-circle"
                size={22}
                color={colors.primary}
              />
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f5",
  },

  // Notch fix style
  topInset: {
    height: Constants.statusBarHeight,
    backgroundColor: colors.primary,
  },

  header: {
    backgroundColor: colors.primary,
    height: 55, // Fixed height for consistency
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden", // Border radius ko rows par apply karne ke liye
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20, // Padding thodi badhayi hai touch experience ke liye
    borderBottomWidth: 0.8,
    borderColor: "#f0f0f0",
  },

  text: {
    fontSize: 17,
    color: "#333",
  },
});