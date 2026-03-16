import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function WeatherScreen() {

  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "6d61";

  useEffect(() => {
    getLocationWeather();
  }, []);

  const getLocationWeather = async () => {

    try {

      // Permission
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Location permission denied");
        return;
      }

      // Get location
      let location = await Location.getCurrentPositionAsync({});

      const lat = location.coords.latitude;
      const lon = location.coords.longitude;

      // Weather API
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      const data = await res.json();

      setWeather(data);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }

  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.mainCard}>

        <Text style={styles.city}>{weather.name}</Text>

        <View style={styles.tempRow}>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
          <Text style={styles.condition}>{weather.weather[0].main}</Text>
        </View>

        <Text style={styles.highLow}>
          H:{Math.round(weather.main.temp_max)}°  
          L:{Math.round(weather.main.temp_min)}°
        </Text>

      </View>

      <View style={styles.grid}>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Humidity</Text>
          <Text style={styles.infoValue}>{weather.main.humidity}%</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Wind</Text>
          <Text style={styles.infoValue}>{weather.wind.speed} m/s</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Pressure</Text>
          <Text style={styles.infoValue}>{weather.main.pressure} mb</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Visibility</Text>
          <Text style={styles.infoValue}>{weather.visibility / 1000} km</Text>
        </View>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#eef2ff",
    padding:20
  },

  mainCard:{
    backgroundColor:"#4A90E2",
    borderRadius:25,
    padding:30,
    marginBottom:20,
    elevation:8
  },

  city:{
    color:"white",
    fontSize:20,
    fontWeight:"600"
  },

  tempRow:{
    flexDirection:"row",
    alignItems:"center",
    marginTop:10
  },

  temp:{
    fontSize:70,
    color:"white",
    fontWeight:"bold"
  },

  condition:{
    color:"white",
    fontSize:22,
    marginLeft:10
  },

  highLow:{
    color:"white",
    marginTop:10
  },

  grid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between"
  },

  infoCard:{
    width:"48%",
    backgroundColor:"white",
    borderRadius:20,
    padding:20,
    marginBottom:15,
    elevation:5
  },

  infoTitle:{
    color:"#888"
  },

  infoValue:{
    fontSize:22,
    fontWeight:"bold",
    marginTop:5
  },

  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }

});
