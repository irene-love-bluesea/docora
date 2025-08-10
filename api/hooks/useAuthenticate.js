import { useMutation } from "@tanstack/react-query";
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
      console.log("SignUp Failed", error);
    },
  });
};

const logInUser = async (userData) => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.auth.login, userData);
  return data;
};

export const useLogInUser = () => {
  return useMutation({
    mutationFn: logInUser,
    onSuccess: (data) => {
      console.log("LogIn Successful", data);
    },
    onError: (error) => {
      console.log("LogIn Failed", error);
    },
  });
};
