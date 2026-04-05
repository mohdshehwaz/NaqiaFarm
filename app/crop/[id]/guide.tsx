import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "../../context/useTranslation";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function GuideScreen() {
  const { id } = useLocalSearchParams();
  const crop = id?.toString();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  if (!crop) return null;

  const sections = [
    { key: "soil", icon: "🧪" },
    { key: "land", icon: "🚜" },
    { key: "sowing", icon: "🌱" },
    { key: "fertilizer", icon: "🌿" },
    { key: "irrigation", icon: "💧" },
    { key: "weeds", icon: "🌾" },
    { key: "diseases", icon: "🦠" },
    { key: "harvest", icon: "✂️" },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingTop: insets.top + 6,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
      >

        {/* 🌟 Header */}
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>
            🌾 {t(`home.crops.${crop}`)}
          </Text>
          <Text style={styles.headerSub}>
            {t("features.guide")}
          </Text>
        </View>

        {/* 📦 Sections */}
        {sections.map((section) => (
          <View key={section.key} style={styles.card}>

            {/* Row */}
            <View style={styles.row}>
              <View style={styles.iconCircle}>
                <Text style={styles.icon}>{section.icon}</Text>
              </View>

              <Text style={styles.title}>
                {t(`cropDetail.sections.${section.key}`)}
              </Text>
            </View>

            {/* Content */}
            <Text style={styles.text}>
              {t(`cropDetail.${crop}.${section.key}`)}
            </Text>

          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#eef7ee",
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  headerCard: {
    backgroundColor: "#2e7d32",
    padding: 18,
    borderRadius: 18,
    marginBottom: 18,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ffffff",
  },

  headerSub: {
    fontSize: 14,
    color: "#d0f0d0",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e8f5e9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  icon: {
    fontSize: 18,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1b5e20",
  },

  text: {
    fontSize: 14.5,
    lineHeight: 22,
    color: "#444",
    marginTop: 4,
  },
});