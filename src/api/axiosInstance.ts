import axios, {AxiosError, AxiosInstance, type AxiosRequestConfig} from "axios";

export interface TokenPair{
    accessToken: string
    refreshToken: string 
}


// TODO: Сделать получение API URL из .env
const  API_URL : string = "https://localhost:7008"

const axiosInstance : AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

const ACCESS_TOKEN_KEY = 'sdhjklajsdgkljaslkgksadgesdgdga'
const getAccessToken  = (): string | null => {
   return localStorage.getItem(ACCESS_TOKEN_KEY)
}

axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = getAccessToken()
        if (token && config.headers){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },

    (error: AxiosError) => {
        return Promise.reject(error)
    }
)