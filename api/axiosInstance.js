import axios from "axios";
import { DOCORA_API_URL} from "@env";
import { getAuthToken } from "../storage/AuthStorage";


const axiosInstance  = axios.create({
    baseURL: DOCORA_API_URL,
    header: {
        "Content-Type": "application/json"
    },
})

axiosInstance.interceptors.request.use(async (config) => {
    const token = await getAuthToken(); // Replace with authentication logic
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default axiosInstance