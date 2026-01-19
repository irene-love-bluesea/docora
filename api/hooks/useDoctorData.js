import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

// Normalize varying backend shapes into an array of doctors
const extractDoctorList = (payload) => {
  if (Array.isArray(payload?.doctors)) return payload.doctors;
  if (Array.isArray(payload?.data?.doctors)) return payload.data.doctors;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  return [];
};

const fetchPopularDoctors = async () => {
  const res = await axiosInstance.get(API_ENDPOINTS.patients.popularDoctors);
  return extractDoctorList(res.data);
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
        queryKey: ["user"],
        exact: false,
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
  });
};

const filterBySpecialty = async (specialty) => {
  const res = await axiosInstance.get(
    API_ENDPOINTS.patients.filterBySpecialty(specialty)
  );
  return extractDoctorList(res.data);
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

const filterByName = async (name) => {
  const res = await axiosInstance.get(
    API_ENDPOINTS.patients.searchDoctorByName,
    { params: { searchTerm: name } }
  );
  return extractDoctorList(res.data);
};

export const useFilterByName = () =>
  useMutation({
    mutationFn: (name) => filterByName(name), // Pass only name
    onSuccess: (data) => console.log("Doctors fetched:", data.length),
    onError: (e) => console.log("Doctor Fetched Failed", e),
  });


const searchDoctorBySpecialtyAndName = async (specialty, name) => {
  const safeSpecialty = encodeURIComponent(String(specialty || ""));
  const res = await axiosInstance.get(
    API_ENDPOINTS.patients.searchDoctorBySpecialtyAndName(safeSpecialty),
    { params: { searchTerm: name } }
  );
  return extractDoctorList(res.data);
};

export const useSearchBySpecialtyAndName = () =>
  useMutation({
    mutationFn: ({specialty, name}) => searchDoctorBySpecialtyAndName(specialty, name),
    onSuccess: (data) => console.log("Doctors Specialty+Name fetched:", data.length),
    onError: (e) => console.log("Doctors Specialty+Name Fetched Failed", e),
  });