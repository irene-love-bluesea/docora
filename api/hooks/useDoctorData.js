import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

const fetchPopularDoctors = async () => {
  const res = await axiosInstance.get(API_ENDPOINTS.patients.popularDoctors);
  const payload = res.data;

  const list = Array.isArray(payload?.doctors)
    ? payload.doctors
    : Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload)
    ? payload
    : [];

  return list;
};

export const usePopularDoctors = () =>
  useMutation({
    mutationFn: fetchPopularDoctors,
    onSuccess: (arr) => console.log("Doctors Fetched"),
    onError: (e) =>
      console.log(
        "Doctor Fetched Failed",
        e?.response?.data ?? e?.message ?? e
      ),
  });


//profile data
const fetchDoctor = async (userId) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.doctors.profile);
  // console.log("profile data", data);
  return data;
};

export const useFetchDoctor = (userId) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchDoctor(userId),
    enabled: !!userId,
  });
};


//update profile
const updateDoctorProfile = async (profileData) => {
  
  const { data } = await axiosInstance.patch(
    API_ENDPOINTS.doctors.profileUpdate,
    profileData
  );
  return data;
};

export const useUpdateDoctorProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDoctorProfile,
    onSuccess: (data, variables) => {
      console.log("Doctor profile updated successfully");


       queryClient.invalidateQueries({ 
        queryKey: ['user'],
        exact: false
      });


    },
    onError: (error) => {
      console.log(
        "Doctor profile update failed",
        error?.response?.data ?? error?.message ?? error
      );
    },
  });
};

const verifyIdentity = async (formData) => {
  const { data } = await axiosInstance.post(
    API_ENDPOINTS.doctors.verifyIdentity,
    formData
  );
  return data;
};

export const useVerifyIdentity = () => {
  return useMutation({
    mutationFn: verifyIdentity,
    onSuccess: (data) => {
      console.log("Identity Verification Successful", data);
    },
    onError: (error) => {
      console.log("Identity Verification Failed", error);
    },
  })
}

const filterBySpecialty = async (specialty) => {
  const res = await axiosInstance.get(API_ENDPOINTS.patients.filterBySpecialty(specialty));
  const payload = res.data;
  
  const list = Array.isArray(payload?.doctors)
    ? payload.doctors
    : Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload)
    ? payload
    : [];

  return list;
};

export const useFilterBySpecialty = () =>
  useMutation({
    mutationFn: filterBySpecialty,
    onSuccess: (arr) => console.log("Doctors Fetched"),
    onError: (e) =>
      console.log(
        "Doctor Fetched Failed",
        e?.response?.data ?? e?.message ?? e
      ),
  });