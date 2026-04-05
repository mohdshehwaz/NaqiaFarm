import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useTranslation } from "../../context/useTranslation";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function CropScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const crop = id?.toString();

  if (!crop) return null;

  const features = [
    { id: "guide", title: t("features.guide"), icon: "📘" },
    { id: "disease", title: t("features.disease"), icon: "🦠" },
    { id: "weather", title: t("features.weather"), icon: "🌤" },
    { id: "soil", title: t("features.soil"), icon: "🧪" },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top + 6 },
        ]}
      >
        {/* 🌟 Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>
            🌾 {t(`home.crops.${crop}`)}
          </Text>
          <Text style={styles.subHeading}>
            Select Feature
          </Text>
        </View>

        {/* 📦 Grid */}
        <FlatList
          data={features}
          numColumns={2}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() =>
                router.push(`/crop/${crop}/${item.id}`)
              }
            >
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.cardText}>{item.title}</Text>
            </Pressable>
          )}
        />
      </View>
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

  header: {
    marginBottom: 18,
  },

  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1b5e20",
  },

  subHeading: {
    fontSize: 15,
    color: "#4caf50",
    marginTop: 4,
  },

  card: {
    width: "48%",
    height: 120,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    marginBottom: 14,

    justifyContent: "center",
    alignItems: "center",

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },

  icon: {
    fontSize: 28,
    marginBottom: 6,
  },

  cardText: {
    fontSize: 15.5,
    fontWeight: "600",
    color: "#1b5e20",
  },
});