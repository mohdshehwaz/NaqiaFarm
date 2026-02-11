// services/authService.ts

export const sendOtp = async (mobile: string) => {
    return new Promise<{ otp: string }>((resolve) => {
      setTimeout(() => {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        resolve({ otp });
      }, 1000); // fake delay
    });
  };
  
  export const verifyOtp = async (
    enteredOtp: string,
    realOtp: string
  ) => {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        if (enteredOtp === realOtp) {
          resolve(true);
        } else {
          reject(new Error("Invalid OTP"));
        }
      }, 800);
    });
  };
  