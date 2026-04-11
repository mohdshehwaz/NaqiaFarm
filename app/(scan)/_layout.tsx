import { Stack } from "expo-router";

export default function ScanLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true, // iOS swipe back enable karta hai
        gestureDirection: "horizontal",
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="camera" />
      <Stack.Screen name="result" />
    </Stack>
  );
}