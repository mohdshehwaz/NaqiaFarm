import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { router } from "expo-router";

export default function CameraRedirect() {
  useFocusEffect(
    useCallback(() => {
      router.replace("/(scan)/camera");
    }, [])
  );

  return null;
}