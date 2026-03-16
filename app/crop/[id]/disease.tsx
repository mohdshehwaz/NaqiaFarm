import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "../../context/useTranslation";
import { diseaseImages } from "../../data/diseaseImages";

type Disease = {
  name: string;
  symptoms: string;
  treatment: string;
};

export default function DiseaseScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();

  const crop = id?.toString() as keyof typeof diseaseImages;

  if (!crop) return null;

  const diseaseData = t(`diseases.${crop}`) as unknown as Disease[];
  const images = diseaseImages[crop];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t(`home.crops.${crop}`)} {t("features.disease")}</Text>

      <FlatList
        data={diseaseData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image source={images[index]} style={styles.image} />

            <Text style={styles.title}>{item.name}</Text>

            <Text style={styles.label}>{t("diseasePage.symptoms")}</Text>
            <Text style={styles.text}>{item.symptoms}</Text>

            <Text style={styles.label}>{t("diseasePage.treatment")}</Text>
            <Text style={styles.text}>{item.treatment}</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1b5e20",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    elevation: 4,
    padding: 14,
    marginBottom: 16,
  },

  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  label: {
    fontWeight: "600",
    marginTop: 6,
  },

  text: {
    color: "#555",
  },
});