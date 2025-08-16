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


const PatientInfoUpdate = async(formData) => {
  const { data } = await axiosInstance.patch(API_ENDPOINTS.patients.patientInfoUpdate, formData);
  return data;
}

export const usePatientInfoUpdate = () => {
  return useMutation({
    mutationFn: PatientInfoUpdate,
    onSuccess: (data) => {
      console.log("infoUpdate Successful", data);
    },
    onError: (error) => {
      console.log("infoUpdate Failed", error);
    },
  });
}