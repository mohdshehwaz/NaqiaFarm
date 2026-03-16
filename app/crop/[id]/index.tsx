import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useTranslation } from "../../context/useTranslation";

export default function CropScreen() {
  const { id } = useLocalSearchParams();

  const { t } = useTranslation();   // ✅ yaha se t milega

  const features = [
    { id: "guide", title: t("features.guide") },
    { id: "disease", title: t("features.disease") },
    { id: "weather", title: t("features.weather") },
    { id: "soil", title: t("features.soil") },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{id?.toString().toUpperCase()}</Text>

      <FlatList
        data={features}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/crop/${id}/${item.id}`)}
          >
            <Text style={styles.cardText}>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    flex: 1,
    height: 110,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  cardText: {
    fontSize: 16,
    fontWeight: "600",
  },
});