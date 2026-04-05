import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "../../context/useTranslation";
import { diseaseImages } from "../../data/diseaseImages";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type Disease = {
  name: string;
  symptoms: string;
  treatment: string;
};

export default function DiseaseScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const crop = id?.toString() as keyof typeof diseaseImages;

  if (!crop) return null;

  const diseaseData = t(`diseases.${crop}`) as unknown as Disease[];
  const images = diseaseImages[crop];

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={diseaseData}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 4,
          paddingBottom: 30,
          paddingHorizontal: 16,
        }}

        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.heading}>
              🌾 {t(`home.crops.${crop}`)}
            </Text>
            <Text style={styles.subHeading}>
              {t("features.disease")}
            </Text>
          </View>
        }

        renderItem={({ item, index }) => (
          <View style={styles.card}>
            
            {/* Image */}
            <Image source={images[index]} style={styles.image} />

            {/* Title */}
            <Text style={styles.title}>{item.name}</Text>

            {/* Symptoms */}
            <View style={styles.section}>
              <Text style={styles.label}>
                ⚠️ {t("diseasePage.symptoms")}
              </Text>
              <Text style={styles.text}>{item.symptoms}</Text>
            </View>

            {/* Treatment */}
            <View style={styles.section}>
              <Text style={styles.label}>
                💊 {t("diseasePage.treatment")}
              </Text>
              <Text style={styles.text}>{item.treatment}</Text>
            </View>

          </View>
        )}
      />
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },

  image: {
    width: "100%",
    height: 170,
    borderRadius: 12,
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1b5e20",
    marginBottom: 10,
  },

  section: {
    marginTop: 8,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2e7d32",
    marginBottom: 2,
  },

  text: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
  },
});