import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../context/useTranslation";

export default function HomeScreen() {
  const { setLanguage, language } = useLanguage();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const changeLang = (lang: "en" | "hi" | "ur") => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Top Right Language Dropdown */}
      <View style={styles.topRight}>
      <Text style={styles.changeLangText}>
        {t("common.changeLanguage")}
      </Text>
        <Pressable onPress={() => setOpen(!open)} style={styles.langButton}>
        <Text style={styles.langText}>
          {language === "hi" ? "HI" : language === "ur" ? "UR" : "EN"}
        </Text>
        </Pressable>

        {open && (
          <View style={styles.dropdown}>
            <Pressable onPress={() => changeLang("hi")} style={styles.item}>
              <Text>हिंदी</Text>
            </Pressable>

            <Pressable onPress={() => changeLang("en")} style={styles.item}>
              <Text>English</Text>
            </Pressable>

            <Pressable onPress={() => changeLang("ur")} style={styles.item}>
              <Text>اردو</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* 🔹 Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{t("home.title")}</Text>
        <Text style={styles.subtitle}>{t("home.subtitle")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  changeLangText: {
    fontSize: 12,
    color: "#1b5e20",
    marginBottom: 2,   // 🔼 text aur button paas aa gaye
    textAlign: "right",
    fontWeight: "500",
  },
  
  container: {
    flex: 1,
    backgroundColor: "#f5f7f4",
  },

  topRight: {
    position: "absolute",
    top: 16,
    right: 16,
    alignItems: "flex-end", // 🔒 important
    zIndex: 100,
  },  

  langButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 6,
    borderRadius: 8,
    width: 48,              // 🔒 FIXED
    alignItems: "center",   // text center
  },
  

  langText: {
    color: "#fff",
    fontWeight: "600",
  },

  dropdown: {
    position: "absolute",
    top: 42,    // ⬆️ pehle 46/50 tha
    right: 0,
  
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    overflow: "hidden",
    width: 130,
  }, 
  item: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
  },  

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1b5e20",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#555",
  },
});
