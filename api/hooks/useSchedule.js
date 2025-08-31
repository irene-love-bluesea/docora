import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../endpoints";
import axiosInstance from "../axiosInstance";

const fetchSchedule = async (doctorId) => {
  const { data } = await axiosInstance.get(
    API_ENDPOINTS.doctors.viewSchedule(doctorId)
  );
  return data;
};


export const useFetchDoctorSchedule = (doctorId) => {
  return useQuery({
    queryKey: ["schedule", doctorId],
    queryFn: () => fetchSchedule(doctorId),
    enabled: !!doctorId,
  });
};