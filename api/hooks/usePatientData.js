import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

const updatePatientProfile = async (profileData) => {
  const { data } = await axiosInstance.patch(
    API_ENDPOINTS.patients.patientInfoUpdate, // Assuming this endpoint exists
    profileData
  );
  return data;
};

export const useUpdatePatientProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updatePatientProfile,
    onSuccess: (data, variables) => {
      console.log("Patient profile updated successfully");
      
      // Invalidate and refetch user profile queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
      
      // Optionally update the cache directly
      // queryClient.setQueryData(['user', userId], data);
    },
    onError: (error) => {
      console.log(
        "Patient profile update failed",
        error?.response?.data ?? error?.message ?? error
      );
    },
  });
};