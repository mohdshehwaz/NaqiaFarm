import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function WeatherScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const insets = useSafeAreaInsets();

  const API_KEY = "d0199de973310d07164caa0ef4ad6d61";

  useEffect(() => {
    getLocationWeather();
  }, []);

  const getLocationWeather = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Location permission denied");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const lat = location.coords.latitude;
      const lon = location.coords.longitude;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      const data = await res.json();

      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (!weather) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text>Unable to load weather</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 6,
          paddingBottom: 30,
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 🌤 Main Weather Card */}
        <View style={styles.mainCard}>
          <Text style={styles.city}>{weather.name}</Text>

          <Text style={styles.temp}>
            {Math.round(weather.main.temp)}°
          </Text>

          <Text style={styles.condition}>
            {weather.weather[0].main}
          </Text>

          <Text style={styles.highLow}>
            H:{Math.round(weather.main.temp_max)}°  L:
            {Math.round(weather.main.temp_min)}°
          </Text>
        </View>

        {/* 📊 Info Grid */}
        <View style={styles.grid}>
          <View style={styles.infoCard}>
            <Text style={styles.label}>💧 Humidity</Text>
            <Text style={styles.value}>
              {weather.main.humidity}%
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>🌬 Wind</Text>
            <Text style={styles.value}>
              {weather.wind.speed} m/s
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>📊 Pressure</Text>
            <Text style={styles.value}>
              {weather.main.pressure} mb
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>👁 Visibility</Text>
            <Text style={styles.value}>
              {weather.visibility / 1000} km
            </Text>
          </View>
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

  mainCard: {
    backgroundColor: "#2e7d32",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },

  city: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },

  temp: {
    fontSize: 64,
    color: "#fff",
    fontWeight: "800",
    marginTop: 10,
  },

  condition: {
    color: "#d0f0d0",
    fontSize: 18,
    marginTop: 4,
  },

  highLow: {
    color: "#fff",
    marginTop: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  infoCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },

  label: {
    fontSize: 14,
    color: "#777",
  },

  value: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
    color: "#1b5e20",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});