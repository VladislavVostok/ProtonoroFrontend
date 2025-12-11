import axios, { type AxiosInstance } from "axios";
import { API_BASE_URL } from "../utils/constants";



const apiInstance : AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiInstance;

