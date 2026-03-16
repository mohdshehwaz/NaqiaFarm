import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "../../context/useTranslation";

export default function GuideScreen() {

  const { id } = useLocalSearchParams();
  const crop = id?.toString();

  const { t } = useTranslation();

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
    <ScrollView style={styles.container}>

      {/* Heading */}
      <Text style={styles.heading}>
        🌾 {t(`home.crops.${crop}`)} {t("features.guide")}
      </Text>

      {sections.map((section) => (
        <View key={section.key} style={styles.card}>

          <Text style={styles.title}>
            {section.icon} {t(`cropDetail.sections.${section.key}`)}
          </Text>

          <Text style={styles.text}>
            {t(`cropDetail.${crop}.${section.key}`)}
          </Text>

        </View>
      ))}

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
    color: "#2e7d32",
    marginBottom: 20
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#4CAF50"
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    color: "#1b5e20"
  },

  text: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444"
  }

});