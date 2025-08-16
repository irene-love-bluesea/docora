import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

const fetchUser = async (userId) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.patients.profile);
  console.log("profile data", data);
  return data;
};

export const useFetchUser = (userId) => {
  return useQuery({
    queryKey: ['user', userId], 
    queryFn: () => fetchUser(userId),
    enabled: !!userId, 
  });
};

