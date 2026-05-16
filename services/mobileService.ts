import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "./api";

// C# BaseResponse ke wrapper ko handle karne ke liye type definition
export const getPlantHistory = async () => {
  try {
    // 🎯 1. Storage se JWT Token nikalo
    const token = await AsyncStorage.getItem("token"); // Agar aapki app me key ka naam "token" hai toh yahan "token" kar lena bhai

    if (!token) {
      throw new Error("User token not found. Please login again.");
    }

    // 🎯 2. Timeout setup (20 Seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 20000);

    // 🎯 3. API Call (Bina mobile ke, bas Header me Bearer token)
    // Note: API_BASE_URL ko apne hisaab se import ya configure kar lena
    const response = await fetch(`${API_BASE_URL}/Plant/Gethistory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // ❌ API status failed
    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    const text = await response.text();

    // ❌ Empty response handling
    if (!text || text.trim() === "") {
      throw new Error("Empty response from server");
    }

    // 🎯 4. Safe JSON Parsing
    try {
      const parsedData = JSON.parse(text);
      
      // Agar backend ka MetaData fail status de raha ho, toh error throw karein
      if (parsedData?.metaData?.status === "TechnicalError") {
        throw new Error(parsedData?.metaData?.friendlyMessage || "Failed to fetch history");
      }
      
      return parsedData; // Isme { data: [...], metaData: {...} } milega
    } catch (e: any) {
      throw new Error(e.message || "Invalid JSON response from server");
    }

  } catch (error: any) {
    console.log("HISTORY FETCH ERROR => ", error);

    if (error.name === "AbortError") {
      throw new Error("Request timeout. Please try again.");
    }

    throw new Error(
      error.message || "Failed to load plant history"
    );
  }
};