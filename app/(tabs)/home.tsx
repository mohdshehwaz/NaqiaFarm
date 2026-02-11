import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../context/useTranslation";

const crops = [
  {
    id: "1",
    key: "sugarcane",
    image: require("../../assets/images/sugarcane.jpg"),
  },
  {
    id: "2",
    key: "wheat",
    image: require("../../assets/images/wheat.jpg"),
  },
  {
    id: "3",
    key: "rice",
    image: require("../../assets/images/rice.jpg"),
  },
  {
    id: "4",
    key: "mustard",
    image: require("../../assets/images/mustard.jpg"),
  },
];



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
      {/* 🔹 Language Switch */}
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

      {/* 🔹 Heading */}
      <Text style={styles.heading}>{t("home.heading")}</Text>

      {/* 🔹 Crop Cards */}
      <FlatList
        data={crops}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.cardTitle}>
              {t(`home.crops.${item.key}`)}
            </Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // 🤍 clean white
    paddingTop: 60,
  },

  topRight: {
    position: "absolute",
    top: 16,
    right: 16,
    alignItems: "flex-end",
    zIndex: 100,
  },

  changeLangText: {
    fontSize: 12,
    color: "#1b5e20",
    marginBottom: 2,
    fontWeight: "500",
  },

  langButton: {
    backgroundColor: "#2e7d32",
    width: 48,
    height: 34,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  langText: {
    color: "#fff",
    fontWeight: "700",
  },

  dropdown: {
    position: "absolute",
    top: 42,
    right: 0,
    width: 130,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    overflow: "hidden",
  },

  item: {
    paddingVertical: 10,
    alignItems: "center",
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1b5e20",
    marginLeft: 16,
    marginBottom: 12,
  },

  list: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },

  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    margin: 8,
    borderRadius: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
    paddingBottom: 12,
  },

  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },

  cardTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#2e7d32",
  },
});
