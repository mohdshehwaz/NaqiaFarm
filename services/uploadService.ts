import { API_BASE_URL } from "./api";

export const uploadCropImage = async (imageUri: string) => {
  console.log("api url is -> ", API_BASE_URL);

  const formData = new FormData();

  formData.append("file", {
    uri: imageUri,
    name: "crop.jpg",
    type: "image/jpeg",
  } as any);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  // 👇 IMPORTANT DEBUG
  const text = await response.text();
  console.log("RAW RESPONSE => ", text);

  try {
    return JSON.parse(text);
  } catch (e) {
    console.log("JSON parse error:", e);
    return null;
  }
};
