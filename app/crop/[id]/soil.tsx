import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "../../context/useTranslation";


export default function SoilScreen() {

  const { id } = useLocalSearchParams();
  const crop = id?.toString();

  const { t } = useTranslation();

  if (!crop) return null;

  const steps = t(`soilPage.${crop}.steps`, { returnObjects: true }) as unknown as string[];
  const tips = t(`soilPage.${crop}.tips`, { returnObjects: true }) as unknown as string[];
  const ph = t(`soilPage.${crop}.ph`);

  return (
    <ScrollView style={styles.container}>

      {/* Heading */}
      <Text style={styles.heading}>
        🧪 {t(`home.crops.${crop}`)} {t("features.soil")}
      </Text>

      {/* Soil Requirement */}
      <View style={styles.card}>
        <Text style={styles.title}>🌱 Ideal Soil</Text>
        <Text style={styles.text}>
          {t(`cropDetail.${crop}.soil`)}
        </Text>
      </View>

      {/* Soil Testing Steps */}
      <View style={styles.card}>
        <Text style={styles.title}>
          📋 {t("soilPage.stepsTitle")}
        </Text>

        {steps.map((step: string, index: number) => (
          <Text key={index} style={styles.step}>
            {index + 1}️⃣ {step}
          </Text>
        ))}

      </View>

      {/* pH Info */}
      <View style={styles.card}>
        <Text style={styles.title}>
          ⚖ {t("soilPage.phTitle")}
        </Text>

        <Text style={styles.text}>
          {t(`soilPage.${crop}.ph`)}
        </Text>
      </View>

      {/* Farmer Tips */}
      <View style={styles.card}>
        <Text style={styles.title}>
          🌾 {t("soilPage.tipsTitle")}
        </Text>

        {tips.map((tip: string, index: number) => (
          <Text key={index} style={styles.tip}>
            ✔ {tip}
          </Text>
        ))}

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f3fff3",
    padding: 16
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2e7d32"
  },

  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#4CAF50"
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1b5e20"
  },

  text: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22
  },

  step: {
    fontSize: 15,
    marginBottom: 6,
    color: "#444"
  },

  tip: {
    fontSize: 15,
    marginTop: 4,
    color: "#2e7d32"
  }

});