import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
  } from "react-native";
  import { useLocalSearchParams, router } from "expo-router";
  
  export default function ResultScreen() {
    const params = useLocalSearchParams();
  
    const result = params?.data ? JSON.parse(params.data as string) : null;
    const image = params?.image as string;
  
    if (!result) {
      return (
        <View style={styles.center}>
          <Text>No data found</Text>
        </View>
      );
    }
  
    return (
      <ScrollView style={styles.container}>
        
        {/* 📸 Image Preview */}
        {image && <Image source={{ uri: image }} style={styles.image} />}
  
        <Text style={styles.title}>🌿 Crop Analysis</Text>
  
        <View style={styles.card}>
          <Text style={styles.heading}>🔍 Identification</Text>
          <Text>{result.identification}</Text>
        </View>
  
        <View style={styles.card}>
          <Text style={styles.heading}>⚠️ Problem</Text>
          <Text>{result.problem}</Text>
        </View>
  
        <View style={styles.card}>
          <Text style={styles.heading}>💊 Treatment</Text>
          <Text>{result.treatment}</Text>
        </View>
  
        <View style={styles.card}>
          <Text style={styles.heading}>🧠 Summary</Text>
          <Text>{result.summary}</Text>
        </View>
  
        <Text style={styles.confidence}>
          Confidence: {result.confidence}
        </Text>
  
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/(scan)/camera")}
        >
          <Text style={styles.buttonText}>Scan Again</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },
  
    image: {
      width: "100%",
      height: 250,
    },
  
    title: {
      fontSize: 20,
      fontWeight: "bold",
      margin: 15,
    },
  
    card: {
      backgroundColor: "white",
      marginHorizontal: 15,
      marginVertical: 8,
      padding: 15,
      borderRadius: 10,
      elevation: 2,
    },
  
    heading: {
      fontWeight: "bold",
      marginBottom: 5,
    },
  
    confidence: {
      margin: 15,
      color: "green",
      fontWeight: "bold",
    },
  
    button: {
      margin: 20,
      backgroundColor: "#2e7d32",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
  
    buttonText: {
      color: "white",
      fontSize: 16,
    },
  
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });