import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

const fetchUser = async () => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.patients.profile);
  return data;
};


export const useFetchUser = (userId) => {
  return useQuery({
    queryKey: ['user', userId], 
    queryFn: () => fetchUser(userId), // The function that will be called
    enabled: !!userId, // Optional: only run the query if userId is not null
  });
};


const patientDetailForm = async(formData) => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.patients.patientDetailForm, formData);
  return data;
}

export const usePatientDetailForm = () => {
  return useMutation({
    mutationFn: patientDetailForm,
    onSuccess: (data) => {
      console.log("Detail form Successful", data);
    },
    onError: (error) => {
      console.log("Detail form Failed", error);
    },
  });
}