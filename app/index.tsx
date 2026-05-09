import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";
import { jwtDecode } from "jwt-decode";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        // ❌ no token
        if (!token) {
          router.replace("/(auth)/login");
          return;
        }

        // ✅ decode token
        const decoded: any = jwtDecode(token);

        const currentTime = Date.now() / 1000;

        // ❌ token expired
        if (decoded.exp < currentTime) {

          await AsyncStorage.clear();

          router.replace("/(auth)/login");
          return;
        }

        // ✅ valid token
        router.replace("/(tabs)/home");

      } catch (error) {

        await AsyncStorage.clear();

        router.replace("/(auth)/login");

      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}