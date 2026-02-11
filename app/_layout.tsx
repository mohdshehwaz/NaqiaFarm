import { Stack } from "expo-router";
import { LanguageProvider } from "./context/LanguageContext";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal" }}
        />
      </Stack>
    </LanguageProvider>
  );
}
