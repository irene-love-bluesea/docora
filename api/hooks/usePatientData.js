
const fetchUser = async (userId) => {
//   const { data } = await axiosInstance.get();
//   return data;
};

import { useQuery } from "@tanstack/react-query";


export const useFetchUser = (userId) => {
  return useQuery({
    queryKey: ['user', userId], 
    queryFn: () => fetchUser(userId), // The function that will be called
    enabled: !!userId, // Optional: only run the query if userId is not null
  });
};