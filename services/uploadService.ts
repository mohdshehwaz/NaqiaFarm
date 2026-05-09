import { API_BASE_URL } from "./api";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const uploadCropImage = async (
  imageUri: string,
  lang: string,
) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const mobile = await AsyncStorage.getItem("mobile");

    const formData = new FormData();

    formData.append("file", {
      uri: imageUri,
      name: "crop.jpg",
      type: "image/jpeg",
    } as any);

    formData.append("lang", lang);
    formData.append("mobile", mobile || "");

    // ✅ timeout setup
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 20000);

    const response = await fetch(`${API_BASE_URL}/Plant/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // ❌ API status failed
    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    const text = await response.text();

    // ❌ empty response
    if (!text || text.trim() === "") {
      throw new Error("Empty response from server");
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error("Invalid JSON response");
    }

  } catch (error: any) {

    console.log("UPLOAD ERROR => ", error);

    if (error.name === "AbortError") {
      throw new Error("Request timeout. Please try again.");
    }

    throw new Error(
      error.message || "Image upload failed"
    );
  }
};