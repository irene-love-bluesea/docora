import axios from "axios";
import { DOCORA_API_URL} from "@env";
import { getAuthToken } from "../storage/AuthStorage";


const axiosInstance  = axios.create({
    baseURL: DOCORA_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // "Authorization": `Bearer ${getAuthToken()}`,
        // "Authorization" : `Bearer `,
    },
})

axiosInstance.interceptors.request.use(async (config) => {
    const token = await getAuthToken(); // Replace with authentication logic
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("📡 Request URL:", config.baseURL + config.url);
    console.log("📡 Request Headers:", config.headers);
    console.log("📡 Request Body:", config.data);
    console.log("++++++++++++++++++++++++++++++++++++++++++++++");
    
    return config;
})

export default axiosInstance