import { useEffect } from "react";
import { router } from "expo-router";

export default function CameraRedirect() {
  useEffect(() => {
    router.replace("/(scan)/camera");
  }, []);

  return null;
}