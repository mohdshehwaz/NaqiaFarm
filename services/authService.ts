// services/authService.ts

import { API_BASE_URL } from "./api";

export const sendOtp = async (mobile: string) => {
  console.log("In the api call otp")
  const response = await fetch(`${API_BASE_URL}/mobile/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mobile: mobile,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to send OTP");
  }

  return data;
};
  
export const verifyOtp = async (mobile: string, otp: string) => {
  const response = await fetch(`${API_BASE_URL}/mobile/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mobile,
      otp,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.metaData?.resultMessage || "OTP verification failed");
  }

  return data;
};

export const resendOtp = async (mobile: string) => {
  const response = await fetch(`${API_BASE_URL}/mobile/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mobile }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to resend OTP");
  }

  return data;
};

  


  