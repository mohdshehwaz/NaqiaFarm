import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {t("account.menu.language")}
        </Text>
      </View>

      {/* LIST */}
      <View style={styles.card}>
        {languages.map((item) => (
          <Pressable
            key={item.code}
            style={styles.row}
            onPress={() => setLanguage(item.code as any)}
          >
            <Text style={styles.text}>{item.label}</Text>

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
    borderRadius: 16,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },

  text: {
    fontSize: 16,
    color: "#333",
  },
});