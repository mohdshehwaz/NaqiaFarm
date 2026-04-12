import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      
      {/* 🎯 Language screen ka header yahan se off hoga */}
      <Stack.Screen 
        name="language" 
        options={{ 
          headerShown: false,
          presentation: 'card' // iOS par smooth transition ke liye
        }} 
      />

      <Stack.Screen
        name="office-address"
        options={{ 
          headerShown: false,
          presentation: 'card' // iOS par smooth transition ke liye
        }} 
      />

      <Stack.Screen
        name="help"
        options={{ 
          headerShown: false,
          presentation: 'card' // iOS par smooth transition ke liye
        }} 
      />
      
      <Stack.Screen
        name="history"
        options={{ 
          headerShown: false,
          presentation: 'card' // iOS par smooth transition ke liye
        }} 
      />
    </Stack>
  );
}