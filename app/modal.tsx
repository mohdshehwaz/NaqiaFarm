import { View, Text, Pressable } from "react-native";
import { useRouter, Href } from "expo-router";

export default function ModalScreen() {
  const router = useRouter();

  const goHome = () => {
    router.replace("/(tabs)/home" as Href);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Modal Screen</Text>

      <Pressable onPress={goHome}>
        <Text style={{ color: "blue", marginTop: 20 }}>
          Go to home screen
        </Text>
      </Pressable>
    </View>
  );
}
