import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="office-address"
        options={{ title: "Office Address" }}
      />
    </Stack>
  );
}