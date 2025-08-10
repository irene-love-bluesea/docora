import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

const fetchUser = async (userId) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.patients.profile);
  return data;
};


export const useFetchUser = (userId) => {
  console.log("userId", userId);
  
  return useQuery({
    queryKey: ['user', userId], 
    queryFn: () => fetchUser(userId), // The function that will be called
    enabled: !!userId, // Optional: only run the query if userId is not null
  });
};