import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../components/Providers/AuthProvider";
import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

const signUpUser = async (userData) => {
  const { data } = await axiosInstance.post(
    API_ENDPOINTS.auth.signup,
    userData
  );
  return data;
};

export const useSignUpUser = () => {
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      console.log("SignUp Successful", data);
    },
    onError: (error) => {
      if (error.response) {
        console.log("SignUp Failed:", error.response.data);
        console.log("Status Code:", error.response.status);
      } else {
        // Handle network errors or other issues where the server didn't respond
        console.log("An unexpected error occurred:", error.message);
      }
    },
  });
};

const logInUser = async (userData) => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.auth.login, userData);
  return data;
};


export const useLogInUser = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: logInUser,
    onSuccess: (data) => {
      login(data?.data?.token, data?.data?.user);
    },
    onError: (error) => {
      console.log("LogIn Failed", error);
    },
  });
};

const verifyOTP = async (otpData) => {
  const { data } = await axiosInstance.post(
    API_ENDPOINTS.auth.verifyOTP,
    otpData
  );
  return data;
};

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      console.log("OTP Verification Successful", data);
    },
    onError: (error) => {
      console.log("OTP Verification Failed", error);
    },
  });
};

const resendSignUpOTP = async (userData) => {
  const { data } = await axiosInstance.post(
    API_ENDPOINTS.auth.sendSignUpOTP,
    userData
  );
  return data;
};

export const useResendSignUpOTP = () => {
  return useMutation({
    mutationFn: resendSignUpOTP,
    onSuccess: (data) => {
      console.log("Resend OTP Successful", data);
    },
    onError: (error) => {
      console.log("Resend OTP Failed", error);
    },
  });
};


const forgotPassword = async (email) => {
  const { data } = await axiosInstance.post(
    API_ENDPOINTS.auth.forgotPassword,
    { email }
  );
  return data;
};

export const useForgotPassword =()=>{
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data)=>{
      console.log("Password Reset OTP Sent ",data);
    },
    onError:(error)=>{
      console.log("Password Reset OTP Failed",error);
    },
  });
};


const resetPassword = async ({ email, otp, newPassword }) => {
  const { data } = await axiosInstance.post(
    API_ENDPOINTS.auth.resetPassword,
    { email, otp, newPassword }
  );
  return data;
};

// A new custom hook for the password reset flow
export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      console.log("Password Reset Successful", data);
    },
    onError: (error) => {
      console.log("Password Reset Failed", error);
    },
  });
};

