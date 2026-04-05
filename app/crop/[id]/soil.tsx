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

export default function SoilScreen() {
  const { id } = useLocalSearchParams();
  const crop = id?.toString();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  if (!crop) return null;

  const steps = t(`soilPage.${crop}.steps`, {
    returnObjects: true,
  }) as unknown as string[];

  const tips = t(`soilPage.${crop}.tips`, {
    returnObjects: true,
  }) as unknown as string[];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 4,
          paddingBottom: 30,
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}
      >

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>
            🧪 {t(`home.crops.${crop}`)}
          </Text>
          <Text style={styles.subHeading}>
            {t("features.soil")}
          </Text>
        </View>

        {/* Ideal Soil */}
        <View style={styles.card}>
          <Text style={styles.title}>🌱 Ideal Soil</Text>
          <Text style={styles.text}>
            {t(`cropDetail.${crop}.soil`)}
          </Text>
        </View>

        {/* Steps */}
        <View style={styles.card}>
          <Text style={styles.title}>
            📋 {t("soilPage.stepsTitle")}
          </Text>

          {steps.map((step, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.bullet}>{index + 1}.</Text>
              <Text style={styles.text}>{step}</Text>
            </View>
          ))}
        </View>

        {/* pH */}
        <View style={styles.card}>
          <Text style={styles.title}>
            ⚖ {t("soilPage.phTitle")}
          </Text>

          <Text style={styles.text}>
            {t(`soilPage.${crop}.ph`)}
          </Text>
        </View>

        {/* Tips */}
        <View style={styles.card}>
          <Text style={styles.title}>
            🌾 {t("soilPage.tipsTitle")}
          </Text>

          {tips.map((tip, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.check}>✔</Text>
              <Text style={styles.text}>{tip}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#eef7ee",
  },

  header: {
    marginBottom: 18,
  },

  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1b5e20",
  },

  subHeading: {
    fontSize: 16,
    color: "#4caf50",
    marginTop: 4,
    fontWeight: "500",
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

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1b5e20",
    marginBottom: 8,
  },

  text: {
    fontSize: 15.5,
    lineHeight: 23,
    color: "#444",
    flex: 1,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },

  bullet: {
    fontSize: 15,
    marginRight: 6,
    color: "#2e7d32",
    fontWeight: "700",
  },

  check: {
    fontSize: 16,
    marginRight: 6,
    color: "#2e7d32",
  },
});